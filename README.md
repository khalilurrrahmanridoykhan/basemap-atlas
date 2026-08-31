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
