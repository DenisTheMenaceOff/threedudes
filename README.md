# Three Dudes. Three Bikes. — trip site

A small static website for the October 2026 India + Indonesia motorcycle trip.
No build step, no backend — just plain HTML, CSS, and a little JavaScript.

## Files

| File | What it is |
|------|------------|
| `index.html` | The main one-page site (hero, countdown, route, crew, bike, gallery). |
| `indonesia_roadtrip.html` | The full day-by-day guide, linked from the footer. |
| `images/` | All photos, plus favicon and the social-share image. |
| `attributions.md` | Photo credits and licenses (keep this published). |

## How to change things later (no coding needed)

Everything is editable in a plain text editor (even TextEdit). The most common edits:

- **Swap a gallery photo:** drop your new photo into `images/`, then in `index.html`
  find the matching `<img src="images/gal-...">` line and point it at your file.
  Keep photos roughly 4:3 (landscape) so they fill the tile.
- **Change wording:** search `index.html` for the text you want to change and edit it.
- **Change the countdown date:** near the bottom of `index.html`, find
  `new Date(2026, 9, 2, ...)` — the `9` means October (months are 0-based).
- **The "follow along" / Polarsteps link:** it lives in the footer of `index.html`.

## Publishing an update (GitHub Pages)

The site is hosted with **GitHub Pages** from this repository.
To publish a change: edit the file, then upload the changed file to the GitHub repo
(drag-and-drop on github.com works fine). The live site refreshes within a minute or two.

## Local preview

Open `index.html` in a browser. For photos and fonts to load exactly as on the live
site, serve it over a local web server, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```
