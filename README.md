# Three Dudes. Three Bikes. — trip site

A small static website for the October 2026 India + Indonesia motorcycle trip.
No build step, no backend — just plain HTML, CSS, and a little JavaScript.

## Files

| File | What it is |
|------|------------|
| `index.html` | The main one-page site (hero, countdown, route, crew, bike, gallery). |
| `indonesia_roadtrip.html` | The full day-by-day guide, linked from the footer. |
| `route-map.js` | The interactive map: stop list, dates, notes and the map engine. |
| `route-map.css` | Colours and layout of the map. |
| `images/` | All photos, plus favicon and the social-share image. |
| `attributions.md` | Photo credits and licenses (keep this published). |

## How to change things later (no coding needed)

Everything is editable in a plain text editor. **Warning:** do not open the `.html` files in
TextEdit - it shows them as a rendered web page and can silently rename and ruin the file.
Use a code editor (VS Code) or ask Claude to make the edit. The most common edits:

- **Swap a gallery photo:** drop your new photo into `images/`, then in `index.html`
  find the matching `<img src="images/gal-...">` line and point it at your file.
  Keep photos roughly 4:3 (landscape) so they fill the tile.
- **Change wording:** search `index.html` for the text you want to change and edit it.
- **Change the clock dates:** near the bottom of `index.html`, find `var START = new Date(2026, 9, 1)`
  (1 October 2026 = "Day 1"; the `9` means October because months start at 0) and `var LAST_DAY = 22`
  (the clock stops on "Day 22"). Before START the header shows a countdown; from START on it shows "Day N".
- **Uploading files:** on GitHub use "Add file" > "Upload files" > "choose your files" (not drag-and-drop,
  and never copy-paste file contents into the GitHub editor - that breaks special characters).
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

## Editing the map

The two maps on the home page (the small one at the top and the big one in "The map"
section) are drawn by two files that sit next to `index.html`:

- `route-map.js` - the list of stops with their dates and notes, plus the code that draws the map.
- `route-map.css` - the map's colours and layout.

**Always upload `route-map.js` and `route-map.css` together with `index.html`.** If
`route-map.js` is missing there is no map; if `route-map.css` is missing the map looks broken.

**Change a place name, date, distance or note:**

1. Open `route-map.js` in a plain text editor (TextEdit in "plain text" mode, Notepad, VS Code -
   not Word). Save it as UTF-8 and keep the straight quote marks.
2. Near the top, under `PART 1 - TRIP DATA`, find the stop. Each one looks like this:

   ```js
   {
     id: 'agra',
     name: 'Agra',
     when: 'Sun 4 Oct · 1 night',
     km: '232 km from Delhi',
     note: 'On the road 08:00-14:00. Taj Mahal and Fatehpur Sikri.',
     kind: 'india', lat: 27.1753, lon: 78.0098, dir: 'right'
   },
   ```

3. Change only the words between the quote marks on the `name`, `when`, `km` and `note`
   lines. Keep the quote marks and the comma at the end of the line. If your text contains an
   apostrophe, put the whole text in double quotes: `"Bunty's birthday"`.
4. The numbers in the totals card (`TOTALS`) and the legend text (`LEGEND_DOTS`, `LEGEND_LINES`)
   are in the same block, just above the stops.
5. Upload the changed `route-map.js`.

Good to know:

- **Please keep hotel names and prices out of it** - the site is public.
- Changing `lat` / `lon` only moves the marker. The road lines are pre-drawn (`PART 2`) and do
  not change when you edit a name, so if the route itself changes (a new city, another road),
  the lines need to be re-generated - ask for help with that.
- **The map needs an internet connection** (it loads the Leaflet map library and the map pictures
  from the web). Without one, visitors see a short text with the route instead of the map.
- On phones one finger scrolls the page and two fingers move the map (so the map never traps
  the page while scrolling).
- The map pictures come from OpenStreetMap's own server, which is fine for a small personal
  site. See `attributions.md` for the credits; the small credit line in the corner of every map
  must stay visible.
