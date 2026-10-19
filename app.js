'use strict';
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const NS = 'http://www.w3.org/2000/svg';
const LS = 'teddy-v1';
const S = Object.assign({ vuxen: 'Mamma', voice: true, sound: true, rate: .9, stars: {} }, JSON.parse(localStorage.getItem(LS) || '{}'));
const save = () => localStorage.setItem(LS, JSON.stringify(S));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---------- Repliker: 'text' = berättaren, ['figur', 'text'] = figuren säger ----------
const LINES = {
  forsthem: {
    f1: ['vuxen', 'Nu är förskolan slut, Teddy! Först går vi hem. Sen får vi leka ute.'],
    f2: 'Hjälp Teddy att gå hem. Tryck på fotspåren!',
    f3: 'Titta, en vattenpöl! Teddy vill stanna och plaska.',
    f4: 'Ska Teddy gå vidare hem, eller stanna och plaska?',
    f_ga: 'Gå vidare', f_plaska: 'Plaska',
    f5: 'Plask, plask! Det är roligt. Men titta, solen går ner.',
    f6: ['vuxen', 'Om vi stannar länge hinner vi inte leka så mycket hemma. Först hem, sen leka!'],
    f7: ['vuxen', 'Nu går vi vidare. Kom, Teddy!'],
    f8: ['teddy', 'Hej då, vattenpöl!'],
    f13: 'Tryck på fotspåren igen!',
    f9: 'Hurra! Teddy är hemma. Först gick Teddy hem.',
    f10: 'Och sen får Teddy leka ute, jättelänge!',
    f11: 'Och sen får Teddy leka ute en liten stund.',
    f12: ['vuxen', 'Bra lyssnat, Teddy! Först gör man, sen får man.'],
  },
  stopp: {
    p1: 'Teddy och {vuxen} är i parken. Teddy vill sparka bollen. Vart ska han sparka?',
    p1b: 'Vart ska Teddy sparka bollen nu?',
    p_gras: 'På gräset', p_vag: 'Mot vägen',
    p2: 'Oj! Bollen rullade ut på vägen. Teddy vill springa efter.',
    s3: ['vuxen', 'STOPP, Teddy! Stå still!'],
    s4: 'Vad ska Teddy göra?',
    s_still: 'Stå still', s_spring: 'Springa',
    s9: 'Teddy står still. Titta, där kommer en bil!',
    s5: '{vuxen} hann ta Teddy i handen. Titta, där kommer en bil!',
    p3: 'Pyyys! Bilen körde över bollen. Nu är bollen platt.',
    p4: ['teddy', 'Åh nej, min boll!'],
    s7: ['vuxen', 'När jag säger stopp, då stannar vi. Då är vi säkra.'],
    p5: ['vuxen', 'Bra lyssnat, Teddy! Du stod kvar på trottoaren.'],
    p6: ['vuxen', 'Nu är vägen tom. Jag hämtar bollen.'],
    p7: ['vuxen', 'Bilar ser inte bollar. Därför sparkar vi bollen långt från vägen.'],
    p8: ['vuxen', 'Vi lagar bollen! Tryck på plåstret.'],
    p9: ['vuxen', 'Nu pumpar vi luft i bollen. Tryck på pumpen, många gånger!'],
    p10: 'Bollen är hel igen!',
    p11: ['vuxen', 'Titta först! Kommer det någon, eller är det fritt fram?'],
    p12m: 'Där kommer Mus!', p12a: 'Där kommer Anka!',
    p13: 'Det kommer ingen.',
    p_vanta: 'Vänta', p_sparka: 'Sparka',
    p15: 'Teddy väntar tills kompisen har gått förbi.',
    p16: 'Nu är det fritt fram!',
    p21: 'Teddy väntar. Men det kommer ingen. Det är fritt fram!',
    p17m: 'Aj! Bollen studsade på Mus.', p17a: 'Aj! Bollen studsade på Anka.',
    p18: ['teddy', 'Förlåt! Jag såg dig inte.'],
    p19m: ['mus', 'Det är okej, Teddy.'], p19a: ['anka', 'Det är okej, Teddy.'],
    p20: ['vuxen', 'Vi tittar först, så att ingen är i vägen.'],
    p22: 'Tryck på bollen så sparkar Teddy!',
    p23: ['vuxen', 'Bra! På gräset kan vi sparka. Där är det säkert.'],
    p24: 'Vi sparkar långt från vägen och tittar först så att ingen är i vägen. Och när en vuxen säger stopp, då stannar vi.',
  },
  gata: {
    x1: 'Teddy och {vuxen} är ute och går. Tryck på fotspåren!',
    x2: ['vuxen', 'Stopp! Här är kanten. Här stannar vi.'],
    x3: ['vuxen', 'Ta min hand, Teddy. Tryck på handen!'],
    x4: 'Teddy håller {vuxen} i handen.',
    x5: ['vuxen', 'Nu tittar vi efter bilar. Vänster, höger, vänster.'],
    x6: 'Tryck på pilen. Titta åt vänster!',
    x7: 'Titta åt höger!',
    x8: 'Och vänster igen!',
    x_v: 'Vänster', x_h: 'Höger',
    x_igen: 'Vi tittar en gång till.',
    x_tom: 'Ingen bil. Det är tomt!',
    x_bil: 'Där kommer en bil! Håll fingret på bilen tills den har kört förbi.',
    x_vantar: ['teddy', 'Vi väntar, vi väntar …'],
    x_forbi: 'Bilen har kört förbi.',
    x9: ['vuxen', 'Nu är det tomt åt alla håll. Nu går vi över tillsammans!'],
    x10: 'Tryck på fotspåren!',
    x11: 'Hurra! Teddy och {vuxen} gick över gatan tillsammans.',
    x12: 'Vid kanten stannar vi. Vi håller en vuxen i handen och tittar vänster, höger, vänster.',
  },
  arg: {
    a1: 'Teddy leker med sin röda bil. Brum, brum!',
    a2: 'Där kommer Lilla Kanin.',
    a3: 'Oj! Lilla Kanin tog Teddys bil!',
    a4: 'Teddy blir jättearg! Grrr!',
    a5: 'Teddy är stor och stark, och Kanin är liten. När man är stor måste man vara snäll. Vi biter inte, det gör ont.',
    a6: 'Vad kan Teddy göra med sin ilska?',
    a_blasa: 'Blåsa ut ljus', a_stampa: 'Stampa', a_stopp: 'Säga stopp', a_krama: 'Krama kudden', a_vuxen: 'Hämta {vuxen}',
    b1: 'Blås ut ljusen! Andas in djupt, och blås. Tryck på ljusen.',
    b2: 'Skönt! Djupa andetag gör kroppen lugn.',
    st1: 'Stampa med fötterna! Tryck på fötterna. Stamp, stamp, stamp!',
    st2: 'Puh! Ilskan stampades ner i golvet.',
    sp1: 'Tryck på handen och säg: STOPP!',
    sp2: ['teddy', 'STOPP! Det är min bil!'],
    sp3: 'Bra! Man får säga stopp med ord.',
    kr1: 'Krama kudden hårt! Tryck på kudden.',
    kr2: 'Mmm, en stor kram. Det hjälper.',
    vx1: ['vuxen', 'Jag ser att du är arg, Teddy. Jag hjälper dig.'],
    vx2: ['vuxen', 'Kanin, Teddy lekte med bilen. Du får låna den sen.'],
    a7: 'Teddy är lite mindre arg nu. Vad mer kan Teddy göra?',
    a8: 'Nu är Teddy lugn igen.',
    a9: ['teddy', 'Kanin, jag lekte med bilen. Du får låna den sen.'],
    a10: 'Kanin ger tillbaka bilen. Sen får Kanin låna den.',
    a11: 'Bra jobbat, Teddy! Du blev arg, men du var snäll.',
  },
  gunga: {
    g1: 'Teddy och Lilla Mus är på lekplatsen.',
    g2: 'Båda vill gunga! Men det finns bara en gunga.',
    g3: 'Vad gör vi? Vi turas om! Först Teddy, sen Mus.',
    g4: 'Tryck på timglaset så börjar Teddys tur.',
    g5: 'Wiii! Teddy gungar högt.',
    g6: 'Teddys tur är slut. Nu är det Mus tur!',
    g7: 'Tryck på Mus så får Mus gunga.',
    g8: 'Teddy väntar. Att vänta är svårt. Vi räknar tillsammans! Tryck på siffrorna.',
    n1: 'Ett', n2: 'Två', n3: 'Tre', n4: 'Fyra', n5: 'Fem',
    g9: 'Nu är Mus tur slut.',
    g10: ['mus', 'Tack, Teddy, för att du väntade!'],
    g11: 'Båda fick gunga. Att turas om är bra!',
  },
  forlat: {
    e1: 'Lilla Anka har byggt ett jättehögt torn. Vad fint!',
    e2: 'Teddy springer förbi. Tryck på Teddy!',
    e3: 'Oj! Teddy råkade välta tornet. Anka blir ledsen.',
    e4: 'Teddy är stor, och då måste man vara försiktig. Det var inte meningen, men Anka är ledsen. Vad kan Teddy göra?',
    e_forlat: 'Säga förlåt', e_trosta: 'Trösta', e_bygga: 'Bygga upp igen',
    e5: ['teddy', 'Förlåt, Anka. Det var inte meningen.'],
    e6: ['teddy', 'Är du ledsen? Vill du ha en kram?'],
    e7: 'Hjälp Teddy att bygga tornet igen. Tryck på klossarna!',
    e8: 'Anka blir lite gladare. Vad mer kan Teddy göra?',
    e9: ['anka', 'Tack, Teddy! Nu är jag glad igen.'],
    e10: 'Teddy sa förlåt, tröstade och hjälpte till. Så gör en bra kompis!',
  },
  gemensamt: {
    hej: ['teddy', 'Hej! Jag heter Teddy. Vad ska vi göra idag?'],
    slut: 'Bra jobbat! Du fick en stjärna.',
  },
};
const LINE = {};
for (const g of Object.values(LINES)) for (const [id, v] of Object.entries(g)) LINE[id] = Array.isArray(v) ? { who: v[0], t: v[1] } : { who: null, t: v };
const T = id => LINE[id].t.replaceAll('{vuxen}', S.vuxen);
const WHO = { teddy: 'Teddy', mus: 'Mus', anka: 'Anka', kanin: 'Kanin' };
const whoName = w => w === 'vuxen' ? S.vuxen : WHO[w] || 'Berättaren';

