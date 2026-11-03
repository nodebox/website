# NodeBox website artwork

`possibilities.ndbx` is the source of the homepage's woven surface. Two
subnetworks sample the same sine surface in opposite directions. Each uses
number ranges, trigonometry, point construction and connected paths. The
root network runs each subnetwork at 27 positions and combines the results.
The `bend` node controls the surface's depth.

The node icons are Lucas Nijs's original SVGs, copied without changes from
the NodeBox artwork directory. The mark comes from NodeBox Live's
`artwork/logo.svg`.

Regenerate the static SVG and interactive geometry with a built NodeBox 4
checkout:

```sh
node scripts/generate-artwork.mjs /path/to/nodebox4
```

The generator uses the compiled engine in `app/src/engine/pkg`. It evaluates
all 54 paths at two bend values and checks each path's midpoint against an
actual evaluation. This verifies that interpolation accurately represents
the network. It also renders the full network to catch evaluation errors.

The browser interpolates the exported points. It does not load the engine
or reimplement the surface equations. Normal Eleventy builds use the saved
assets and do not require NodeBox. With JavaScript disabled or the geometry
request unavailable, the static SVG and network download remain usable.
There is no automatic animation. The range control supports keyboard arrows.
