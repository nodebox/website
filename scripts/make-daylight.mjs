// Usage: node scripts/make-daylight.mjs
// Writes media/homepage/examples/daylight.csv: the hours between sunrise and sunset
// on each day of the year, for every second degree of northern latitude. It uses
// the solar declination from the day number, with no refraction, so the values
// are close to published tables but not a substitute for them.
import { writeFile } from 'node:fs/promises';

const rad = Math.PI / 180;
const latitudes = Array.from({ length: 41 }, (_, i) => i * 2);
const lines = ['day,' + latitudes.map(l => 'lat' + l).join(',')];
for (let day = 1; day <= 365; day++) {
  const declination = 23.44 * Math.sin(2 * Math.PI * (284 + day) / 365) * rad;
  lines.push(day + ',' + latitudes.map(l => {
    const x = Math.max(-1, Math.min(1, -Math.tan(l * rad) * Math.tan(declination)));
    return (2 / 15 * Math.acos(x) / rad).toFixed(2);
  }).join(','));
}
await writeFile(new URL('../media/homepage/examples/daylight.csv', import.meta.url), lines.join('\n') + '\n');