// ---------- Avbrytbara väntelägen ----------
class Abort extends Error {}
const pend = new Set();
function hold(ex) {
  return new Promise((res, rej) => {
    const p = { rej, clean: null, done: false };
    pend.add(p);
    const fin = v => { if (p.done) return; p.done = true; pend.delete(p); p.clean && p.clean(); res(v); };
    p.clean = ex(fin) || null;
    if (p.done && p.clean) p.clean();
  });
}
function abortAll() { for (const p of [...pend]) { p.done = true; p.clean && p.clean(); p.rej(new Abort()); } pend.clear(); }
const wait = ms => hold(d => { const t = setTimeout(d, ms); return () => clearTimeout(t); });

// ---------- Ljud ----------
let AC = null;
function ac() {
  if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); }
  if (AC.state === 'suspended') AC.resume();
  return AC;
}
function tone(f, t, dur, vol, type = 'sine') {
  const o = AC.createOscillator(), g = AC.createGain();
  o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + dur + 0.05);
}
const bell = (f, t, vol = .16, dur = 1) => { tone(f, t, dur, vol); tone(f * 2, t, dur * .5, vol * .22); tone(f * 3.01, t, dur * .25, vol * .07); };
function noise(t, dur, type, freq, vol) {
  const n = Math.ceil(AC.sampleRate * dur), buf = AC.createBuffer(1, n, AC.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  const s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
  s.buffer = buf; f.type = type; f.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + dur * .25); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f); f.connect(g); g.connect(AC.destination); s.start(t);
}
function drum(f, t, vol = .5) {
  const o = AC.createOscillator(), g = AC.createGain();
  o.frequency.setValueAtTime(f * 2, t); o.frequency.exponentialRampToValueAtTime(f / 2, t + .25);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + .3);
  o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + .35);
}
function engine(t, dur) {
  const o = AC.createOscillator(), f = AC.createBiquadFilter(), g = AC.createGain();
  o.type = 'sawtooth'; f.type = 'lowpass'; f.frequency.value = 380;
  o.frequency.setValueAtTime(55, t); o.frequency.linearRampToValueAtTime(95, t + dur * .5); o.frequency.linearRampToValueAtTime(65, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(.22, t + dur * .45); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f); f.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + dur + .05);
}
function sfx(k) {
  if (!S.sound) return; const a = ac(); if (!a) return; const t = a.currentTime + .02;
  if (k === 'pop') { tone(880, t, .12, .12, 'triangle'); tone(1320, t + .05, .1, .06, 'triangle'); }
  else if (k === 'chime') [523, 659, 784, 1047].forEach((f, i) => bell(f, t + i * .13));
  else if (k === 'ok') [659, 988].forEach((f, i) => bell(f, t + i * .12, .14, .8));
  else if (k === 'thump') drum(70, t);
  else if (k === 'whoosh') noise(t, .7, 'bandpass', 800, .35);
  else if (k === 'splash') noise(t, .3, 'highpass', 1800, .22);
  else if (k === 'brum') engine(t, 2.5);
  else if (k === 'brumKort') engine(t, 1);
  else if (k === 'pys') noise(t, 1.1, 'highpass', 2500, .12);
  else if (k === 'pump') { noise(t, .22, 'bandpass', 1400, .3); tone(300, t, .15, .05, 'triangle'); }
  else if (k === 'crash') [0, .1, .22, .3].forEach(d => drum(110 + Math.random() * 80, t + d, .35));
}

