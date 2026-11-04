// Usage: node scripts/export-examples.mjs /path/to/nodebox4
// Evaluates the homepage examples with a built NodeBox 4 engine and writes what
// the browser needs to draw each one at any slider value: media/homepage/examples/
// <id>.json (the data) and <id>.svg (the still shown before scripts run). The
// networks <id>.ndbx are the sources and the downloads. Ordinary Eleventy builds
// use the saved files and need no NodeBox. Needs uvx, for the font instances.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

if (!process.argv[2]) throw new Error('Provide the path to a built NodeBox checkout.');
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const out = join(root, 'media/homepage/examples');
const pkg = resolve(process.argv[2], 'app/src/engine/pkg');
const { initSync, Session } = await import(pathToFileURL(join(pkg, 'nodebox_wasm.js')));
initSync({ module: await readFile(join(pkg, 'nodebox_wasm_bg.wasm')) });

// The networks name their fonts AtkinsonHyperlegibleNext-Regular and -Bold. Make
// those from the site's variable font, so the drawings use the page's typeface.
const fontDir = join(tmpdir(), 'nodebox-site-fonts');
await mkdir(fontDir, { recursive: true });
const variable = join(root, 'media/fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2');
const fonts = [['Regular', 400], ['Bold', 700]].map(([style, weight]) => {
  const file = join(fontDir, `${style}.ttf`), woff = join(fontDir, `${style}.woff2`);
  const uvx = (...args) => execFileSync('uvx', ['--from', 'fonttools[woff]', ...args], { stdio: 'ignore' });
  uvx('fonttools', 'varLib.instancer', variable, `wght=${weight}`, '-o', woff);
  uvx('python', '-c', `
from fontTools.ttLib import TTFont
f = TTFont(${JSON.stringify(woff)}); f.flavor = None
for r in f['name'].names:
    if r.nameID == 6: r.string = 'AtkinsonHyperlegibleNext-${style}'
f.save(${JSON.stringify(file)})`);
  return file;
});

const num = v => { const r = Math.round(v * 10) / 10; return Object.is(r, -0) ? '0' : String(r); };
function pathData(ops) {
  const o = []; let i = 0;
  while (i < ops.length) {
    switch (ops[i]) {
      case 0: o.push(`M${num(ops[i + 1])} ${num(ops[i + 2])}`); i += 3; break;
      case 1: o.push(`L${num(ops[i + 1])} ${num(ops[i + 2])}`); i += 3; break;
      case 2: o.push(`C${[1, 2, 3, 4, 5, 6].map(k => num(ops[i + k])).join(' ')}`); i += 7; break;
      case 3: o.push('Z'); i += 1; break;
      default: throw new Error('Unknown path command ' + ops[i]);
    }
  }
  return o.join('');
}
const hex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0')).join('');

// NodeBox 3.1 refuses documents that are not format 21 or whose uuid is not a
// real UUID. The networks are downloads, so keep them in that shape.
async function open(file) {
  const head = (await readFile(file, 'utf8')).match(/<ndbx [^>]*>/)[0];
  if (!head.includes('formatVersion="21"') || !/uuid="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"/.test(head)) {
    throw new Error(`${file} must have formatVersion="21" and a UUID, or NodeBox 3.1 cannot open it.`);
  }
  const s = new Session();
  for (const f of fonts) s.addFont(new Uint8Array(await readFile(f)));
  s.setFile('daylight.csv', new Uint8Array(await readFile(join(out, 'daylight.csv'))));
  s.open(await readFile(file, 'utf8'));
  s.example = examples.find(e => file.endsWith(e.id + '.ndbx'));
  s.example.prepare(s);
  const paths = new Map();
  // The rendered scene as an SVG of filled outlines.
  s.svg = (w, h) => {
    const r = s.render('', 1);
    if (r.error) throw new Error(JSON.stringify(r.error));
    for (const a of r.added) paths.set(a.id, pathData(a.path));
    for (const id of r.released || []) paths.delete(id);
    const it = r.items, body = [];
    for (let o = 0; o + 12 <= it.length; o += 12) {
      const d = paths.get(it[o]);
      if (!d || it[o + 10] <= 0) continue;
      const m = [1, 2, 3, 4, 5, 6].map(k => num(it[o + k]));
      const t = m.join(' ') === '1 0 0 1 0 0' ? '' : ` transform="matrix(${m.join(' ')})"`;
      const a = it[o + 10] < 1 ? ` fill-opacity="${num(it[o + 10])}"` : '';
      body.push(`<path${t} fill="${hex(it[o + 7], it[o + 8], it[o + 9])}"${a} d="${d}"/>`);
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-w / 2} ${-h / 2} ${w} ${h}">${body.join('')}</svg>`;
  };
  return s;
}

const VIEW = '-400 -350 800 700';
const r1 = x => +x.toFixed(1);
const rows = (s, name, limit = 100000) => JSON.parse(s.output('', name, 1, limit)).rows.map(r => r.text);
const nums = (s, name) => rows(s, name).map(Number);
const points = (s, name) => rows(s, name).map(t => t.split(',').map(Number));
const range = ({ min, max, step }) => { const v = []; for (let k = 0, x = min; x <= max + 1e-9; k++, x = +(min + k * step).toFixed(4)) v.push(x); return v; };
// The downloads are animated: a frame node drives each slider's parameter. The
// page sets the parameter itself, so each example says how to cut the frame
// out and which port holds the slider's value.
const set = (s, ex, v) => ex.drive(s, v);
const still = (s, ex) => { set(s, ex, ex.value); return s.svg(800, 700); };

