# NodeBox website artwork

The homepage examples are networks made in NodeBox 4. Each lives in
`examples/<id>.ndbx`, which is also the file readers download:

| Example | Network | Slider |
| --- | --- | --- |
| `generative` | A grid of short strokes, each turned by a sine and cosine field. | `k`, how quickly the field changes |
| `typography` | Random pairs of points on the outline of a word, joined when they are close. | `reach`, the longest thread |
| `data` | Hours of daylight through the year, read from `daylight.csv`, drawn as bars on a clock face. | `latitude` |
| `plotter` | A superformula curve, copied with a small turn and shrink each time. | `m`, the symmetry |

`daylight.csv` comes from `scripts/make-daylight.mjs`.

Regenerate the drawings with a built NodeBox 4 checkout:

```sh
node scripts/export-examples.mjs /path/to/nodebox4
```

The script evaluates each network at every slider step and writes
`examples/<id>.json`, which the page draws from, and `examples/<id>.svg`, the
still shown before scripts run. It makes its own font files from the site's
variable font, so drawn text uses the page's typeface. It needs `uvx`.

The browser does not load the engine. It interpolates between the evaluated
steps, so the sliders move continuously. The flow field, the daylight chart and
the superformula interpolate numbers from the network. The threads keep every
thread any reach could show, with its length. The page shows those shorter
than the slider's value, which is what the network's cull does.

Colours in the exported drawings are the light palette. `workshop.css` maps them
for the dark theme.

## Other files

- `icons/nodes/` holds Lucas Nijs's original node icons, copied without changes
  from the NodeBox artwork directory. `icons/` holds the three operation icons.
- `nodebox-mark.svg` is the mark from NodeBox Live's `artwork/logo.svg`.
- `works/` holds images of work made by others with NodeBox, from nodebox.live.
  The credits are in `_data/works.json`.
