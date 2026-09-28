# Photo attributions

All six gallery photographs come from **Wikimedia Commons** and are reused under their
stated Creative Commons licenses. Each entry below lists the file, author, license, and a
link to the source page (which carries the authoritative license terms). The CC BY-SA
licenses require attribution and share-alike; keep this file published alongside the site.

| # | Place | File on Commons | Author | License | Source |
|---|-------|-----------------|--------|---------|--------|
| 1 | Taj Mahal — Agra | `Taj Mahal, Agra, India edit2.jpg` | Yann; edited by King of Hearts | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons page](https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India_edit2.jpg) |
| 2 | Hawa Mahal — Jaipur | `Hawa Mahal east facade (14-07-2022).jpg` | Chainwit. | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons page](https://commons.wikimedia.org/wiki/File:Hawa_Mahal_east_facade_(14-07-2022).jpg) |
| 3 | Prambanan — Yogyakarta | `Yogyakarta Indonesia Prambanan-temple-complex-23.jpg` | CEphoto, Uwe Aranas | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons page](https://commons.wikimedia.org/wiki/File:Yogyakarta_Indonesia_Prambanan-temple-complex-23.jpg) |
| 4 | Mount Bromo — sunrise point | `Gunung Bromo sunrise - Indonesia.jpg` | Thomas Fuhrmann | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons page](https://commons.wikimedia.org/wiki/File:Gunung_Bromo_sunrise_-_Indonesia.jpg) |
| 5 | Kawah Ijen — blue fire crater | `The blue fire of Kawah Ijen 1.jpg` | Thomas Fuhrmann | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons page](https://commons.wikimedia.org/wiki/File:The_blue_fire_of_Kawah_Ijen_1.jpg) |
| 6 | Bali — Pura Tanah Lot (the finish) | `Tanah Lot, Bali, Indonesia, 20220827 0957 1098.jpg` | Jakub Hałun | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons page](https://commons.wikimedia.org/wiki/File:Tanah_Lot,_Bali,_Indonesia,_20220827_0957_1098.jpg) |

## Local files
Each photo is stored in `/images` as an optimized WebP (primary) with a JPEG fallback,
cropped to 4:3 to fill the gallery tiles:

- **Taj Mahal — Agra** — `images/gal-taj-mahal.webp` / `images/gal-taj-mahal.jpg`
- **Hawa Mahal — Jaipur** — `images/gal-hawa-mahal.webp` / `images/gal-hawa-mahal.jpg`
- **Prambanan — Yogyakarta** — `images/gal-prambanan.webp` / `images/gal-prambanan.jpg`
- **Mount Bromo — sunrise point** — `images/gal-bromo.webp` / `images/gal-bromo.jpg`
- **Kawah Ijen — blue fire crater** — `images/gal-kawah-ijen.webp` / `images/gal-kawah-ijen.jpg`
- **Bali — Pura Tanah Lot (the finish)** — `images/gal-bali-tanah-lot.webp` / `images/gal-bali-tanah-lot.jpg`

## Crew & bike photos
The three rider portraits and the Yamaha NMax photo are the trip's own images (not from
Commons) and need no third-party attribution:

- `images/crew-bunty.*`, `images/crew-adam.*`, `images/crew-den.*` — rider portraits
- `images/bike-nmax.*` — Yamaha NMax 155

## Social-share & icons
- `images/og-cover.jpg` — Open Graph share image, built from the Taj Mahal photo above (same CC BY-SA 4.0 attribution applies).
- `images/favicon.svg`, `images/favicon-32.png`, `images/apple-touch-icon.png` — original site icon.

## Map

The interactive maps (`route-map.js`, `route-map.css`) are built from the following. The credit
line in the corner of each map (Leaflet | OpenStreetMap contributors) must stay visible.

| Part | What it is | Credit / licence |
|------|------------|------------------|
| Map data and map pictures ("tiles") | The standard OpenStreetMap map, served by OpenStreetMap's own tile server (`tile.openstreetmap.org`) and re-coloured in the visitor's browser to match the site. | (c) [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors. Data available under the [Open Database License (ODbL) 1.0](https://opendatacommons.org/licenses/odbl/1-0/). Tiles are used under the [OSMF Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/) (light, interactive use; visible attribution). |
| Map library | [Leaflet](https://leafletjs.com) 1.9.4, loaded from cdnjs with an integrity (SRI) check. | BSD-2-Clause. (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade, and contributors. [Licence text](https://github.com/Leaflet/Leaflet/blob/main/LICENSE). |
| Road lines | The route lines follow real roads. Each leg was routed once, offline, with the public [OSRM](https://project-osrm.org) demo server and stored inside `route-map.js`; the live site makes no routing requests. | Routing software: OSRM, BSD-2-Clause. Road data: (c) OpenStreetMap contributors, ODbL 1.0 (the stored lines are a derived work of that data, credited here). |
| Place coordinates | Stop coordinates were looked up in OpenStreetMap data (Nominatim) and checked by hand. | (c) OpenStreetMap contributors, ODbL 1.0. |

Notes:

- **CARTO basemaps are not used.** They were evaluated first, but CARTO now requires a personal
  API key: without one its tile server returns a watermark tile reading "API KEY REQUIRED", and
  its terms require credit to both OpenStreetMap and CARTO
  (<https://carto.com/attributions>). If a CARTO key is ever added, change `TILES` in `route-map.js`
  and add the CARTO credit next to the OpenStreetMap one.
- The little round symbols on the map (coffee cup, volcano, palm tree, plane) are ordinary Unicode
  emoji drawn by the visitor's device; no image files are involved.
