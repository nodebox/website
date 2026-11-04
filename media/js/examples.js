// Homepage examples. Each one is a NodeBox network evaluated ahead of time (see
// DESIGN.md). The browser draws the result for any slider value, interpolating
// between evaluated steps where a value changes smoothly, and sweeps the slider
// slowly, back and forth, until the reader touches it or presses pause.
const ns = 'http://www.w3.org/2000/svg';
const el = (name, attrs = {}) => {
  const node = document.createElementNS(ns, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
};
const mix = (a, b, t) => a + (b - a) * t;
// The two evaluated steps around a value, and how far between them it is.
const between = (value, min, step, count) => {
  const f = Math.min(Math.max((value - min) / step, 0), count - 1);
  const i = Math.min(Math.floor(f), count - 2);
  return [i, f - i];
};

// Each drawing function returns [svg, draw(value)].
const drawings = {
  // Short strokes on a grid. The start points are fixed; each step has its own angles.
  strokes({ viewBox, min, step, length, starts, frames }) {
    const svg = el('svg', { viewBox });
    const path = el('path', { fill: 'none', stroke: '#2355ed', 'stroke-width': 1.6 });
    svg.append(path);
    return [svg, value => {
      const [i, t] = between(value, min, step, frames.length);
      const a = frames[i], b = frames[i + 1];
      let d = '';
      for (let j = 0; j < a.length; j++) {
        const angle = mix(a[j], b[j], t) * Math.PI / 180;
        d += `M${starts[j * 2]} ${starts[j * 2 + 1]}l${(length * Math.cos(angle)).toFixed(1)} ${(length * Math.sin(angle)).toFixed(1)}`;
      }
      path.setAttribute('d', d);
    }];
  },

  // One closed curve per step, repeated with a growing turn and shrink.
  ring({ viewBox, min, step, curves, copies, turn, shrink }) {
    const svg = el('svg', { viewBox });
    const base = el('polygon', { id: 'ring-base', fill: 'none', 'stroke-width': .6, 'stroke-linejoin': 'round' });
    const defs = el('defs');
    defs.append(base);
    svg.append(defs);
    for (let i = 0; i < copies; i++) {
      const scale = 1 - shrink * i, angle = turn * i * Math.PI / 180;
      const c = (scale * Math.cos(angle)).toFixed(4), d = (scale * Math.sin(angle)).toFixed(4);
      svg.append(el('use', { href: '#ring-base', transform: `matrix(${c} ${d} ${-d} ${c} 0 0)` }));
    }
    return [svg, value => {
      const [i, t] = between(value, min, step, curves.length);
      const a = curves[i], b = curves[i + 1];
      const out = new Array(a.length / 2);
      for (let j = 0; j < out.length; j++) out[j] = `${mix(a[j * 2], b[j * 2], t).toFixed(1)},${mix(a[j * 2 + 1], b[j * 2 + 1], t).toFixed(1)}`;
      base.setAttribute('points', out.join(' '));
    }];
  },

  // Threads between points on a word. Sorted by length; the slider sets the longest one drawn.
  threads({ viewBox, segs, lengths }) {
    const svg = el('svg', { viewBox });
    const path = el('path', { fill: 'none', stroke: '#2355ed', 'stroke-width': .5 });
    svg.append(path);
    const pieces = lengths.map((_, i) => `M${segs[i * 4]} ${segs[i * 4 + 1]}L${segs[i * 4 + 2]} ${segs[i * 4 + 3]}`);
    let shown = -1;
    return [svg, value => {
      let count = 0;
      while (count < lengths.length && lengths[count] < value) count++;
      if (count !== shown) { shown = count; path.setAttribute('d', pieces.slice(0, count).join('')); }
    }];
  },

  // A polar chart of days: the sun is up from each bar's start to its end.
  bars({ viewBox, min, step, angles, frames, fixed }) {
    const svg = el('svg', { viewBox });
    const path = el('path', { fill: 'none', stroke: '#2355ed', 'stroke-width': 2.2 });
    const title = el('text', { y: 12, 'text-anchor': 'middle', 'font-size': 34, 'font-weight': 700, 'font-family': 'var(--font)', fill: '#10253b' });
    const rest = el('g');
    rest.innerHTML = fixed;
    svg.append(path, rest, title);
    const cos = angles.map(a => Math.cos(a * Math.PI / 180)), sin = angles.map(a => Math.sin(a * Math.PI / 180));
    return [svg, value => {
      const [i, t] = between(value, min, step, frames.length);
      const [r0, l0] = frames[i], [r1, l1] = frames[i + 1];
      let d = '';
      for (let j = 0; j < angles.length; j++) {
        const length = mix(l0[j], l1[j], t);
        if (length < .1) continue;
        const start = mix(r0[j], r1[j], t), end = start + length;
        d += `M${(start * cos[j]).toFixed(1)} ${(start * sin[j]).toFixed(1)}L${(end * cos[j]).toFixed(1)} ${(end * sin[j]).toFixed(1)}`;
      }
      path.setAttribute('d', d);
      title.textContent = `${Math.round(value)}° N`;
    }];
  },
};

const still = matchMedia('(prefers-reduced-motion: reduce)');
const onScreen = new Set();
const watcher = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));

