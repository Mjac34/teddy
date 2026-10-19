// Egenritade illustrationer (SVG). Scen: viewBox 0 0 400 300. Figurer: fötterna i (0,0).
function starPts(cx, cy, R, r, n = 5) {
  const p = [];
  for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + i * Math.PI / n, d = i % 2 ? r : R; p.push((cx + d * Math.cos(a)).toFixed(1) + ',' + (cy + d * Math.sin(a)).toFixed(1)); }
  return p.join(' ');
}
const star = (cx, cy, R, c = '#fff') => `<polygon points="${starPts(cx, cy, R, R * .45)}" fill="${c}"/>`;
const rays = (cx, cy, r1, r2, step, c, w = 4) => { let s = ''; for (let a = 0; a < 360; a += step) { const t = a * Math.PI / 180; s += `<line x1="${(cx + r1 * Math.cos(t)).toFixed(1)}" y1="${(cy + r1 * Math.sin(t)).toFixed(1)}" x2="${(cx + r2 * Math.cos(t)).toFixed(1)}" y2="${(cy + r2 * Math.sin(t)).toFixed(1)}"/>`; } return `<g stroke="${c}" stroke-width="${w}" stroke-linecap="round">${s}</g>`; };
const HEART = 'M50 86 C20 66 8 50 8 34 C8 20 18 12 30 12 C40 12 46 18 50 26 C54 18 60 12 70 12 C82 12 92 20 92 34 C92 50 80 66 50 86Z';
const INK = '#3e2723';

