# Client

React Router v7 in SPA mode (`ssr: false`).

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm typecheck
```

Development runs on `http://localhost:5173`.

## Deployment

`pnpm build` outputs static assets under `build/client`.

- Static hosting must rewrite unknown paths to `/index.html`
- `public/_redirects` is included for Netlify-style SPA fallback
- `Dockerfile` serves the built app with Nginx and the same fallback rule