// ---------- Tal: egen inspelning om den finns, annars datorröst ----------
const REC = new Map();
let lastLine = null, svVoice = null;
function pickVoice() { if (!('speechSynthesis' in window)) return; const vs = speechSynthesis.getVoices(); svVoice = vs.find(v => /^sv[-_]SE/i.test(v.lang)) || vs.find(v => /^sv/i.test(v.lang)) || null; }
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function voice(text, blob) {
  return hold(done => {
    let to = 0;
    if (blob) {
      const url = URL.createObjectURL(blob), a = new Audio(url);
      a.onended = () => setTimeout(done, 200); a.onerror = done; a.play().catch(done); to = setTimeout(done, 30000);
      return () => { clearTimeout(to); a.pause(); URL.revokeObjectURL(url); };
    }
    if (!S.voice || !('speechSynthesis' in window)) { to = setTimeout(done, 900 + text.length * 55); return () => clearTimeout(to); }
    let ended = false;
    try { speechSynthesis.cancel(); } catch (e) {}
    const u = new SpeechSynthesisUtterance(text); u.lang = 'sv-SE'; u.rate = S.rate; u.pitch = 1.1;
    if (svVoice) u.voice = svVoice;
    u.onend = u.onerror = () => { if (!ended) { ended = true; setTimeout(done, 250); } };
    to = setTimeout(done, 3000 + text.length * 100 / S.rate);
    speechSynthesis.speak(u);
    return () => { clearTimeout(to); if (!ended) { ended = true; try { speechSynthesis.cancel(); } catch (e) {} } };
  });
}
async function say(id) {
  const L = LINE[id], text = T(id); lastLine = id; $('#sub').textContent = text;
  const b = L.who && A[L.who] ? A[L.who].el.querySelector('.bob') : null;
  b && b.classList.add('talk');
  try { await voice(text, REC.get(id)); } finally { b && b.classList.remove('talk'); }
}

// ---------- Scenen ----------
let A = {};
const L = n => $('#L-' + n);
const HIT = (r, y = -r) => `<circle cx="0" cy="${y}" r="${r}" fill="#fff" opacity="0"/>`;
function stage(bg) {
  ['bg', 'props', 'actors', 'mini', 'fx'].forEach(n => { L(n).innerHTML = ''; });
  L('bg').innerHTML = bg; A = {};
  $('#board').classList.add('hide'); $('#choices').classList.remove('show'); $('#choices').innerHTML = ''; $('#sub').textContent = '';
}
function put(name, html, x, y, s = 1, layer = 'props') {
  const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'o');
  g.innerHTML = `<g class="bob"><g class="in">${html}</g></g>`;
  L(layer).appendChild(g);
  A[name] = { el: g, x, y, s, r: 0, f: 1 }; setT(name, {}, 0); return A[name];
}
function setT(name, o = {}, ms = 0) {
  const a = A[name]; Object.assign(a, o);
  a.el.style.transition = ms ? `transform ${ms}ms ease-in-out, opacity .5s` : 'opacity .5s';
  a.el.style.transform = `translate(${a.x}px, ${a.y}px) rotate(${a.r}deg) scale(${a.s * a.f}, ${a.s})`;
}
const move = (name, o, ms = 800) => { setT(name, o, ms); return wait(ms); };
function actor(name, kind, x, y, s = 1, m = 'glad') { const a = put(name, charG(kind, m), x, y, s, 'actors'); a.kind = kind; a.mood = m; return a; }
function mood(name, m, pose) { const a = A[name]; a.mood = m; a.el.querySelector('.in').innerHTML = charG(a.kind, m, pose); }
const redraw = (name, html) => { A[name].el.querySelector('.in').innerHTML = html; };
const fade = (name, v) => { A[name].el.style.opacity = v; };
function anim(name, cls, ms) {
  const b = A[name].el.querySelector('.bob'); b.classList.remove(cls); b.getBoundingClientRect(); b.classList.add(cls);
  if (ms) setTimeout(() => b.classList.remove(cls), ms);
}
const stopAnim = (name, cls) => A[name].el.querySelector('.bob').classList.remove(cls);
function shake() { const s = $('#stage'); s.classList.remove('shake'); void s.offsetWidth; s.classList.add('shake'); }
function remove(name) { A[name].el.remove(); delete A[name]; }
function clearMini() { for (const n of Object.keys(A)) if (A[n].el.parentNode === L('mini')) remove(n); }
const FX = {
  heart: `<g transform="translate(-14 -14) scale(.28)"><path d="${HEART}" fill="#ec407a"/></g>`,
  star: star(0, 0, 13, '#ffca28'),
  drop: `<path d="M0 -12 Q8 0 0 6 Q-8 0 0 -12Z" fill="#64b5f6"/>`,
  puff: `<g fill="#eeeeee"><circle r="10"/><circle cx="12" cy="-4" r="8"/><circle cx="-12" cy="-3" r="7"/></g>`,
};
function fx(kind, x, y) {
  const g = document.createElementNS(NS, 'g'); g.setAttribute('transform', `translate(${x} ${y})`);
  g.innerHTML = `<g class="fx">${FX[kind]}</g>`; L('fx').appendChild(g); setTimeout(() => g.remove(), 1600);
}
const hearts = (x, y) => { [-18, 0, 18].forEach((d, i) => setTimeout(() => fx('heart', x + d, y - i * 6), i * 180)); };

function tap(names, hint = true) {
  names = [].concat(names);
  return hold(done => {
    const offs = names.map(n => {
      const el = A[n].el, inn = el.querySelector('.in');
      const h = e => { e.preventDefault(); e.stopPropagation(); ac(); sfx('pop'); done(n); };
      el.addEventListener('pointerdown', h); el.classList.add('tappable'); hint && inn.classList.add('hint');
      return () => { el.removeEventListener('pointerdown', h); el.classList.remove('tappable'); inn.classList.remove('hint'); };
    });
    return () => offs.forEach(f => f());
  });
}
async function choose(opts) {
  const box = $('#choices');
  const o = await hold(done => {
    box.innerHTML = opts.map((o, i) => `<button class="ch${o.done ? ' done' : ''}" data-i="${i}">${o.icon}<span>${esc(T(o.l))}</span></button>`).join('');
    box.onclick = e => { const b = e.target.closest('button'); if (!b) return; ac(); sfx('pop'); done(opts[+b.dataset.i]); };
    box.classList.add('show');
    return () => { box.onclick = null; box.classList.remove('show'); box.innerHTML = ''; };
  });
  await say(o.l);
  return o.k;
}
function count(n) {
  const box = $('#choices'); let c = 0;
  return hold(done => {
    box.innerHTML = Array.from({ length: n }, (_, i) => `<button class="ch num">${NUM(i + 1)}</button>`).join('');
    box.classList.add('show');
    box.onclick = e => {
      if (!e.target.closest('button') || c >= n) return;
      box.querySelectorAll('button')[c].classList.add('done'); c++; sfx('pop');
      const id = 'n' + c; $('#sub').textContent = T(id); voice(T(id), REC.get(id)).catch(() => {});
      if (c >= n) setTimeout(done, 1000);
    };
    return () => { box.onclick = null; box.classList.remove('show'); box.innerHTML = ''; };
  });
}
function board(a, b) { $('#board').classList.remove('hide'); $('#fs0 .art').innerHTML = a; $('#fs1 .art').innerHTML = b; $$('#board .fs').forEach(x => { x.className = 'fs'; x.style.removeProperty('--sc'); }); }
const boardSet = (i, cls) => $('#fs' + i).classList.add(cls);

