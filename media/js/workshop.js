// Both endpoints come from the downloadable NodeBox network. Its geometry is
// linear in the bend parameter, verified by the exporter, so the browser only
// needs to interpolate those evaluated points rather than load the full engine.
const input = document.querySelector('#bend');
const stage = document.querySelector('#artwork-stage');
const value = document.querySelector('#bend-value');
const status = document.querySelector('#artwork-status');
async function loadSurface() {
  try {
    const response = await fetch('/media/design/surface.json');
    if (!response.ok) throw new Error(`Artwork request failed: ${response.status}`);
    const { paths, angle, viewBox } = await response.json();
    if (!Array.isArray(paths) || paths.length !== 54 || paths.some(p => !Array.isArray(p.points) || p.points.length !== 130 || !Array.isArray(p.delta) || p.delta.length !== 130 || [...p.points, ...p.delta].some(x => !Number.isFinite(x)))) throw new Error('Invalid surface geometry');
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', viewBox);
    const group = document.createElementNS(ns, 'g');
    group.setAttribute('transform', `rotate(${angle})`);
    svg.append(group);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'A woven surface made from two intersecting families of curved blue and navy paths.');
    const elements = paths.map(path => {
      const line = document.createElementNS(ns, 'polyline');
      line.setAttribute('fill', 'none');
      line.setAttribute('stroke', path.stroke);
      line.setAttribute('stroke-width', path.width);
      line.setAttribute('opacity', path.opacity);
      line.setAttribute('stroke-linejoin', 'round');
      line.setAttribute('stroke-linecap', 'round');
      group.append(line);
      return line;
    });
    function draw() {
      const amount = Number(input.value) / 100;
      paths.forEach((path, i) => elements[i].setAttribute('points', path.points.map((x, j) => (x + path.delta[j] * amount).toFixed(3)).join(' ')));
      value.textContent = `${input.value}%`;
      input.setAttribute('aria-valuetext', `${input.value} percent bend`);
    }
    draw();
    stage.replaceChildren(svg);
    input.disabled = false;
    input.addEventListener('input', draw);
  } catch (error) {
    status.textContent = 'The interactive control is unavailable. You can still download the NodeBox network.';
    console.warn('NodeBox artwork:', error.message);
  }
}
if (input && stage && value && status) {
  if (document.readyState === 'complete') loadSurface();
  else window.addEventListener('load', loadSurface, { once:true });
}
