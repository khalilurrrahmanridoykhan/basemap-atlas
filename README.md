# Mapstack

A responsive Next.js catalog for discovering and comparing GIS basemaps.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

Basemap records live in `lib/data.ts`. Add a record there to automatically create a catalog card and statically generated detail page.

## Database and admin panel

The app works without a database and uses `lib/data.ts` as fallback content. To enable database-backed content management, connect a Neon or Supabase Postgres database and configure:

```env
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=your-strong-password
SESSION_SECRET=your-long-random-secret
```

Open `/admin` and sign in with `ADMIN_PASSWORD`. On the first database-backed request, the app creates the `basemaps` table and imports the built-in catalog. The admin panel can then add, edit, and delete records.

Generate a session secret with `openssl rand -base64 32`. Never commit real secrets to Git.