// ---------- Berättelse 1: Först hem, sen leka ----------
async function storyForsthem() {
  stage(BG.forsthem());
  const py = x => 270 - 20 * (1 - ((x - 200) / 200) ** 2);
  const FP = [128, 162, 196, 244, 278, 312];
  put('sun', PROP.sol(), 250, 46, 1);
  FP.forEach((x, i) => put('fp' + i, PROP.fotspar() + HIT(20, -4), x, py(x) + 2));
  put('pol', PROP.pol(), 220, py(220) + 12); fade('pol', 0);
  put('boll', PROP.boll(), 300, 268, 1); fade('boll', 0);
  actor('vuxen', 'vuxen', 54, py(54) - 4, 1.05);
  actor('teddy', 'teddy', 96, py(96) + 4, .78);
  board(ICON.hus, ICON.lekaUte);
  await say('f1');
  await say('f2');
  const walk = async i => {
    const n = 'fp' + i; await tap(n); redraw(n, PROP.fotsparKlar());
    const x = FP[i]; anim('teddy', 'walk'); anim('vuxen', 'walk');
    move('vuxen', { x: x - 42, y: py(x - 42) - 4 }, 700); await move('teddy', { x, y: py(x) + 4 }, 700);
    stopAnim('teddy', 'walk'); stopAnim('vuxen', 'walk');
  };
  for (let i = 0; i < 3; i++) await walk(i);
  fade('pol', 1); mood('teddy', 'forvanad');
  await say('f3');
  let stays = 0;
  for (;;) {
    mood('teddy', 'glad');
    await say('f4');
    const k = await choose([{ k: 'ga', icon: ICON.ga, l: 'f_ga' }, { k: 'stanna', icon: ICON.plaska, l: 'f_plaska' }]);
    if (k === 'ga') break;
    stays++;
    await move('teddy', { x: 222, y: py(222) + 10 }, 500);
    for (let j = 0; j < 3; j++) { anim('teddy', 'hop', 450); sfx('splash'); fx('drop', 200, 262); fx('drop', 244, 260); await wait(520); }
    await move('teddy', { x: 196, y: py(196) + 4 }, 500);
    setT('sun', { y: 46 + stays * 42 }, 1500); $('#dusk').style.opacity = stays * .16; $('#fs1').style.setProperty('--sc', 1 - stays * .2);
    await say('f5');
    await say('f6');
    if (stays >= 3) { await say('f7'); break; }
  }
  mood('teddy', 'glad', 'upp'); await say('f8'); mood('teddy', 'glad');
  await say('f13');
  for (let i = 3; i < 6; i++) await walk(i);
  anim('teddy', 'walk'); move('vuxen', { x: 338, y: 210, s: .8 }, 1000); await move('teddy', { x: 356, y: 212, s: .6 }, 1000); stopAnim('teddy', 'walk');
  boardSet(0, 'done'); sfx('ok');
  await say('f9');
  fade('boll', 1);
  move('vuxen', { x: 160, y: py(160) - 4, s: 1.05 }, 600); await move('teddy', { x: 340, y: 270, s: .78 }, 600);
  boardSet(1, 'glow');
  for (let j = 0; j < 2; j++) { anim('teddy', 'hop', 450); await move('boll', { x: 230, y: 262, r: -360 }, 700); await move('boll', { x: 300, y: 268, r: 0 }, 700); }
  await say(stays ? 'f11' : 'f10');
  mood('teddy', 'glad', 'upp'); hearts(150, 190);
  await say('f12');
}

// ---------- Berättelse 2: Stopp vid vägen ----------
async function storyStopp() {
  stage(BG.stopp());
  put('boll', '', 245, 284);
  put('bil', PROP.bil('#1e88e5'), -80, 186, .9);
  actor('vuxen', 'vuxen', 70, 286, 1.2);
  actor('teddy', 'teddy', 190, 280, .85);
  let plast = false, round = 0, friends = 0;
  const ball = p => redraw('boll', PROP.boll(p, plast) + HIT(22, -13));
  ball(1);
  const repair = async () => {
    mood('teddy', 'ledsen2');
    move('teddy', { x: 150, y: 282 }, 600); await move('vuxen', { x: 60, y: 288 }, 600);
    put('plaster', PROP.plaster(1.3) + HIT(30, 0), 330, 262);
    await say('p8'); await tap('plaster');
    await move('plaster', { x: 250, y: 272, s: .6 }, 600); remove('plaster');
    plast = true; ball(0); sfx('ok');
    put('pump', PROP.pump() + HIT(44, -50), 210, 290);
    await say('p9');
    for (let i = 1; i <= 5; i++) {
      await tap('pump'); anim('pump', 'squish', 400); sfx('pump'); ball(i / 5); anim('boll', 'hop', 300);
      const id = 'n' + i; $('#sub').textContent = T(id); voice(T(id), REC.get(id)).catch(() => {});
    }
    await wait(700); remove('pump');
    sfx('chime'); mood('teddy', 'glad', 'upp'); hearts(250, 230);
    await say('p10'); mood('teddy', 'glad');
  };
  const grass = async () => {
    for (;;) {
      await say('p11');
      const fk = friends % 2 ? 'anka' : 'mus', comes = Math.random() < (friends ? .5 : .7);
      if (comes) {
        friends++; actor('kompis', fk, 440, 268, .55);
        anim('kompis', 'walk'); await move('kompis', { x: 312 }, 1600); stopAnim('kompis', 'walk');
        await say(fk === 'mus' ? 'p12m' : 'p12a');
      } else await say('p13');
      await say('s4');
      const k = await choose([{ k: 'vanta', icon: ICON.timglas, l: 'p_vanta' }, { k: 'sparka', icon: ICON.boll, l: 'p_sparka' }]);
      if (k === 'vanta') {
        if (comes) {
          await say('p15');
          anim('kompis', 'walk'); await move('kompis', { x: 440, y: 244, s: .45 }, 1800); remove('kompis');
          await say('p16');
        } else await say('p21');
        break;
      }
      if (!comes) break;
      anim('teddy', 'hop', 450);
      await move('boll', { x: 296, y: 262, r: 360 }, 600);
      sfx('thump'); anim('kompis', 'squish', 400); mood('kompis', 'ledsen');
      await move('boll', { x: 258, y: 282, r: 0 }, 500);
      mood('teddy', 'forvanad');
      await say(fk === 'mus' ? 'p17m' : 'p17a');
      mood('teddy', 'ledsen2'); await say('p18');
      mood('kompis', 'glad'); mood('teddy', 'glad'); hearts(312, 200);
      await say(fk === 'mus' ? 'p19m' : 'p19a');
      await say('p20');
      anim('kompis', 'walk'); await move('kompis', { x: 440, y: 244, s: .45 }, 1600); remove('kompis');
      await move('boll', { x: 245, y: 284 }, 400);
    }
    await say('p22'); await tap('boll');
    anim('teddy', 'hop', 450);
    await move('boll', { x: 340, y: 274, r: 720 }, 1100); setT('boll', { r: 0 }, 0); anim('boll', 'hop', 450);
    sfx('brum');
    await Promise.all([move('bil', { x: 500 }, 2600), say('p23')]);
    setT('bil', { x: -80 }, 0);
    mood('teddy', 'glad', 'upp'); hearts(190, 190); sfx('ok');
    await say('p24');
  };
  for (;;) {
    setT('teddy', { x: 190, y: 280 }, 0); setT('vuxen', { x: 70, y: 286 }, 0); setT('boll', { x: 245, y: 284, r: 0 }, 0);
    mood('teddy', 'glad'); mood('vuxen', 'glad');
    await say(round++ ? 'p1b' : 'p1');
    const dir = await choose([{ k: 'gras', icon: ICON.gras, l: 'p_gras' }, { k: 'vag', icon: ICON.vag, l: 'p_vag' }]);
    if (dir === 'gras') { await grass(); return; }
    anim('teddy', 'hop', 450);
    await move('boll', { x: 310, y: 182, r: 720 }, 1300); setT('boll', { r: 0 }, 0);
    mood('teddy', 'forvanad');
    await say('p2');
    mood('vuxen', 'forvanad', 'upp');
    await say('s3');
    mood('vuxen', 'glad');
    await say('s4');
    const k = await choose([{ k: 'still', icon: ICON.hand, l: 's_still' }, { k: 'spring', icon: ICON.boll, l: 's_spring' }]);
    if (k === 'spring') {
      anim('vuxen', 'walk'); move('teddy', { x: 262, y: 246 }, 800); await move('vuxen', { x: 226, y: 254 }, 800); stopAnim('vuxen', 'walk');
      mood('teddy', 'forvanad'); await say('s5');
    } else await say('s9');
    sfx('brum');
    setT('bil', { x: 500 }, 2600);
    await wait(1750);
    ball(0); sfx('pys'); anim('boll', 'squish', 400);
    await wait(850); setT('bil', { x: -80 }, 0);
    mood('teddy', 'ledsen');
    await say('p3');
    await say('p4');
    await say(k === 'spring' ? 's7' : 'p5');
    await say('p6');
    anim('vuxen', 'walk');
    await move('vuxen', { x: 296, y: 214, s: 1 }, 1100);
    move('boll', { x: 245, y: 284 }, 1100); move('teddy', { x: 190, y: 280 }, 1100);
    await move('vuxen', { x: 100, y: 286, s: 1.2 }, 1100);
    stopAnim('vuxen', 'walk');
    await say('p7');
    await repair();
  }
}

