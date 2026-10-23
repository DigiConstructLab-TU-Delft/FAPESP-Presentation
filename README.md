# Integral Design and Management – Brazil Collaboration (Slidev)

Slides for the FAPESP visit to TU Delft (26 October). Built with [Slidev](https://sli.dev).

## Run locally

```sh
npm install
npx slidev
```

## Publish on GitHub Pages

`npm run build:pages` writes a static site to `docs/` with relative asset paths and hash routing, so it works
under any repository name (for example `https://<user>.github.io/<repo>/`). Images that components load from
`public/` go through `composables/asset.ts` so they also resolve under a sub-path.

```sh
npm run build:pages
git add -A
git commit -m "Update slides"
git push
```

Commit `docs/` (including the hidden `.nojekyll` file). Then, in the repository settings, choose
**Pages → Deploy from a branch → `main` / `/docs`**. Rebuild and push after every change to the slides.

## Notes

- Slides animate on their own when they open. Use the arrow keys to move between slides.
- `removed-slides.md` holds five slides taken out of the deck on request (programme, organisations, research
  themes, collaboration routes, discussion). Paste them back into `slides.md` to restore them.
- Photos and logos: staff photos come from the TU Delft staff page, the Brasília, seminar and city-meeting photos
  from the TU Delft news item "TU Delft extends strong collaboration with Brazil" (2023), the cistern photo from
  Wikimedia Commons (public domain, Moacir Ximenes) and the institution logos from their own sites. GitHub Pages
  sites are public, so check that you may publish them, or keep the repository private and share the built
  `docs/` folder another way.
