// Usage: node scripts/generate-artwork.mjs /path/to/nodebox4
// Export a real NodeBox surface as SVG and a compact, interactive morph.
// Ordinary Eleventy builds use checked-in assets and need no NodeBox engine.
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

if (!process.argv[2]) throw new Error('Provide the path to a built NodeBox checkout.');
const pkg = resolve(process.argv[2], 'app/src/engine/pkg');
const { initSync, Session } = await import(pathToFileURL(join(pkg, 'nodebox_wasm.js')));
initSync({ module: await readFile(join(pkg, 'nodebox_wasm_bg.wasm')) });
const session = new Session();
session.open(await readFile(new URL('../media/design/possibilities.ndbx', import.meta.url), 'utf8'));
const graph = JSON.parse(session.network(''));
const rotation = graph.children.find(node => node.name === 'rotate');
if (graph.rendered !== 'rotate' || rotation?.prototype !== 'corevector.rotate') throw new Error('Expected the final rotation node.');
const angle = Number(rotation.ports.find(port => port.name === 'angle').value);
const viewBox = '-400 -350 800 700';
const round = x => Number(x.toFixed(3));
const layers = [
  { name: 'warp', stroke: '#2355ed', width: 1.8, opacity: 1 },
  { name: 'weft', stroke: '#10253b', width: .9, opacity: .6 },
];
function pointsFor(layer, row, bend) {
  session.setPort(layer, 'fixed', 'value', String(row));
  session.setPort(layer, 'amplitude', 'value', String(bend));
  const result = JSON.parse(session.output(layer, 'points', 1, 65));
  if (result.error || result.count !== 65) throw new Error(JSON.stringify(result));
  const points = result.rows.flatMap(point => point.text.split(',').map(Number));
  if (points.length !== 130 || points.some(x => !Number.isFinite(x))) throw new Error('Invalid points');
  return points;
}
try {
  const paths = [];
  for (const layer of layers) {
    for (let row = 0; row <= 26; row++) {
      const position = -.5 + row / 26;
      const start = pointsFor(layer.name, position, 60);
      const end = pointsFor(layer.name, position, 240);
      const middle = pointsFor(layer.name, position, 150);
      // This network is affine in bend. Verify that condition before shipping
      // an interpolated browser version; fail if a future graph changes it.
      if (middle.some((x, i) => Math.abs(x - (start[i] + end[i]) / 2) > 1e-7)) {
        throw new Error('The network is no longer linear in bend; interpolation would be inaccurate.');
      }
      paths.push({ stroke: layer.stroke, width: layer.width, opacity: layer.opacity,
        points: start.map(round), delta: end.map((x, i) => round(x - start[i])) });
    }
  }
  // Verify that the complete, downloadable network evaluates too.
  const scene = session.render('', 1);
  if (scene.error || scene.items.length / 12 !== paths.length) throw new Error('The full surface failed to render.');
  const title = 'A woven surface made from two intersecting families of curved blue and navy paths';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><title>${title}</title><g transform="rotate(${angle})" fill="none" stroke-linejoin="round" stroke-linecap="round">${paths.map(path => `<polyline stroke="${path.stroke}" stroke-width="${path.width}" opacity="${path.opacity}" points="${path.points.map((x,i)=>round(x + path.delta[i] / 2)).join(' ')}"/>`).join('')}</g></svg>`;
  await writeFile(new URL('../media/design/possibilities.svg', import.meta.url), svg);
  await writeFile(new URL('../media/design/surface.json', import.meta.url), JSON.stringify({ paths, angle, viewBox }));
  await unlink(new URL('../media/design/possibilities-frames.json', import.meta.url)).catch(error => { if (error.code !== 'ENOENT') throw error; });
  console.log(`Exported ${paths.length} paths from NodeBox. Verified the midpoint of every path and the full network.`);
} finally { session.free(); }