// ---------- Berättelse: Gå över gatan ----------
function holdDrive(name, x1, ms) {
  const a = A[name], x0 = a.x, el = a.el, inn = el.querySelector('.in');
  return hold(done => {
    let p = 0, on = false, raf = 0, last = 0, said = false;
    const step = now => {
      if (on) { p = Math.min(1, p + (now - last) / ms); setT(name, { x: x0 + (x1 - x0) * p }, 0); }
      last = now;
      if (p >= 1) return done();
      raf = requestAnimationFrame(step);
    };
    const down = e => {
      e.preventDefault(); ac(); on = true; inn.classList.remove('hint'); sfx('brumKort');
      if (!said) { said = true; $('#sub').textContent = T('x_vantar'); voice(T('x_vantar'), REC.get('x_vantar')).catch(() => {}); }
    };
    const up = () => { on = false; if (p < 1) inn.classList.add('hint'); };
    const cm = e => e.preventDefault();
    el.addEventListener('pointerdown', down); el.addEventListener('contextmenu', cm);
    addEventListener('pointerup', up); addEventListener('pointercancel', up);
    el.classList.add('tappable'); inn.classList.add('hint');
    raf = requestAnimationFrame(t => { last = t; step(t); });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', down); el.removeEventListener('contextmenu', cm);
      removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
      el.classList.remove('tappable'); inn.classList.remove('hint');
    };
  });
}
async function storyGata() {
  stage(BG.gata());
  const FP = [110, 152, 194], CW = [[214, 204], [214, 170], [214, 138]];
  FP.forEach((x, i) => put('fp' + i, PROP.fotspar() + HIT(20, -4), x, 270));
  CW.forEach(([x, y], i) => { put('cw' + i, PROP.fotspar() + HIT(20, -4), x, y); fade('cw' + i, 0); });
  actor('vuxen', 'vuxen', 24, 276, 1);
  actor('teddy', 'teddy', 66, 280, .72);
  const CARHIT = '<rect x="-56" y="-82" width="112" height="86" fill="#fff" opacity="0"/>';
  const COLS = ['#e53935', '#1e88e5', '#43a047', '#fb8c00', '#8e24aa'];
  const walkTo = async (t, v) => {
    anim('teddy', 'walk'); anim('vuxen', 'walk');
    move('vuxen', v, 700); await move('teddy', t, 700);
    stopAnim('teddy', 'walk'); stopAnim('vuxen', 'walk');
  };
  await say('x1');
  for (let i = 0; i < 3; i++) {
    await tap('fp' + i); redraw('fp' + i, PROP.fotsparKlar());
    await walkTo({ x: FP[i] - (i === 2 ? 6 : 0), y: 276 - i * 6 }, { x: FP[i] - 46, y: 276 - i * 5 });
  }
  const face = pose => { mood('teddy', 'glad', pose); mood('vuxen', 'glad', pose); };
  face('bak'); await wait(300);
  await say('x2');
  await say('x3');
  put('hand', `<g transform="scale(.42)">${PROP.hand()}</g>` + HIT(26, -22), 170, 206, 1, 'mini');
  await tap('hand'); remove('hand');
  await move('teddy', { x: 182 }, 300);
  sfx('ok'); hearts(166, 160);
  await say('x4');
  await say('x5');
  const SEQ = ['v', 'h', 'v'], PROMPT = ['x6', 'x7', 'x8'];
  let cars = 0;
  for (let i = 0; i < 3; i++) {
    const d = SEQ[i];
    for (let again = 0; ; again++) {
      await say(again ? 'x_igen' : PROMPT[i]);
      await choose([{ k: d, icon: d === 'v' ? ICON.pilV : ICON.pilH, l: d === 'v' ? 'x_v' : 'x_h' }]);
      put('dim', `<rect x="${d === 'v' ? 200 : 0}" y="0" width="200" height="300" fill="#263238" opacity=".3" pointer-events="none"/>`, 0, 0, 1, 'mini');
      face(d === 'v' ? 'bakV' : 'bakH');
      const car = !again && cars < 2 && (Math.random() < .45 || (i === 2 && !cars));
      if (car) {
        cars++;
        const c = COLS[Math.floor(Math.random() * COLS.length)];
        if (d === 'v') { put('car', PROP.bil(c) + CARHIT, -70, 212, .85); sfx('brumKort'); await move('car', { x: 42 }, 900); }
        else { put('car', PROP.bil(c) + CARHIT, 470, 168, .72); setT('car', { f: -1 }); sfx('brumKort'); await move('car', { x: 358 }, 900); }
        await say('x_bil');
        await holdDrive('car', d === 'v' ? 490 : -90, 2200);
        remove('car');
        await say('x_forbi');
      } else await say('x_tom');
      remove('dim'); face('bak');
      if (!car) break;
    }
  }
  await say('x9');
  await say('x10');
  for (let i = 0; i < 3; i++) {
    fade('cw' + i, 1);
    await tap('cw' + i); redraw('cw' + i, PROP.fotsparKlar());
    const [x, y] = CW[i];
    await walkTo({ x, y: y + 2, s: .72 - (i + 1) * .06 }, { x: x - 44, y: y + 4, s: 1 - (i + 1) * .09 });
  }
  await walkTo({ x: 214, y: 118, s: .46 }, { x: 176, y: 120, s: .64 });
  face(); await wait(300);
  sfx('ok'); mood('teddy', 'glad', 'upp'); hearts(214, 50);
  await say('x11');
  mood('teddy', 'glad');
  await say('x12');
}

