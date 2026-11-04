# NodeBox site design rules

These rules apply to the Eleventy site. The static NodeBox 1 wiki under
`code/` is an archive with its own layout.

`media/css/workshop.css` owns the modern site's presentation. The old
`screen.css` is retained in the source but is no longer loaded; it must not
override shared components. Normalize, syntax highlighting, the legacy grid
helpers and Fancybox retain their narrowly scoped supporting stylesheets.

## Typography

Atkinson Hyperlegible Next is the shared face for headings, body copy and
controls. Use the font files already shared with the forum, hosted locally.
Reserve monospace for code.

| Role | Size | Weight | Line height |
| --- | --- | --- | --- |
| Homepage display | 48–96 px, fluid | 600 | 1.0 |
| Page title | 36–72 px, fluid | 550 | 1.12 |
| Section title | 32–44 px, fluid | 550 | 1.12 |
| Entry title | 24–28 px, fluid | 550 | 1.2 |
| Body | 18 px | 400 | 1.6 |
| Navigation and controls | 16 px | 400–500 | 1.5–1.6 |
| Dates, captions and secondary navigation | 14 px | 400 | 1.5 |
| Code blocks | 16 px | 400 | 1.6 |

A tutorial, a blog post and a software feature are all entries. Their titles
use `.entry-title`, regardless of the heading level needed by the page.
An entry title is a heading, never a caption below a large image. Do not
introduce new page-specific font sizes. If a new role is necessary, define
it once as a token in `media/css/workshop.css` and document it here.

## Space and layout

Use an 8 px spacing scale: 8, 16, 24, 32, 48, 64 and 96 px. The shared site
width is 1280 px, with fluid outside gutters of 24–64 px. Prose is limited to
760 px. Documentation adds a 240 px sidebar; it moves below the article on
phones. Code and wide tables scroll inside their reading column.

Entries use a shared grid with 32 px column gaps and 48 px row gaps. At
narrow widths, tutorial entries become rows with an icon beside the title
and description. Do not shrink titles or body copy to preserve columns.

## Icons and images

Tutorial and operation icons are 80 × 80 px on desktop and 64 × 64 px on
phones. Preserve their original proportions. An icon introduces an entry;
it does not determine the size of its column. Reference-node icons retain
their small application size. Brand marks and the homepage's generative
artwork have their own roles and are sized for their compositions.

Screenshots, photographs and artwork can fill their image slots. They have
proper titles or captions where needed. Use flat surfaces and thin rules;
no container shadows, image shadows, decorative frames or gradients.

## Color and links

Paper, navy ink and NodeBox blue form the core palette. Muted text remains
readable and at least 14 px. Blue denotes interactive text and selected
states. Body links are underlined. Entry titles are navy and gain a blue
underline on hover or keyboard focus. The header, entry titles and buttons
have their own shared link treatments; individual pages do not invent them.
Buttons use the same 16 px text, square corners and a minimum 48 px height.
Focus indicators must remain visible.

## Language and interaction

Describe what the software does. Keep historic posts intact. Avoid sales
slogans, numbered section labels, decorative microcopy and invented metrics.
Credit real work. A label should name a control, a destination, a date or
something the reader needs to understand. Motion serves direct interaction. The one
exception is the homepage examples, which sweep their slider slowly back and forth until
the reader touches it or presses pause. They stay still when the device asks for reduced motion,
when the example is off screen, or when the tab is hidden.

## Shared components

- `_includes/learning-links.html` and `_data/learning.json`: tutorials on the
  documentation and download pages.
- `.resource-grid`, `.resource-card`, `.entry-title`: learning entries and
  screencasts. Software features and blog entries share their type roles.
- Shared page, article and documentation layouts: page-title scale and reading
  measure, independent of the kind of content.
- `_includes/example-panel.html`, `_data/examples.json` and
  `media/js/examples.js`: the homepage examples. Each is a NodeBox network,
  evaluated ahead of time and drawn by the page at any slider value; see
  `media/homepage/README.md`. `_data/works.json` lists work made by others.
- The node icons beside the examples are shown at half strength. Icons that
  are black on the light theme are inverted on the dark theme; coloured icons
  are left alone.
- `.action-primary`, `.button`, `.text-link`: consistent controls and links.

Check the homepage, documentation index, one tutorial, one node reference,
the blog index, one article, software and downloads at desktop and phone
width after changing these rules.
