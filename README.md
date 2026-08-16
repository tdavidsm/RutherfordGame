# Rutherford Scatter

A browser game that simulates Rutherford's gold-foil experiment. A hidden structure
of polygons sits at the center of a circular arena. Fire particles from a cannon on
the surrounding rail, watch how they scatter, and deduce where the hidden shapes are —
then place the shapes to see how close you got.

Built for a high-school physics classroom on iPads. It is a single self-contained
`index.html` — no build step, no dependencies, no backend. Runs entirely in the browser
and works offline once loaded.

## Play

Open `index.html` in any modern browser, or visit the hosted version on GitHub Pages.

- **Fire** — slide the cannon around the ring, aim inward (or drag inside the ring and
  release to fire), or spray a fan of particles. Most pass straight through empty space;
  a direct hit on the hidden structure leaves a spark and scatters.
- **Place** — tap a shape to select it, drag to move, and rotate with its handle or the
  Rotate buttons, matching your accumulated sparks.
- **Reveal** — the true shapes appear and your placement is scored by overlap.

## Develop

It's one file. Edit `index.html` and reload. For a local server:

```bash
python3 -m http.server 8778
```

then open http://localhost:8778/index.html