// ---------- Berättelse 3: Arg utan att bita ----------
const STRAT = [
  { k: 'blasa', icon: ICON.ljus, l: 'a_blasa' }, { k: 'stampa', icon: ICON.stampa, l: 'a_stampa' }, { k: 'stopp', icon: ICON.hand, l: 'a_stopp' },
  { k: 'krama', icon: ICON.kudde, l: 'a_krama' }, { k: 'vuxen', icon: ICON.vuxen, l: 'a_vuxen' },
];
function meter(v) {
  const el = A.meter.el, f = el.querySelector('.mfill');
  f.style.transform = `scaleY(${Math.max(.06, v / 100)})`; f.style.fill = v > 60 ? '#e53935' : v > 0 ? '#ffb300' : '#43a047';
  el.querySelector('.mface').innerHTML = `<g transform="translate(0 -168) scale(.42)">${headG('teddy', v > 60 ? 'arg' : v > 0 ? 'sur' : 'lugn')}</g>`;
}
const MINI = {
  async blasa(m) {
    put('panel', PROP.panel(320, 130), 200, 160, 1, 'mini');
    const c = [120, 200, 280].map((x, i) => (put('lj' + i, PROP.ljus() + HIT(26, -40), x, 150, 1.1, 'mini'), 'lj' + i));
    await say('b1');
    while (c.length) {
      const n = await tap(c); c.splice(c.indexOf(n), 1);
      mood('teddy', 'blasa'); sfx('whoosh'); redraw(n, PROP.ljusSlackt()); fx('puff', A[n].x, 60);
      await wait(800); mood('teddy', m);
    }
    await say('b2');
  },
  async stampa(m) {
    put('panel', PROP.panel(320, 130), 200, 160, 1, 'mini');
    put('fotter', PROP.fotter() + HIT(50, -30), 200, 150, 1, 'mini');
    await say('st1');
    for (let i = 0; i < 5; i++) {
      await tap('fotter'); anim('fotter', 'squish', 400); anim('teddy', 'stomp', 300); shake(); sfx('thump'); fx('puff', 140 + (i % 2 ? 16 : -16), 274);
    }
    await wait(400); await say('st2');
  },
  async stopp(m) {
    put('panel', PROP.panel(320, 130), 200, 160, 1, 'mini');
    put('hand', PROP.hand() + HIT(46, -50), 200, 152, 1.15, 'mini');
    await say('sp1');
    await tap('hand'); anim('hand', 'squish', 400);
    mood('teddy', m, 'upp'); await say('sp2');
    mood('kanin', 'forvanad'); await say('sp3'); mood('teddy', m);
  },
  async krama(m) {
    put('panel', PROP.panel(320, 130), 200, 160, 1, 'mini');
    put('kudde', PROP.kudde() + HIT(50, -34), 200, 148, 1.1, 'mini');
    await say('kr1');
    mood('teddy', m, 'kram');
    for (let i = 0; i < 3; i++) { await tap('kudde'); anim('kudde', 'squish', 400); anim('teddy', 'squish', 400); fx('heart', 200 + (i - 1) * 40, 80); }
    await say('kr2'); mood('teddy', m);
  },
  async vuxen() {
    if (!A.vuxen) { actor('vuxen', 'vuxen', -60, 280, 1.25); anim('vuxen', 'walk'); await move('vuxen', { x: 66 }, 1200); stopAnim('vuxen', 'walk'); }
    await say('vx1');
    if (!MINI.vxSaid) { MINI.vxSaid = true; await say('vx2'); mood('kanin', 'ledsen2'); }
  },
};
async function storyArg() {
  stage(BG.arg()); MINI.vxSaid = false;
  put('meter', PROP.matare(), 382, 262, .8); fade('meter', 0);
  put('lbil', PROP.leksaksbil(), 198, 276, 1.3);
  actor('teddy', 'teddy', 140, 276, 1);
  actor('kanin', 'kanin', 450, 278, .6);
  await say('a1'); anim('lbil', 'wiggle', 900); sfx('brumKort'); await wait(900);
  anim('kanin', 'walk'); await move('kanin', { x: 262 }, 1400); stopAnim('kanin', 'walk');
  await say('a2');
  await move('kanin', { x: 228 }, 500);
  move('lbil', { x: 292 }, 900); await move('kanin', { x: 322 }, 900);
  await say('a3');
  mood('teddy', 'arg'); anim('teddy', 'shake2', 500); fade('meter', 1); meter(100);
  await say('a4');
  await say('a5');
  await say('a6');
  let lvl = 100; const used = new Set();
  while (lvl > 0) {
    const k = await choose(STRAT.map(o => ({ ...o, done: used.has(o.k) })));
    used.add(k);
    await MINI[k](A.teddy.mood);
    clearMini();
    lvl -= 50; meter(lvl); mood('teddy', lvl > 0 ? 'sur' : 'lugn'); sfx('ok');
    if (lvl > 0) await say('a7');
  }
  await say('a8');
  await say('a9');
  mood('kanin', 'glad'); anim('kanin', 'walk'); move('lbil', { x: 198 }, 1000); await move('kanin', { x: 238 }, 1000); stopAnim('kanin', 'walk');
  await say('a10');
  mood('teddy', 'glad', 'upp'); hearts(140, 170);
  await say('a11');
}