// ---------- Figurer ----------
const KIND = {
  teddy: { c: '#c68a4e', d: '#8b5a2b', e: '#f3d9b1', b: '#f3d9b1' },
  vuxen: { c: '#8d6e63', d: '#5d4037', e: '#d7ccc8', b: '#d7ccc8' },
  kanin: { c: '#f5f5f5', d: '#b0bec5', e: '#f8bbd0', b: '#fff' },
  mus: { c: '#bdbdbd', d: '#757575', e: '#f8bbd0', b: '#eeeeee' },
  anka: { c: '#ffd54f', d: '#f9a825', e: '#ff8f00', b: '#fff59d' },
};
// Humör: glad, lugn, ledsen, ledsen2 (utan tår), sur, arg, forvanad, blasa
function features(m, beak) {
  let s = '';
  if (m === 'lugn') s += `<path d="M-15 -1 q5 -5 10 0 M5 -1 q5 -5 10 0" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  else { const r = m === 'forvanad' ? 4.4 : 3.6; s += `<circle cx="-10" cy="-2" r="${r}" fill="${INK}"/><circle cx="10" cy="-2" r="${r}" fill="${INK}"/><circle cx="-8.8" cy="-3.4" r="1.3" fill="#fff"/><circle cx="11.2" cy="-3.4" r="1.3" fill="#fff"/>`; }
  if (m === 'arg' || m === 'sur') s += `<path d="M-17 -13 L-5 -8 M17 -13 L5 -8" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`;
  if (m === 'ledsen' || m === 'ledsen2') s += `<path d="M-16 -9 L-5 -13 M16 -9 L5 -13" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
  if (m === 'blasa') s += `<circle cx="-15" cy="11" r="8" fill="#ef9a9a" opacity=".7"/><circle cx="15" cy="11" r="8" fill="#ef9a9a" opacity=".7"/>`;
  else if (m !== 'arg') s += `<circle cx="-17" cy="9" r="4.5" fill="#f48fb1" opacity=".55"/><circle cx="17" cy="9" r="4.5" fill="#f48fb1" opacity=".55"/>`;
  if (!beak) {
    if (m === 'glad' || m === 'lugn') s += `<path d="M-6 11 q6 6 12 0" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    else if (m === 'forvanad') s += `<ellipse cx="0" cy="14" rx="3.5" ry="4.5" fill="${INK}"/>`;
    else if (m === 'blasa') s += `<circle cx="0" cy="14" r="3" fill="none" stroke="${INK}" stroke-width="2.2"/>`;
    else s += `<path d="M-6 16 q6 -6 12 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  }
  if (m === 'ledsen') s += `<path class="tear" d="M-11 4 q4 6 0 9 q-4 -3 0 -9z" fill="#4fc3f7"/>`;
  return s;
}
function headG(kind, m) {
  const { c, d, e } = KIND[kind];
  const red = m === 'arg' ? `<circle r="26" fill="#ff1744" opacity=".28"/>` : '';
  const steam = m === 'arg' ? `<g fill="#fff" opacity=".9" class="steam"><circle cx="-30" cy="-26" r="5"/><circle cx="-36" cy="-34" r="3.5"/><circle cx="30" cy="-26" r="5"/><circle cx="36" cy="-34" r="3.5"/></g>` : '';
  switch (kind) {
    case 'teddy': case 'vuxen':
      return `<circle cx="-19" cy="-19" r="10" fill="${c}"/><circle cx="-19" cy="-19" r="5" fill="${d}"/><circle cx="19" cy="-19" r="10" fill="${c}"/><circle cx="19" cy="-19" r="5" fill="${d}"/><circle r="26" fill="${c}"/><ellipse cx="0" cy="10" rx="12" ry="9" fill="${e}"/>${red}` + features(m) + `<ellipse cx="0" cy="5" rx="4.2" ry="3" fill="${INK}"/>` + steam;
    case 'kanin':
      return `<ellipse cx="-10" cy="-38" rx="7" ry="22" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="-10" cy="-38" rx="3.5" ry="16" fill="${e}"/><ellipse cx="10" cy="-38" rx="7" ry="22" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="10" cy="-38" rx="3.5" ry="16" fill="${e}"/><circle r="26" fill="${c}" stroke="${d}" stroke-width="2"/>${red}` + features(m) + `<ellipse cx="0" cy="6" rx="3.5" ry="2.6" fill="#f06292"/>` + steam;
    case 'mus':
      return `<circle cx="-21" cy="-19" r="14" fill="${c}"/><circle cx="-21" cy="-19" r="8.5" fill="${e}"/><circle cx="21" cy="-19" r="14" fill="${c}"/><circle cx="21" cy="-19" r="8.5" fill="${e}"/><circle r="25" fill="${c}"/>${red}` + features(m) + `<circle cx="0" cy="6" r="3.6" fill="#f06292"/><path d="M-8 8 H-26 M-8 11 L-24 16 M8 8 H26 M8 11 L24 16" stroke="${d}" stroke-width="1.3"/>` + steam;
    case 'anka':
      return `<path d="M-2 -25 q-6 -10 2 -14 q-2 6 4 8 q4 -6 8 -2 q-6 2 -6 8z" fill="${d}"/><circle r="26" fill="${c}"/>${red}` + features(m, true) + (m === 'glad' || m === 'lugn' ? `<path d="M-12 7 Q0 1 12 7 Q6 15 0 15 Q-6 15 -12 7Z" fill="${e}"/><path d="M-11 8 Q0 12 11 8" stroke="#e65100" stroke-width="1.5" fill="none"/>` : `<path d="M-12 8 Q0 3 12 8 Q0 15 -12 8Z" fill="${e}"/>`) + steam;
  }
  return '';
}
function bodyG(kind, pose) {
  const { c, d, b } = KIND[kind];
  let s = '';
  if (kind === 'mus') s += `<path d="M18 50 Q46 52 40 30 Q36 18 46 12" stroke="${d}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if (kind === 'kanin') s += `<circle cx="21" cy="46" r="7" fill="#fff" stroke="${d}" stroke-width="1.5"/>`;
  if (kind === 'anka') s += `<path d="M18 40 L32 30 L26 46Z" fill="${c}"/>`;
  const st = kind === 'kanin' ? `stroke="${d}" stroke-width="2"` : '';
  s += `<ellipse cx="0" cy="32" rx="22" ry="26" fill="${c}" ${st}/><ellipse cx="0" cy="36" rx="13" ry="16" fill="${b}"/>`;
  const armC = kind === 'anka' ? d : c;
  s += pose === 'upp'
    ? `<ellipse cx="-27" cy="4" rx="7" ry="14" fill="${armC}" transform="rotate(-28 -27 4)"/><ellipse cx="27" cy="4" rx="7" ry="14" fill="${armC}" transform="rotate(28 27 4)"/>`
    : pose === 'kram'
      ? `<ellipse cx="-14" cy="26" rx="14" ry="7" fill="${armC}" transform="rotate(-10 -14 26)"/><ellipse cx="14" cy="26" rx="14" ry="7" fill="${armC}" transform="rotate(10 14 26)"/>`
      : `<ellipse cx="-22" cy="26" rx="7" ry="13" fill="${armC}" transform="rotate(20 -22 26)"/><ellipse cx="22" cy="26" rx="7" ry="13" fill="${armC}" transform="rotate(-20 22 26)"/>`;
  s += kind === 'anka'
    ? `<path d="M-20 62 l8 -8 l8 8z M4 62 l8 -8 l8 8z" fill="#ff8f00"/>`
    : `<ellipse cx="-11" cy="57" rx="10" ry="6" fill="${c}" ${st}/><ellipse cx="11" cy="57" rx="10" ry="6" fill="${c}" ${st}/>`;
  if (kind === 'teddy') s += `<path d="M0 26 L-10 20 V32Z M0 26 L10 20 V32Z" fill="#e53935"/><circle cx="0" cy="26" r="3.2" fill="#c62828"/>`;
  if (kind === 'vuxen') s += `<path d="M-21 18 Q0 30 21 18 L21 25 Q0 37 -21 25Z" fill="#43a047"/><path d="M8 28 L14 50 L22 46 L15 27Z" fill="#388e3c"/>`;
  return s;
}
const charG = (kind, m = 'glad', pose) => `<g transform="translate(0 -63)">${bodyG(kind, pose)}${headG(kind, m)}</g>`;
const headSvg = (kind, m = 'glad') => `<svg viewBox="-46 -64 92 96">${headG(kind, m)}</svg>`;
const charSvg = (kind, m = 'glad', pose) => `<svg viewBox="-50 -158 100 162"><g transform="translate(0 0)">${charG(kind, m, pose)}</g></svg>`;

// ---------- Saker (lokala koordinater, botten-mitt i 0,0) ----------
const carShape = c => `<path d="M10 66 V52 Q10 46 18 45 L30 30 Q34 26 40 26 H62 Q68 26 72 31 L82 45 Q92 46 92 54 V66Z" fill="${c}"/><path d="M34 44 L41 32 H50 V44Z M55 44 V32 H63 Q66 32 68 35 L74 44Z" fill="#b3e5fc"/><circle cx="30" cy="68" r="10" fill="#37474f"/><circle cx="30" cy="68" r="4" fill="#cfd8dc"/><circle cx="72" cy="68" r="10" fill="#37474f"/><circle cx="72" cy="68" r="4" fill="#cfd8dc"/>`;
const PROP = {
  leksaksbil: (c = '#e53935') => `<g transform="translate(-22 -34) scale(.44)">${carShape(c)}</g>`,
  bil: (c = '#1e88e5') => `<g transform="translate(-51 -78)">${carShape(c)}</g>`,
  boll: () => `<g transform="translate(0 -13)"><circle r="13" fill="#ffca28"/><path d="M-13 0 H13 M0 -13 Q-9 0 0 13 M0 -13 Q9 0 0 13" stroke="#e53935" stroke-width="2.5" fill="none"/></g>`,
  fotspar: () => `<g transform="translate(-14 -10)" fill="#8d6e63" opacity=".8"><ellipse cx="7" cy="12" rx="6" ry="7"/><circle cx="2" cy="3" r="2.4"/><circle cx="7" cy="1" r="2.4"/><circle cx="12" cy="3" r="2.4"/><ellipse cx="21" cy="8" rx="6" ry="7"/><circle cx="16" cy="-1" r="2.4"/><circle cx="21" cy="-3" r="2.4"/><circle cx="26" cy="-1" r="2.4"/></g>`,
  fotsparKlar: () => `<g transform="translate(-14 -10)" fill="#43a047"><ellipse cx="7" cy="12" rx="6" ry="7"/><circle cx="2" cy="3" r="2.4"/><circle cx="7" cy="1" r="2.4"/><circle cx="12" cy="3" r="2.4"/><ellipse cx="21" cy="8" rx="6" ry="7"/><circle cx="16" cy="-1" r="2.4"/><circle cx="21" cy="-3" r="2.4"/><circle cx="26" cy="-1" r="2.4"/></g>`,
  pol: () => `<ellipse cx="0" cy="-6" rx="30" ry="9" fill="#64b5f6"/><ellipse cx="-8" cy="-8" rx="10" ry="3" fill="#bbdefb"/>`,
  sol: () => rays(0, 0, 24, 34, 30, '#ffb300', 5) + `<circle r="20" fill="#ffca28"/>`,
  ljus: () => `<rect x="-9" y="-50" width="18" height="50" rx="4" fill="#f8bbd0" stroke="#ec407a" stroke-width="2"/><line x1="0" y1="-50" x2="0" y2="-57" stroke="${INK}" stroke-width="2"/><g class="flame"><path d="M0 -78 Q10 -64 0 -56 Q-10 -64 0 -78Z" fill="#ffb300"/><path d="M0 -70 Q5 -63 0 -58 Q-5 -63 0 -70Z" fill="#fff59d"/></g>`,
  ljusSlackt: () => `<rect x="-9" y="-50" width="18" height="50" rx="4" fill="#f8bbd0" stroke="#ec407a" stroke-width="2"/><line x1="0" y1="-50" x2="0" y2="-57" stroke="${INK}" stroke-width="2"/><path d="M0 -60 q-6 -8 0 -14 q6 -6 0 -14" stroke="#b0bec5" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  kudde: () => `<path d="M-50 -60 Q0 -72 50 -60 Q60 -32 50 -4 Q0 6 -50 -4 Q-60 -32 -50 -60Z" fill="#9575cd" stroke="#5e35b1" stroke-width="3"/><path d="M-30 -40 l6 6 M30 -40 l-6 6" stroke="#d1c4e9" stroke-width="3" stroke-linecap="round"/>` + `<g transform="translate(-20 -48) scale(.4)"><path d="${HEART}" fill="#f48fb1"/></g>`,
  fotter: () => `<g fill="#c68a4e" stroke="#8b5a2b" stroke-width="3"><ellipse cx="-30" cy="-26" rx="24" ry="30"/><ellipse cx="30" cy="-26" rx="24" ry="30"/></g><g fill="#f3d9b1"><ellipse cx="-30" cy="-20" rx="13" ry="15"/><ellipse cx="30" cy="-20" rx="13" ry="15"/><circle cx="-42" cy="-46" r="5"/><circle cx="-30" cy="-50" r="5"/><circle cx="-18" cy="-46" r="5"/><circle cx="18" cy="-46" r="5"/><circle cx="30" cy="-50" r="5"/><circle cx="42" cy="-46" r="5"/></g>`,
  hand: () => `<g transform="translate(-50 -100)">${handIcon()}</g>`,
  kloss: (c, l) => `<rect x="-15" y="-30" width="30" height="30" rx="4" fill="${c}" stroke="rgba(0,0,0,.2)" stroke-width="2"/><text x="0" y="-8" font-size="18" font-weight="bold" text-anchor="middle" fill="#fff" font-family="sans-serif">${l}</text>`,
  timglas: () => `<g transform="translate(-24 -80) scale(.4)"><path d="M22 20 C22 65 54 80 56 100 C54 120 22 135 22 180 L98 180 C98 135 66 120 64 100 C66 80 98 65 98 20Z" fill="#e1f5fe" stroke="#80deea" stroke-width="6"/><path class="sTop" d="M38 60 H82 L62 98 H58Z" fill="#ffb300"/><path class="sBot" d="M30 178 Q60 130 90 178Z" fill="#ffb300"/><rect x="6" y="4" width="108" height="20" rx="8" fill="#6d4c41"/><rect x="6" y="176" width="108" height="20" rx="8" fill="#6d4c41"/></g>`,
  panel: (w, h) => `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="18" fill="#fff" opacity=".88"/>`,
  matare: () => `<rect x="-11" y="-150" width="22" height="150" rx="11" fill="#fff" stroke="#90a4ae" stroke-width="3"/><rect class="mfill" x="-7" y="-146" width="14" height="142" rx="7" fill="#e53935"/><circle cx="0" cy="-168" r="15" fill="#fff" stroke="#90a4ae" stroke-width="3"/><g class="mface"></g>`,
};

// ---------- Ikoner (viewBox 0 0 100 100) ----------
function handIcon(c = '#e53935') {
  return `<path d="M50 4 L80 16 L94 46 L82 78 L50 96 L18 78 L6 46 L20 16Z" fill="${c}"/>
    <g fill="#fff"><rect x="30" y="44" width="40" height="36" rx="12"/><rect x="31" y="22" width="8" height="34" rx="4"/><rect x="41" y="16" width="8" height="38" rx="4"/><rect x="51" y="18" width="8" height="36" rx="4"/><rect x="61" y="26" width="8" height="30" rx="4"/><rect x="66" y="48" width="8" height="24" rx="4" transform="rotate(35 70 60)"/></g>`;
}
const ic = s => `<svg viewBox="0 0 100 100">${s}</svg>`;
const ICON = {
  ga: ic(`<g transform="translate(50 62) scale(1.8)">${PROP.fotspar()}</g>`),
  plaska: ic(`<g transform="translate(50 70) scale(1.4)">${PROP.pol()}</g><g fill="#64b5f6"><path d="M30 40 q4 -14 8 0 q-4 6 -8 0z"/><path d="M62 34 q4 -14 8 0 q-4 6 -8 0z"/><path d="M48 26 q4 -14 8 0 q-4 6 -8 0z"/></g>`),
  hand: ic(handIcon()),
  boll: ic(`<g transform="translate(50 82) scale(2.6)">${PROP.boll()}</g>`),
  ljus: ic(`<g transform="translate(26 92) scale(.85)">${PROP.ljus()}</g><g transform="translate(50 92) scale(.85)">${PROP.ljus()}</g><g transform="translate(74 92) scale(.85)">${PROP.ljus()}</g>`),
  stampa: ic(`<g transform="translate(50 88) scale(.72)">${PROP.fotter()}</g><path d="M8 92 H92" stroke="#8d6e63" stroke-width="5" stroke-linecap="round"/><path d="M10 20 l8 8 M90 20 l-8 8 M50 6 v10" stroke="#ffb300" stroke-width="5" stroke-linecap="round"/>`),
  kudde: ic(`<g transform="translate(50 84) scale(.78)">${PROP.kudde()}</g>`),
  vuxen: ic(`<g transform="translate(50 60) scale(1.3)">${headG('vuxen', 'glad')}</g>`),
  forlat: ic(`<path d="M10 14 H90 Q96 14 96 20 V62 Q96 68 90 68 H44 L24 88 L28 68 H10 Q4 68 4 62 V20 Q4 14 10 14Z" fill="#fff" stroke="#90a4ae" stroke-width="4"/><g transform="translate(29 18) scale(.42)"><path d="${HEART}" fill="#ec407a"/></g>`),
  trosta: ic(`<g transform="translate(6 20) scale(.88)"><path d="${HEART}" fill="#ef5350"/></g><path d="M20 70 Q8 50 18 34 M80 70 Q92 50 82 34" stroke="#c68a4e" stroke-width="12" fill="none" stroke-linecap="round"/>`),
  bygga: ic(`<g transform="translate(36 96)">${PROP.kloss('#42a5f5', 'A')}</g><g transform="translate(66 96)">${PROP.kloss('#66bb6a', 'B')}</g><g transform="translate(51 64)">${PROP.kloss('#ef5350', 'C')}</g><g transform="translate(51 34)">${PROP.kloss('#ffca28', 'D')}</g>`),
  hus: ic(`<rect x="20" y="46" width="60" height="44" fill="#fff176" stroke="#f9a825" stroke-width="3"/><path d="M10 50 L50 14 L90 50Z" fill="#1e88e5"/><rect x="42" y="62" width="16" height="28" rx="3" fill="#8d6e63"/><rect x="26" y="56" width="12" height="12" fill="#b3e5fc"/><rect x="62" y="56" width="12" height="12" fill="#b3e5fc"/>`),
  lekaUte: ic(`<rect width="100" height="100" rx="14" fill="#c8e6c9"/><circle cx="74" cy="34" r="20" fill="#66bb6a"/><rect x="70" y="50" width="8" height="34" fill="#8d6e63"/><g transform="translate(34 86) scale(2)">${PROP.boll()}</g>`),
  timglas: ic(`<g transform="translate(50 90) scale(1)">${PROP.timglas()}</g>`),
};
const NUM = n => ic(`<circle cx="50" cy="50" r="44" fill="${['#ef5350', '#ffa726', '#ffca28', '#66bb6a', '#42a5f5'][n - 1]}"/><text x="50" y="68" font-size="52" font-weight="bold" text-anchor="middle" fill="#fff" font-family="sans-serif">${n}</text>`);

// ---------- Bakgrunder ----------
const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="-40" width="10" height="40" fill="#8d6e63"/><circle cx="0" cy="-52" r="22" fill="#66bb6a"/><circle cx="-14" cy="-40" r="14" fill="#66bb6a"/><circle cx="14" cy="-40" r="14" fill="#66bb6a"/></g>`;
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><circle cx="0" cy="0" r="12"/><circle cx="14" cy="-6" r="15"/><circle cx="30" cy="0" r="12"/><rect x="0" y="0" width="30" height="12"/></g>`;
const sky = `<defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#90caf9"/><stop offset="1" stop-color="#e3f2fd"/></linearGradient></defs><rect width="400" height="300" fill="url(#skyG)"/>`;
const BG = {
  forsthem: () => sky + cloud(120, 40) + cloud(230, 70, .8) +
    `<rect y="190" width="400" height="110" fill="#a5d6a7"/>
    <path d="M0 255 Q200 225 400 255 V285 Q200 255 0 285Z" fill="#d7ccc8"/>
    <g><rect x="8" y="128" width="84" height="72" fill="#fff3e0" stroke="#8d6e63" stroke-width="2.5"/><path d="M0 132 L50 96 L100 132Z" fill="#e53935"/><rect x="40" y="160" width="20" height="40" rx="3" fill="#8d6e63"/><rect x="16" y="142" width="16" height="14" fill="#b3e5fc"/><rect x="68" y="142" width="16" height="14" fill="#b3e5fc"/>${star(50, 117, 7, '#ffeb3b')}</g>
    ${tree(130, 205, .8)}${tree(270, 200, .7)}
    <g><rect x="312" y="124" width="80" height="76" fill="#fff176" stroke="#f9a825" stroke-width="2.5"/><path d="M302 128 L352 86 L402 128Z" fill="#1e88e5"/><rect x="342" y="158" width="20" height="42" rx="3" fill="#8d6e63"/><rect x="320" y="138" width="16" height="14" fill="#b3e5fc"/><rect x="368" y="138" width="16" height="14" fill="#b3e5fc"/></g>
    <rect id="dusk" width="400" height="300" fill="#311b92" opacity="0" style="transition:opacity 1.2s" pointer-events="none"/>`,
  stopp: () => sky + cloud(60, 30, .8) + cloud(280, 46) +
    `<g fill="#ffccbc" stroke="#bf8f7d" stroke-width="2"><rect x="20" y="70" width="60" height="62"/><rect x="100" y="56" width="50" height="76"/><rect x="250" y="66" width="70" height="66"/><rect x="340" y="80" width="50" height="52"/></g>
    <g fill="#b3e5fc">${[30, 54, 110, 128, 262, 290, 350, 368].map((x, i) => `<rect x="${x}" y="${i % 2 ? 90 : 84}" width="12" height="12"/>`).join('')}</g>
    ${tree(200, 132, .7)}
    <rect y="130" width="400" height="58" fill="#78909c"/><path d="M0 159 H400" stroke="#fff" stroke-width="4" stroke-dasharray="26 18"/>
    <rect y="186" width="400" height="20" fill="#cfd8dc"/><rect y="186" width="400" height="4" fill="#90a4ae"/>
    <rect y="206" width="400" height="94" fill="#aed581"/>${tree(36, 300, .9)}<g fill="#7cb342"><circle cx="372" cy="290" r="20"/><circle cx="392" cy="284" r="16"/></g>`,
  arg: () => `<rect width="400" height="210" fill="#ffe0b2"/><rect y="200" width="400" height="100" fill="#bcaaa4"/>
    <g stroke="#a1887f" stroke-width="2">${[230, 260, 290].map(y => `<line x1="0" y1="${y}" x2="400" y2="${y}"/>`).join('')}</g>
    <rect x="40" y="40" width="90" height="80" rx="6" fill="#b3e5fc" stroke="#fff" stroke-width="6"/><path d="M85 40 V120 M40 80 H130" stroke="#fff" stroke-width="4"/>
    <rect x="260" y="60" width="110" height="10" rx="3" fill="#8d6e63"/><rect x="270" y="38" width="18" height="22" fill="#ef5350"/><rect x="292" y="30" width="14" height="30" fill="#42a5f5"/><circle cx="330" cy="48" r="12" fill="#66bb6a"/>
    <ellipse cx="200" cy="268" rx="160" ry="26" fill="#ce93d8" opacity=".7"/>`,
  gunga: () => sky + cloud(40, 40, .8) + cloud(300, 30) +
    `<rect y="200" width="400" height="100" fill="#a5d6a7"/>${tree(370, 220, .8)}
    <rect x="20" y="250" width="70" height="30" rx="6" fill="#ffe082" stroke="#c8a24a" stroke-width="3"/>
    <path d="M110 292 L150 54 M190 292 L150 54 M210 292 L250 54 M290 292 L250 54" stroke="#e53935" stroke-width="8" stroke-linecap="round" fill="none" transform="translate(0 0)"/>
    <rect x="120" y="50" width="160" height="10" rx="5" fill="#c62828"/>`,
  forlat: () => `<rect width="400" height="210" fill="#e1f5fe"/><rect y="200" width="400" height="100" fill="#ffe0b2"/>
    <g stroke="#ffcc80" stroke-width="2">${[230, 260, 290].map(y => `<line x1="0" y1="${y}" x2="400" y2="${y}"/>`).join('')}</g>
    <rect x="24" y="70" width="110" height="90" fill="#fff" stroke="#90caf9" stroke-width="4"/>${star(56, 104, 14, '#ffca28')}<circle cx="100" cy="120" r="16" fill="#ef9a9a"/>
    <rect x="300" y="110" width="80" height="8" fill="#a1887f"/><rect x="310" y="90" width="18" height="20" fill="#ce93d8"/><rect x="334" y="96" width="18" height="14" fill="#80cbc4"/>`,
};
// Gungan: snören + säte, roterar kring (200, 58)
const SWING = `<g id="swingG"><path d="M178 58 V206 M222 58 V206" stroke="#616161" stroke-width="3"/><g id="seat"></g><rect x="170" y="204" width="60" height="10" rx="4" fill="#5d4037"/></g>`;

// Kort på startsidan
const CARD = {
  forsthem: () => ic(`<rect width="100" height="100" rx="14" fill="#c8e6c9"/><path d="M0 80 Q50 66 100 80 V92 Q50 78 0 92Z" fill="#d7ccc8"/><g transform="translate(38 0) scale(.62)">${ICON.hus.replace(/<\/?svg[^>]*>/g, '')}</g><g transform="translate(22 92) scale(.38)">${charG('teddy')}</g>`),
  stopp: () => ic(`<rect width="100" height="100" rx="14" fill="#cfd8dc"/><rect y="30" width="100" height="28" fill="#78909c"/><g transform="translate(58 44) scale(.62) translate(-50 -78)">${carShape('#1e88e5')}</g><g transform="translate(4 52) scale(.46)">${handIcon()}</g>`),
  arg: () => ic(`<rect width="100" height="100" rx="14" fill="#ffe0b2"/><g transform="translate(36 60) scale(1.15)">${headG('teddy', 'arg')}</g><g transform="translate(66 96) scale(.7)">${PROP.ljus()}</g><g transform="translate(86 96) scale(.7)">${PROP.ljus()}</g>`),
  gunga: () => ic(`<rect width="100" height="100" rx="14" fill="#bbdefb"/><path d="M14 98 L30 12 M46 98 L30 12 M54 98 L70 12 M86 98 L70 12" stroke="#e53935" stroke-width="5" fill="none"/><rect x="24" y="10" width="52" height="6" rx="3" fill="#c62828"/><g transform="rotate(14 50 14)"><path d="M40 14 V70 M60 14 V70" stroke="#616161" stroke-width="2"/><g transform="translate(50 78) scale(.5)">${charG('mus')}</g><rect x="36" y="68" width="28" height="6" rx="2" fill="#5d4037"/></g>`),
  forlat: () => ic(`<rect width="100" height="100" rx="14" fill="#e1f5fe"/><g transform="translate(34 64) scale(1.05)">${headG('anka', 'ledsen')}</g><g transform="translate(62 46) scale(.38)"><path d="${HEART}" fill="#ec407a"/></g><g transform="translate(76 96) scale(.8)">${PROP.kloss('#42a5f5', 'A')}</g>`),
};
