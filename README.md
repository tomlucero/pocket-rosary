# Pocket Rosary

A mobile-first Catholic prayer companion focused on a calm, guided rosary flow.

## Current prototype

- Suggests the traditional mystery set based on the day of week
- Guides the user bead by bead through the full rosary
- Shows the current prayer, bead label, and mystery focus
- Ships as a PWA with offline support
- Builds cleanly for GitHub Pages

## Local development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

## GitHub Pages

This repository includes a workflow at `.github/workflows/deploy.yml` that deploys the `dist/` output to GitHub Pages on pushes to `main`.

Before using it, make sure Pages is configured in GitHub to use `GitHub Actions` as the source.

## Notes

- The app currently uses the standard weekday mystery rotation.
- Sunday seasonal variations are not yet modeled.
- This is a strong base for adding reflections, audio, chaplets, or prayer habit features later.