// ---------- Berättelse 4: Turas om ----------
function sitOn(n) { const a = A[n]; $('#seat').appendChild(a.el); setT(n, { x: 200, y: 222 }, 0); }
function getOff(n, x) { const a = A[n]; L('actors').appendChild(a.el); setT(n, { x: 200, y: 284 }, 0); return move(n, { x }, 700); }
function sand(ms) {
  const top = A.timglas.el.querySelector('.sTop'), bot = A.timglas.el.querySelector('.sBot');
  [top, bot].forEach(e => { e.style.transition = 'none'; });
  top.style.transform = 'scaleY(1)'; bot.style.transform = 'scaleY(.05)'; top.getBoundingClientRect();
  [top, bot].forEach(e => { e.style.transition = `transform ${ms}ms linear`; });
  top.style.transform = 'scaleY(.02)'; bot.style.transform = 'scaleY(1)';
}
async function storyGunga() {
  stage(BG.gunga()); L('props').insertAdjacentHTML('beforeend', SWING);
  put('timglas', PROP.timglas() + HIT(40, -40), 350, 196, 1);
  actor('teddy', 'teddy', 80, 284, .85);
  actor('mus', 'mus', 320, 284, .58);
  await say('g1');
  mood('teddy', 'forvanad'); mood('mus', 'forvanad');
  await say('g2');
  mood('teddy', 'glad'); mood('mus', 'glad');
  board(headSvg('teddy'), headSvg('mus'));
  await say('g3');
  await say('g4');
  await tap('timglas');
  await move('teddy', { x: 200 }, 700); sitOn('teddy'); mood('teddy', 'glad', 'upp');
  let t0 = Date.now(); sand(7000); $('#swingG').classList.add('go');
  await say('g5');
  await wait(Math.max(0, 7000 - (Date.now() - t0)));
  $('#swingG').classList.remove('go'); boardSet(0, 'done'); sfx('ok'); mood('teddy', 'glad');
  await getOff('teddy', 110);
  await say('g6');
  await say('g7');
  await tap('mus');
  await move('mus', { x: 200 }, 700); sitOn('mus'); mood('mus', 'glad', 'upp'); mood('teddy', 'sur');
  t0 = Date.now(); sand(9000); $('#swingG').classList.add('go');
  await say('g8');
  await count(5);
  mood('teddy', 'glad');
  await wait(Math.max(0, 9000 - (Date.now() - t0)));
  $('#swingG').classList.remove('go'); boardSet(1, 'done'); sfx('ok'); mood('mus', 'glad');
  await getOff('mus', 290);
  await say('g9');
  await say('g10'); hearts(290, 200);
  mood('teddy', 'glad', 'upp'); mood('mus', 'glad', 'upp');
  await say('g11');
}

// ---------- Berättelse 5: Förlåt och trösta ----------
async function storyForlat() {
  stage(BG.forlat());
  const BL = [['#42a5f5', 'A'], ['#66bb6a', 'B'], ['#ef5350', 'C'], ['#ffca28', 'D']];
  const TY = [282, 252, 222, 192], FALL = [{ x: 196, y: 280, r: -80 }, { x: 236, y: 284, r: 15 }, { x: 290, y: 280, r: 95 }, { x: 322, y: 286, r: -20 }];
  BL.forEach(([c, l], i) => put('k' + i, PROP.kloss(c, l) + HIT(22, -15), 262, TY[i]));
  actor('anka', 'anka', 360, 284, .62);
  actor('teddy', 'teddy', 70, 284, 1);
  await say('e1');
  await say('e2');
  await tap('teddy');
  anim('teddy', 'walk'); await move('teddy', { x: 228 }, 600); stopAnim('teddy', 'walk');
  sfx('crash'); shake(); BL.forEach((_, i) => setT('k' + i, FALL[i], 500 + i * 90));
  mood('teddy', 'forvanad'); await wait(800);
  mood('anka', 'ledsen');
  await say('e3');
  await move('teddy', { x: 140 }, 600); mood('teddy', 'ledsen2');
  await say('e4');
  const left = [{ k: 'forlat', icon: ICON.forlat, l: 'e_forlat' }, { k: 'trosta', icon: ICON.trosta, l: 'e_trosta' }, { k: 'bygga', icon: ICON.bygga, l: 'e_bygga' }];
  let happy = 0;
  while (left.length) {
    const k = await choose(left);
    left.splice(left.findIndex(o => o.k === k), 1);
    if (k === 'forlat') { mood('teddy', 'ledsen2'); await say('e5'); }
    if (k === 'trosta') {
      mood('teddy', 'glad'); anim('teddy', 'walk'); await move('teddy', { x: 300 }, 900); stopAnim('teddy', 'walk');
      mood('teddy', 'glad', 'kram'); hearts(340, 200);
      await say('e6');
      mood('teddy', 'glad'); await move('teddy', { x: 140 }, 800);
    }
    if (k === 'bygga') {
      await say('e7');
      const rest = BL.map((_, i) => 'k' + i);
      for (let j = 0; rest.length; j++) {
        const n = await tap(rest); rest.splice(rest.indexOf(n), 1);
        await move(n, { x: 262, y: TY[j], r: 0 }, 500); sfx('thump');
      }
    }
    happy++; mood('anka', ['ledsen', 'ledsen2', 'glad', 'glad'][happy]); sfx('ok');
    if (left.length) await say('e8');
  }
  mood('anka', 'glad', 'upp'); anim('anka', 'hop', 450); mood('teddy', 'glad');
  await say('e9'); hearts(360, 200);
  await say('e10');
}

// ---------- Berättelser ----------
const STORIES = [
  { id: 'forsthem', title: 'Först hem, sen leka', run: storyForsthem, tip: 'Prata om: Vad gjorde Teddy först? Vad fick han göra sen? Säg "först … sen …" på riktigt, till exempel på vägen hem från förskolan.' },
  { id: 'stopp', title: 'Stopp vid vägen', run: storyStopp, tip: 'Prata om: Varför sparkar vi bollen långt från vägen? Varför tittar man först innan man sparkar? Lek stopp-leken: spring runt och frys när någon säger STOPP.' },
  { id: 'gata', title: 'Gå över gatan', run: storyGata, tip: 'Öva på riktigt vid en lugn gata: stanna vid kanten, håll handen och titta vänster, höger, vänster tillsammans. Säg högt vad ni ser.' },
  { id: 'arg', title: 'När Teddy blir arg', run: storyArg, tip: 'Öva tillsammans: blås ut fingerljus, stampa, säg STOPP, krama en kudde. Fråga: Vad vill du göra när du blir arg?' },
  { id: 'gunga', title: 'Turas om', run: storyGunga, tip: 'Öva att turas om med en leksak och ett timglas eller en timer. Räkna högt tillsammans medan ni väntar.' },
  { id: 'forlat', title: 'Förlåt och trösta', run: storyForlat, tip: 'Prata om: Hur kändes det för Anka? Vad kan man göra när någon blir ledsen?' },
];
let cur = null;
function show(id) { $$('.screen').forEach(s => s.classList.toggle('active', s.id === id)); $('#' + id).scrollTop = 0; }
async function play(st) {
  abortAll(); ac(); cur = st;
  $('#end').classList.remove('show');
  $('#pTitle').textContent = st.title; show('play');
  try {
    await st.run();
    S.stars[st.id] = (S.stars[st.id] || 0) + 1; save();
    sfx('chime'); confetti();
    await wait(900);
    $('#endStar').innerHTML = `<svg viewBox="0 0 100 100"><polygon points="${starPts(50, 54, 46, 20)}" fill="#ffd54f" stroke="#f9a825" stroke-width="4" stroke-linejoin="round"/></svg>`;
    $('#endTip').textContent = st.tip.replaceAll('{vuxen}', S.vuxen);
    $('#end').classList.add('show');
    await say('slut');
  } catch (e) { if (!(e instanceof Abort)) console.error(e); }
}
function goHome() { abortAll(); try { speechSynthesis.cancel(); } catch (e) {} $('#end').classList.remove('show'); renderHome(); show('home'); }
function renderHome() {
  $('#heroTeddy').innerHTML = charSvg('teddy', 'glad', 'upp');
  $('#cards').innerHTML = STORIES.map((s, i) => `<button class="scard" data-i="${i}">${CARD[s.id]()}<span>${esc(s.title)}</span>${S.stars[s.id] ? `<span class="stars">★ ${S.stars[s.id]}</span>` : ''}</button>`).join('');
}
$('#cards').onclick = e => { const b = e.target.closest('.scard'); if (b) play(STORIES[+b.dataset.i]); };
$('#heroTeddy').onclick = () => { ac(); const h = $('#heroTeddy'); h.classList.remove('wave'); void h.offsetWidth; h.classList.add('wave'); abortAll(); say('hej').catch(() => {}); };
$('#homeBtn').onclick = goHome;
$('#endHome').onclick = goHome;
$('#endAgain').onclick = () => play(cur);
$('#againBtn').onclick = () => { if (lastLine) voice(T(lastLine), REC.get(lastLine)).catch(() => {}); };