// Ping-pong: the slider travels at a constant speed to one end, then back, while
// playing. Moving it by hand pauses it, so the reader's value is never overwritten.
function animate(example, input, button, show, seconds = 20) {
  const min = +input.min, max = +input.max;
  let playing = false, last = 0, direction = 1, frame = 0;
  const tick = now => {
    frame = requestAnimationFrame(tick);
    const dt = now - last;
    last = now;
    if (example.hidden || !onScreen.has(example) || document.hidden) return;
    let u = (+input.value - min) / (max - min) + direction * dt / 1000 / seconds;
    if (u > 1) { u = 2 - u; direction = -1; }
    if (u < 0) { u = -u; direction = 1; }
    input.value = min + (max - min) * u;
    show();
  };
  const play = on => {
    if (on === playing) return;
    playing = on;
    button.setAttribute('aria-label', on ? 'Pause animation' : 'Play animation');
    button.dataset.playing = on;
    cancelAnimationFrame(frame);
    if (on) { last = performance.now(); frame = requestAnimationFrame(tick); }
  };
  button.addEventListener('click', () => play(!playing));
  input.addEventListener('input', () => { play(false); show(); });
  still.addEventListener('change', () => play(!still.matches));
  watcher.observe(example);
  play(!still.matches);
}

async function start(example) {
  if (example.dataset.started) return;
  example.dataset.started = 'true';
  const stage = example.querySelector('.artwork-stage');
  const input = example.querySelector('input');
  const output = example.querySelector('output');
  const button = example.querySelector('.example-play');
  try {
    const data = await (await fetch(example.dataset.src)).json();
    const [svg, draw] = drawings[data.kind](data);
    const img = stage.querySelector('img');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', img.alt);
    const digits = +input.dataset.digits;
    const show = () => { draw(+input.value); output.textContent = (+input.value).toFixed(digits) + input.dataset.unit; };
    show();
    stage.replaceChildren(svg);
    input.disabled = false;
    button.disabled = false;
    animate(example, input, button, show);
  } catch (error) {
    console.warn('NodeBox example:', error);
  }
}

// Tabs: arrow keys move between them, as in the ARIA tabs pattern.
for (const list of document.querySelectorAll('[role=tablist]')) {
  const tabs = [...list.querySelectorAll('[role=tab]')];
  const select = tab => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) start(panel);
    }
  };
  list.addEventListener('click', e => { const tab = e.target.closest('[role=tab]'); if (tab) select(tab); });
  list.addEventListener('keydown', e => {
    const i = tabs.indexOf(document.activeElement);
    const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (i < 0 || next === undefined) return;
    e.preventDefault();
    const tab = tabs[(next + tabs.length) % tabs.length];
    tab.focus();
    select(tab);
  });
}

const visible = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { visible.unobserve(e.target); start(e.target); } }), { rootMargin: '200px' });
document.querySelectorAll('.example:not([hidden])').forEach(e => visible.observe(e));