// Short strokes on a grid, each turned by a field. Fixed start points, angles per step.
function strokes(s, ex) {
  const { list, angle, length } = ex.strokes;
  const starts = points(s, list).map(p => p.map(r1)).flat();
  const frames = range(ex).map(v => { set(s, ex, v); return nums(s, angle).map(r1); });
  const path = angles => angles.map((a, i) => { const t = a * Math.PI / 180; return `M${starts[i * 2]} ${starts[i * 2 + 1]}l${(length * Math.cos(t)).toFixed(1)} ${(length * Math.sin(t)).toFixed(1)}`; }).join('');
  const i = Math.round((ex.value - ex.min) / ex.step);
  return { data: { kind: 'strokes', length, starts, frames }, still: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW}"><path d="${path(frames[i])}" fill="none" stroke="#2355ed" stroke-width="1.6"/></svg>` };
}

// One closed curve per step, repeated with a growing turn and shrink.
function ring(s, ex) {
  const { node, copies, turn, shrink } = ex.ring;
  const curves = range(ex).map(v => { set(s, ex, v); return points(s, node).flat().map(r1); });
  const poly = pts => { const o = []; for (let i = 0; i < pts.length; i += 2) o.push(pts[i] + ',' + pts[i + 1]); return o.join(' '); };
  const uses = Array.from({ length: copies }, (_, i) => { const sc = 1 - shrink * i, a = turn * i * Math.PI / 180, c = (sc * Math.cos(a)).toFixed(4), d = (sc * Math.sin(a)).toFixed(4); return `<use href="#base" transform="matrix(${c} ${d} ${-d} ${c} 0 0)"/>`; }).join('');
  const i = Math.round((ex.value - ex.min) / ex.step);
  return { data: { kind: 'ring', copies, turn, shrink, curves }, still: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW}"><defs><polygon id="base" points="${poly(curves[i])}" fill="none" stroke="#10253b" stroke-width=".7" stroke-linejoin="round"/></defs>${uses}</svg>` };
}

// Threads between points; the network keeps those shorter than the reach. Export
// every thread that any reach keeps, with its length, so the browser can show
// exactly the ones the network would keep at the current reach.
function threads(s, ex) {
  set(s, ex, ex.max);
  const from = points(s, 'from'), to = points(s, 'to');
  const keep = rows(s, 'close'), dist = nums(s, 'distance').filter((_, i) => keep[i] === 'true');
  if (from.length !== dist.length || to.length !== dist.length) throw new Error('threads: lists differ in length');
  const order = dist.map((d, i) => i).sort((a, b) => dist[a] - dist[b]);
  const segs = order.map(i => [...from[i], ...to[i]].map(r1)).flat();
  return { data: { kind: 'threads', segs, lengths: order.map(i => r1(dist[i])) }, still: still(s, ex) };
}

// Day bars in a polar chart: for each day the radius of sunrise and the length of the day.
function bars(s, ex) {
  const angles = nums(s, 'day_angle');
  const frames = range(ex).map(v => { set(s, ex, v); return [nums(s, 'sunrise_radius').map(r1), nums(s, 'day_length').map(r1)]; });
  const svg = still(s, ex);
  // Everything but the bars and the title is the same at every latitude.
  s.disconnect('', 'scene', 'list2'); s.disconnect('', 'scene', 'list4');
  const fixed = s.svg(800, 700).replace(/^<svg[^>]*>|<\/svg>$/g, '');
  return { data: { kind: 'bars', angles: angles.map(r1), frames, fixed }, still: svg };
}

// Each node is the last one in a chain that starts at the frame: k = frame / 20
// + 0.35, reach = frame / 2 + 10, latitude = (frame / 0.5) mod 82 and
// the plotter's exponent ex = 2.355 * sin(frame / 300 + 2.8012) - 0.785, which
// goes from 0 down to -3.14, up to 1.57 and back. The number of points m is a
// plain number.
const port = (s, node, value) => s.setPort('', node, 'value1', String(value));
const cut = (s, node, value) => { s.disconnect('', node, 'value1'); port(s, node, value); };
const examples = [
  { id: 'generative', kind: strokes, strokes: { list: 'grid', angle: 'deg', length: 15 }, node: 'k', prepare: s => cut(s, 'k', 1), drive: (s, v) => port(s, 'k', v - .35), min: .4, max: 2.5, step: .05, value: 1 },
  { id: 'typography', kind: threads, node: 'reach', prepare: s => cut(s, 'reach', 40), drive: (s, v) => port(s, 'reach', v - 10), min: 10, max: 90, value: 50 },
  // daylight.csv has a column for every second degree of latitude.
  { id: 'data', kind: bars, node: 'latitude', prepare: s => cut(s, 'latitude', 52), drive: (s, v) => port(s, 'latitude', v), min: 0, max: 80, step: 2, value: 52 },
  { id: 'plotter', kind: ring, ring: { node: 'pt', copies: 60, turn: 1.5, shrink: .01 }, node: 'ex', prepare: s => cut(s, 'ex', -2.2 + .785), drive: (s, v) => port(s, 'ex', v + .785), min: -3.14, max: 1.56, step: .02, value: -2.2 },
];

for (const ex of examples) {
  const s = await open(join(out, `${ex.id}.ndbx`));
  const { data, still: svg } = ex.kind(s, ex);
  await writeFile(join(out, `${ex.id}.svg`), svg);
  const json = JSON.stringify({ viewBox: VIEW, min: ex.min, max: ex.max, step: ex.step, ...data });
  await writeFile(join(out, `${ex.id}.json`), json);
  console.log(ex.id, (json.length / 1024 | 0) + 'KB', 'gz', (gzipSync(json).length / 1024 | 0) + 'KB');
  s.free();
}
