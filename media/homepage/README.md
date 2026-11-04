# NodeBox homepage artwork

The homepage examples are networks made in NodeBox 4. Each lives in
`examples/<id>.ndbx`, which is also the file readers download:

| Example | Network | Slider |
| --- | --- | --- |
| `generative` | A grid of short strokes, each turned by a sine and cosine field. | `k`, how quickly the field changes |
| `typography` | Random pairs of points on the outline of a word, joined when they are close. | `reach`, the longest thread |
| `data` | Hours of daylight through the year, read from `daylight.csv`, drawn as bars on a clock face. | `latitude` |
| `plotter` | A superformula curve, copied with a small turn and shrink each time. | `m`, the symmetry |

`daylight.csv` comes from `scripts/make-daylight.mjs`.

Each network animates: a `frame` node, divided and offset, drives a parameter, so
Play in NodeBox moves it. For the flow field, the threads and the daylight chart
that is the parameter the page's slider sets (`k`, `reach` and `latitude`). The
plotter's slider sets the symmetry `m`, which would jitter if it ran with the
frame, so its frame drives the exponent `ex` instead. The page cuts the frame out and sets that parameter itself. Nodes are
laid out top to bottom by `scripts/layout-ndbx.py`.

The networks open in NodeBox 3.1.0 as well. NodeBox 3 reads only format version
21 and needs a real UUID, while NodeBox 4 writes version 22, so edit these files
by hand or change the two values back after saving from NodeBox 4. The export
script checks both. Drawn text uses the font AtkinsonHyperlegibleNext, which
NodeBox 3 replaces with another font unless it is installed.

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

- `nodebox-live.jpg` is a screenshot of NodeBox Live from nodebox.live.
- `works/` holds images of work made by others with NodeBox, from nodebox.live.
  The credits are in `_data/works.json`.
- `../design/icons/nodes/` holds Lucas Nijs's original node icons, copied without
  changes from the NodeBox artwork directory. `../design/icons/` holds the three
  operation icons, and `../design/nodebox-mark.svg` is the mark from NodeBox
  Live's `artwork/logo.svg`.
- The older files in this folder belong to the previous homepage.