// ---------- Konfetti ----------
const cv = $('#confetti'), cx = cv.getContext('2d'); let parts = [], cOn = false;
function confetti() {
  cv.width = innerWidth; cv.height = innerHeight;
  const cols = ['#ef5350', '#ffca28', '#66bb6a', '#42a5f5', '#ab47bc', '#ff7043'];
  for (let i = 0; i < 120; i++) parts.push({ x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * .5, vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 3, r: Math.random() * 6.28, vr: (Math.random() - .5) * .3, c: cols[i % cols.length], s: 6 + Math.random() * 6 });
  if (!cOn) { cOn = true; requestAnimationFrame(tick); }
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.r += p.vr; cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.restore(); });
  parts = parts.filter(p => p.y < cv.height + 20);
  if (parts.length) requestAnimationFrame(tick); else { cOn = false; cx.clearRect(0, 0, cv.width, cv.height); }
}

// ---------- Inspelningar (IndexedDB) ----------
const DB = new Promise((res, rej) => {
  if (!window.indexedDB) return rej(new Error('ingen IndexedDB'));
  const r = indexedDB.open('teddy', 1);
  r.onupgradeneeded = () => r.result.createObjectStore('voice');
  r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
});
async function idb(mode, fn) {
  const db = await DB;
  return new Promise((res, rej) => { const tx = db.transaction('voice', mode), q = fn(tx.objectStore('voice')); tx.oncomplete = () => res(q && q.result); tx.onerror = () => rej(tx.error); });
}
async function loadRecs() {
  try {
    const db = await DB;
    await new Promise(res => {
      const c = db.transaction('voice').objectStore('voice').openCursor();
      c.onsuccess = () => { const k = c.result; if (k) { REC.set(k.key, k.value); k.continue(); } else res(); };
      c.onerror = res;
    });
  } catch (e) {}
}
let rec = null, recStream = null;
async function toggleRec(id) {
  if (rec) { const same = rec.id === id; rec.mr.stop(); if (same) return; await new Promise(r => setTimeout(r, 300)); }
  try {
    abortAll(); try { speechSynthesis.cancel(); } catch (e) {}
    recStream = recStream || await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  } catch (e) { alert('Kunde inte starta mikrofonen. Tillåt mikrofonen för den här sidan och försök igen.'); return; }
  const chunks = [], mr = new MediaRecorder(recStream);
  rec = { id, mr };
  mr.ondataavailable = e => e.data.size && chunks.push(e.data);
  mr.onstop = async () => {
    rec = null;
    const blob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' });
    if (blob.size > 0) { REC.set(id, blob); try { await idb('readwrite', s => s.put(blob, id)); } catch (e) {} }
    renderRecList();
  };
  mr.start(); renderRecList();
}
function stopMic() { if (rec) rec.mr.stop(); if (recStream) { recStream.getTracks().forEach(t => t.stop()); recStream = null; } }
const GROUP_TITLE = { gemensamt: 'Start och slut' };
function renderRecList() {
  const total = Object.keys(LINE).length;
  $('#recCount').textContent = `${[...REC.keys()].filter(k => LINE[k]).length} av ${total} repliker inspelade.`;
  $('#recList').innerHTML = Object.entries(LINES).map(([g, lines]) => `<div class="rgroup"><h4>${esc(GROUP_TITLE[g] || STORIES.find(s => s.id === g).title)}</h4>` +
    Object.keys(lines).map(id => { const has = REC.has(id), on = rec && rec.id === id;
      return `<div class="rrow${has ? ' has' : ''}" data-id="${id}"><button class="rb play" aria-label="Lyssna">▶</button><button class="rb rec${on ? ' on' : ''}" aria-label="Spela in">${on ? '⏹' : '⏺'}</button><span class="rt"><span class="who">${esc(whoName(LINE[id].who))}:</span> ${esc(T(id))}</span>${has ? '<button class="rb del" aria-label="Ta bort">🗑</button>' : ''}</div>`; }).join('') + '</div>').join('');
}
$('#recList').onclick = async e => {
  const b = e.target.closest('.rb'); if (!b) return; const id = b.closest('.rrow').dataset.id;
  if (b.classList.contains('play')) { if (rec) return; abortAll(); voice(T(id), REC.get(id)).catch(() => {}); }
  else if (b.classList.contains('rec')) toggleRec(id);
  else if (b.classList.contains('del') && confirm('Ta bort inspelningen? Då används datorrösten igen.')) { REC.delete(id); try { await idb('readwrite', s => s.delete(id)); } catch (e) {} renderRecList(); }
};

// ---------- Inställningar ----------
function holdable(el, ms, onDone) {
  let raf = 0, t0 = 0;
  const f = document.createElement('i'); f.className = 'fill'; el.appendChild(f);
  const cancel = () => { cancelAnimationFrame(raf); raf = 0; el.style.setProperty('--p', 0); };
  el.addEventListener('pointerdown', () => {
    t0 = performance.now(); cancelAnimationFrame(raf);
    const step = now => { const p = Math.min(1, (now - t0) / ms); el.style.setProperty('--p', p); if (p >= 1) { cancel(); onDone(); } else raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => el.addEventListener(ev, cancel));
  el.addEventListener('contextmenu', e => e.preventDefault());
}
function openSettings() {
  abortAll();
  $('#sVuxen').value = S.vuxen; $('#sVoice').checked = S.voice; $('#sSound').checked = S.sound; $('#sRate').value = S.rate;
  renderRecList(); show('settings');
}
holdable($('#gearBtn'), 1000, openSettings);
$('#sVuxen').oninput = e => { S.vuxen = e.target.value.trim() || 'Mamma'; save(); renderRecList(); };
$('#sVoice').onchange = e => { S.voice = e.target.checked; save(); };
$('#sSound').onchange = e => { S.sound = e.target.checked; save(); };
$('#sRate').onchange = e => { S.rate = +e.target.value; save(); voice('Hej! Så här snabbt pratar jag.').catch(() => {}); };
$('#resetStars').onclick = () => { if (confirm('Nollställa alla stjärnor?')) { S.stars = {}; save(); } };
$('#setBack').onclick = () => { stopMic(); goHome(); };

let wakeLock = null;
async function keepAwake() { try { if (navigator.wakeLock && !wakeLock) { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => { wakeLock = null; }); } } catch (e) {} }
document.addEventListener('pointerdown', keepAwake);
document.addEventListener('visibilitychange', () => { if (document.hidden) { goHome(); stopMic(); } });

renderHome(); loadRecs();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
