# Houses of Westeros — a Game of Thrones family tree guide

A single-page, no-build-step reference site for keeping track of the great houses,
family relationships, power hierarchy, and old-fashioned vocabulary in *Game of Thrones*.

No frameworks, no build tools — just HTML, CSS, and vanilla JavaScript. Open
`index.html` in a browser and it works.

## Live demo

Enable GitHub Pages on this repo (Settings → Pages → Deploy from branch → `main` /
root) and it'll be live at `https://<your-username>.github.io/<repo-name>/`.

## What's inside

- **Landing grid** — click any house sigil to jump to its section
- **Family trees** for House Stark, House Targaryen, House Lannister, and House
  Baratheon, with expandable cards for each character
- **Shorter entries** for House Tyrell, Martell, Greyjoy, and Arryn
- **Power hierarchy** — a simplified timeline of who actually sat the Iron Throne
- **Vocabulary glossary** — old-fashioned in-world terms (Bastard, Hand of the
  King, Ser, Ward, Kingsguard, etc.) explained in plain English, with expandable
  context tying each term back to specific characters

All "portraits" are original stylized sigil icons (wolf, dragon, lion, stag, etc.)
drawn in SVG — no photos or copyrighted artwork.

## File structure

```
.
├── index.html      structure & content
├── styles.css      all visual styling, color variables, layout, responsive rules
├── script.js       click/keyboard handlers for expandable cards and jump links
└── README.md       this file
```

## Running locally

Just open `index.html` in any modern browser. There's no build process and no
dependencies to install — the only external resources are two Google Fonts
(Cinzel for headings, Crimson Pro for body text), loaded via a CDN link in
`index.html`.

## Customizing / extending

- **Add a character card**: copy an existing `.card` block inside any `.tier`
  div in `index.html`, keep the `data-expandable` attribute and `tabindex="0"`
  so it stays clickable and keyboard-accessible.
- **Add a glossary term**: copy a `.term` block inside the `.vocab-grid` you
  want it to live in.
- **Add a new house section**: copy an existing `<section class="house" id="...">`
  block, give it a new `id`, and add a matching entry to the landing grid and
  the sticky nav at the top.
- **Change colors**: all house colors are CSS variables defined in `:root` at
  the top of `styles.css` (e.g. `--stark`, `--targ`, `--lannister`).

## License

Feel free to fork, remix, and reuse this for your own reference sites. Not
affiliated with HBO, HBO Max, or George R. R. Martin — this is a fan-made
study aid.
