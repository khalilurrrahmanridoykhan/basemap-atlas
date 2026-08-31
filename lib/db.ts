import postgres from "postgres";
import { Basemap, basemaps as fallbackBasemaps } from "./data";

const connectionString = process.env.DATABASE_URL;
const sql = connectionString ? postgres(connectionString, { prepare: false, max: 1 }) : null;
let initialized = false;

function rowToBasemap(row: Record<string, unknown>): Basemap {
  return {
    slug: String(row.slug), name: String(row.name), provider: String(row.provider),
    description: String(row.description), longDescription: String(row.long_description),
    pricing: row.pricing as Basemap["pricing"], category: String(row.category),
    color: String(row.color), accent: String(row.accent), rating: Number(row.rating),
    users: String(row.users), gis: row.gis as string[], formats: row.formats as string[],
    bestFor: row.best_for as string[], url: String(row.url), featured: Boolean(row.featured),
  };
}

async function ensureDatabase() {
  if (!sql || initialized) return;
  await sql`CREATE TABLE IF NOT EXISTS basemaps (
    slug TEXT PRIMARY KEY, name TEXT NOT NULL, provider TEXT NOT NULL,
    description TEXT NOT NULL, long_description TEXT NOT NULL, pricing TEXT NOT NULL,
    category TEXT NOT NULL, color TEXT NOT NULL, accent TEXT NOT NULL,
    rating DOUBLE PRECISION NOT NULL DEFAULT 5, users TEXT NOT NULL DEFAULT 'New',
    gis JSONB NOT NULL DEFAULT '[]', formats JSONB NOT NULL DEFAULT '[]',
    best_for JSONB NOT NULL DEFAULT '[]', url TEXT NOT NULL, featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
  )`;
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM basemaps`;
  if (count === 0) for (const m of fallbackBasemaps) await saveBasemap(m, true);
  initialized = true;
}

export async function getBasemaps(): Promise<Basemap[]> {
  if (!sql) return fallbackBasemaps;
  await ensureDatabase();
  const rows = await sql`SELECT * FROM basemaps ORDER BY featured DESC, created_at ASC`;
  return rows.map(rowToBasemap);
}

export async function getBasemap(slug: string): Promise<Basemap | undefined> {
  if (!sql) return fallbackBasemaps.find(m => m.slug === slug);
  await ensureDatabase();
  const rows = await sql`SELECT * FROM basemaps WHERE slug = ${slug} LIMIT 1`;
  return rows[0] ? rowToBasemap(rows[0]) : undefined;
}

export async function saveBasemap(m: Basemap, skipEnsure = false) {
  if (!sql) throw new Error("DATABASE_URL is not configured");
  if (!skipEnsure) await ensureDatabase();
  await sql`INSERT INTO basemaps (slug,name,provider,description,long_description,pricing,category,color,accent,rating,users,gis,formats,best_for,url,featured)
    VALUES (${m.slug},${m.name},${m.provider},${m.description},${m.longDescription},${m.pricing},${m.category},${m.color},${m.accent},${m.rating},${m.users},${sql.json(m.gis)},${sql.json(m.formats)},${sql.json(m.bestFor)},${m.url},${m.featured ?? false})
    ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name,provider=EXCLUDED.provider,description=EXCLUDED.description,long_description=EXCLUDED.long_description,pricing=EXCLUDED.pricing,category=EXCLUDED.category,color=EXCLUDED.color,accent=EXCLUDED.accent,rating=EXCLUDED.rating,users=EXCLUDED.users,gis=EXCLUDED.gis,formats=EXCLUDED.formats,best_for=EXCLUDED.best_for,url=EXCLUDED.url,featured=EXCLUDED.featured,updated_at=NOW()`;
}

export async function deleteBasemap(slug: string) {
  if (!sql) throw new Error("DATABASE_URL is not configured");
  await ensureDatabase(); await sql`DELETE FROM basemaps WHERE slug=${slug}`;
}

export function databaseConfigured(){ return Boolean(connectionString); }
