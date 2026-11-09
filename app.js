/* Lee English – static site app. No server, no AI: browser speech + built-in lessons. */
const COMMON = { the: 'cái, này (mạo từ)', a: 'một', an: 'một', and: 'và', but: 'nhưng', or: 'hoặc', so: 'vì vậy', because: 'bởi vì', if: 'nếu', to: 'đến, để', of: 'của', in: 'trong, ở', on: 'trên, vào', at: 'tại', for: 'cho, trong', with: 'với', from: 'từ', by: 'bởi, trước', about: 'về', after: 'sau', before: 'trước', is: 'là', are: 'là', was: 'đã là', were: 'đã là', be: 'là', been: 'được, bị', have: 'có', has: 'có', had: 'đã có', do: 'làm', did: '(trợ động từ quá khứ)', will: 'sẽ', would: 'sẽ (lịch sự)', could: 'có thể', can: 'có thể', should: 'nên', i: 'tôi', you: 'bạn', he: 'anh ấy', she: 'cô ấy', it: 'nó', we: 'chúng tôi', they: 'họ', his: 'của anh ấy', her: 'của cô ấy', their: 'của họ', our: 'của chúng tôi', my: 'của tôi', your: 'của bạn', this: 'này', that: 'đó, rằng', what: 'cái gì', why: 'tại sao', how: 'như thế nào', when: 'khi', who: 'ai', which: 'cái nào, mà', not: 'không', no: 'không', yes: 'vâng', very: 'rất', also: 'cũng', then: 'sau đó', later: 'sau đó', every: 'mỗi', month: 'tháng', week: 'tuần', year: 'năm', years: 'năm', day: 'ngày', time: 'thời gian, lần', team: 'đội, nhóm', company: 'công ty', work: 'làm việc', works: 'làm việc', said: 'đã nói', asked: 'đã hỏi', told: 'đã kể', made: 'đã làm', new: 'mới', first: 'đầu tiên', next: 'tiếp theo', one: 'một', two: 'hai', three: 'ba', four: 'bốn', five: 'năm', six: 'sáu', money: 'tiền', meeting: 'cuộc họp', problem: 'vấn đề', plan: 'kế hoạch', help: 'giúp', like: 'thích, giống', want: 'muốn', wanted: 'đã muốn', need: 'cần', needs: 'cần', good: 'tốt', great: 'tuyệt', thank: 'cảm ơn', thanks: 'cảm ơn', please: 'làm ơn', hi: 'chào', all: 'tất cả', some: 'một vài', any: 'bất kỳ', much: 'nhiều', more: 'hơn', most: 'nhất', than: 'hơn', each: 'mỗi', still: 'vẫn', yet: 'chưa', now: 'bây giờ', early: 'sớm', late: 'muộn' };
const NUM = { '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten', '12': 'twelve', '15': 'fifteen', '20': 'twenty', '25': 'twenty-five', '40': 'forty' };
const LS = 'lee-english-v1';
let DB = { name: '', progress: {}, last: null };
try { const r = localStorage.getItem(LS); if (r) DB = Object.assign(DB, JSON.parse(r)); } catch (e) {}
const saveDB = () => { try { localStorage.setItem(LS, JSON.stringify(DB)); } catch (e) {} };
const blank = () => ({ step: 1, unlocked: 1, listen: { line: 0, cc: false, showT: false, a: {}, checked: false, q4: '', revealed: false, ticks: [] }, words: { seen: [], open: null }, grammar: { picks: {} }, speak: { i: 0, results: {}, hide: false }, finished: false });
let VIEW = 'home', L = null, S = null;
const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;

/* ---------- speech out ---------- */
let voice = null, playing = false; const ttsOk = 'speechSynthesis' in window;
const FEMALE = /(samantha|serena|kate|karen|moira|tessa|victoria|fiona|martha|susan|zira|hazel|libby|sonia|maisie|aria|jenny|emma|amy|joanna|salli|kimberly|ava|allison|female|woman)/i;
const MALE = /(daniel|alex\b|fred|oliver|arthur|george|ryan|guy|thomas|aaron|gordon|rishi|male|\bman\b)/i;
const enVoices = () => ttsOk ? speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)) : [];
function pickVoice() {
  if (!ttsOk) return; const vs = enVoices(); if (!vs.length) return;
  if (DB.voice) { const v = vs.find(x => x.name === DB.voice); if (v) { voice = v; return; } }
  const sc = v => (FEMALE.test(v.name) ? 6 : 0) - (MALE.test(v.name) ? 6 : 0) + (/en-GB/i.test(v.lang) ? 3 : /en-US/i.test(v.lang) ? 1 : 0) + (/google|natural|premium|enhanced/i.test(v.name) ? 1 : 0);
  voice = vs.slice().sort((a, b) => sc(b) - sc(a))[0];
}
if (ttsOk) { pickVoice(); speechSynthesis.onvoiceschanged = () => { pickVoice(); if (VIEW === 'home') render(); }; }
function speak(text, rate, onend) { if (!ttsOk) { onend && onend(); return; } try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); if (voice) u.voice = voice; u.lang = voice ? voice.lang : 'en-GB'; u.rate = rate || 0.95; u.onend = () => onend && onend(); speechSynthesis.speak(u); } catch (e) { onend && onend(); } }
function stopSpeech() { playing = false; if (ttsOk) try { speechSynthesis.cancel(); } catch (e) {} }
function playFrom(i) { playing = true; S.listen.line = i; save(); render(); speak(L.lines[i], 0.92, () => { if (!playing) return; if (i + 1 < L.lines.length) playFrom(i + 1); else { playing = false; render(); } }); }

/* ---------- helpers ---------- */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const keyOf = w => String(w).toLowerCase().replace(/[“”"().,!?:;]/g, '').replace(/’/g, "'");
const norm = s => String(s || '').trim().toLowerCase().replace(/[.,!?]/g, '');
const words = (text, focus) => String(text).split(' ').filter(Boolean).map(w => `<button class="w" data-a="word" data-w="${esc(w)}" ${focus && focus.includes(keyOf(w)) ? 'style="color:#44D62C;font-weight:700"' : ''}>${esc(w)}</button>`).join('');
const ico = {
  play: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 4.5v15l12-7.5z"/></svg>',
  pause: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
  spk: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
  lock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
  mic: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>'
};
const save = () => { if (L) { DB.progress[L.id] = S; DB.last = L.id; } saveDB(); };

/* ---------- progress ---------- */
const fillsOk = () => L.fills.map((f, i) => f.ans.map(norm).includes(norm(S.listen.a['q' + i])));
const listenDone = () => S.listen.checked && S.listen.revealed;
const wordsDone = () => S.words.seen.length >= L.words.length;
const grammarDone = () => L.grammar.qs.every((q, i) => S.grammar.picks[i] === q.a);
const speakDone = () => L.speak.every((t, i) => S.speak.results[i] && S.speak.results[i].passed);
function pctOf(les, st) {
  if (!st) return 0;
  const ans = les.fills.filter((f, i) => st.listen.a['q' + i]).length;
  const l = Math.min(1, (st.listen.checked ? 0.6 : ans * 0.15) + (st.listen.revealed ? 0.4 : 0));
  const w = st.words.seen.length / les.words.length;
  const g = les.grammar.qs.filter((q, i) => st.grammar.picks[i] === q.a).length / les.grammar.qs.length;
  const s = les.speak.filter((t, i) => st.speak.results[i] && st.speak.results[i].passed).length / les.speak.length;
  return Math.round((l + w + g + s) / 4 * 100);
}
const stepPcts = () => {
  const ans = L.fills.filter((f, i) => S.listen.a['q' + i]).length;
  return [Math.min(1, (S.listen.checked ? 0.6 : ans * 0.15) + (S.listen.revealed ? 0.4 : 0)), S.words.seen.length / L.words.length, L.grammar.qs.filter((q, i) => S.grammar.picks[i] === q.a).length / L.grammar.qs.length, L.speak.filter((t, i) => S.speak.results[i] && S.speak.results[i].passed).length / L.speak.length];
};
function refreshUnlock() { let u = 1; if (listenDone()) u = 2; if (u >= 2 && wordsDone()) u = 3; if (u >= 3 && grammarDone()) u = 4; if (u >= 4 && speakDone()) u = 5; S.unlocked = Math.max(S.unlocked, u); }

/* ---------- pronunciation check (no AI): align heard words with the target ---------- */
const toks = s => String(s).toLowerCase().replace(/[“”"().,!?:;]/g, ' ').replace(/’/g, "'").split(/\s+/).filter(Boolean).map(w => NUM[w] || w);
function compare(target, heard) {
  const T = String(target).split(' ').filter(Boolean), t = T.map(w => (toks(w)[0] || '').replace(/-/g, ''));
  const set = new Set(t), raw = toks(heard).map(w => w.replace(/-/g, '')), h = [];
  for (let k = 0; k < raw.length; k++) { if (k + 1 < raw.length && set.has(raw[k] + raw[k + 1]) && !set.has(raw[k])) { h.push(raw[k] + raw[k + 1]); k++; } else h.push(raw[k]); }
  const n = t.length, m = h.length, D = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) D[i][0] = i; for (let j = 0; j <= m; j++) D[0][j] = j;
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) D[i][j] = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + (t[i - 1] === h[j - 1] ? 0 : 1));
  const out = new Array(n); let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && D[i][j] === D[i - 1][j - 1] + (t[i - 1] === h[j - 1] ? 0 : 1)) { out[i - 1] = t[i - 1] === h[j - 1] ? { text: T[i - 1], flag: 'ok' } : { text: T[i - 1], flag: 'unclear', said: h[j - 1] }; i--; j--; }
    else if (i > 0 && D[i][j] === D[i - 1][j] + 1) { out[i - 1] = { text: T[i - 1], flag: 'missing' }; i--; }
    else j--;
  }
  const ok = out.filter(x => x.flag === 'ok').length;
  return { tokens: out, score: n ? Math.round(ok / n * 100) : 0 };
}

/* ---------- one topic per day ---------- */
const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
function order() {
  const by = {}; window.LESSONS.forEach(l => (by[l.field] = by[l.field] || []).push(l));
  const out = []; let more = true, k = 0;
  while (more) { more = false; FIELDS.forEach(f => { const l = (by[f] || [])[k]; if (l) { out.push(l); more = true; } }); k++; }
  return out;
}
const isDone = l => pctOf(l, DB.progress[l.id]) >= 100;
function ensureDaily() {
  const today = dayKey(), ord = order();
  if (DB.daily && DB.daily.date === today && ord.some(l => l.id === DB.daily.id)) return;
  let pick = null;
  const prev = DB.daily && ord.find(l => l.id === DB.daily.id);
  if (prev && !isDone(prev)) pick = prev;
  if (!pick && !DB.daily && DB.last) { const l = ord.find(x => x.id === DB.last); if (l && !isDone(l)) pick = l; }
  if (!pick) pick = ord.find(l => !isDone(l));
  if (!pick) { const i = prev ? ord.indexOf(prev) : -1; pick = ord[(i + 1) % ord.length]; }
  DB.daily = { date: today, id: pick.id }; saveDB();
}
function streak() {
  const set = new Set(DB.doneDates || []); let n = 0; const d = new Date();
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (set.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function tomorrowField() { const ord = order(); const cur = ord.findIndex(l => l.id === DB.daily.id); const nx = ord.slice(cur + 1).concat(ord.slice(0, cur)).find(l => !isDone(l) && l.id !== DB.daily.id); return nx ? nx.field : null; }

/* ---------- views ---------- */
const FIELDS = ['HR', 'BANKING', 'REAL ESTATE', 'ENERGY'];
const FIELD_VI = { HR: 'Nhân sự', BANKING: 'Ngân hàng', 'REAL ESTATE': 'Bất động sản', ENERGY: 'Năng lượng' };
function vHome() {
  if (!DB.name) return `<div style="padding-top:40px;display:flex;flex-direction:column;gap:16px"><span class="lee" style="width:72px;height:72px;border-radius:20px;font-size:38px">L</span><h1 style="font-size:30px">Learn English<br>with Lee</h1><div class="sub">Everyday workplace English for HR, banking, real estate and energy. Target: IELTS 6.0.</div><label class="q" for="nameIn">What should Lee call you?</label><input type="text" id="nameIn" placeholder="Your name" autocomplete="given-name"><button class="btn" data-a="setName">Start learning</button><div class="note">No account needed. Your progress is saved on this device.</div></div>`;
  ensureDaily();
  const T = window.LESSONS.find(x => x.id === DB.daily.id), p = pctOf(T, DB.progress[T.id]), done = p >= 100;
  const past = order().filter(l => l.id !== T.id && pctOf(l, DB.progress[l.id]) > 0);
  const vs = enVoices(), tf = done ? tomorrowField() : null;
  const dateTxt = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  return `<div class="row" style="justify-content:space-between;padding-top:8px"><div class="row"><span class="lee">L</span><div><div style="font-size:12px;color:var(--muted)">${esc(dateTxt)}</div><div class="h" style="font-size:18px;font-weight:700">Hi ${esc(DB.name)}!</div></div></div><div style="text-align:right"><div class="pct">${streak()}</div><div style="font-size:11px;color:var(--muted)">day streak</div></div></div>
  <div class="bubble"><span class="lee sm">L</span><div class="b" style="font-size:14px">${done ? `Great work today! Come back tomorrow for a new topic${tf ? ` – <b>${esc(FIELD_VI[tf] || tf)}</b>` : ''}.` : p > 0 ? 'Welcome back! Let’s finish today’s topic.' : `Today’s topic is about <b>${esc(FIELD_VI[T.field] || T.field)}</b>. Ready?`}</div></div>
  <div class="card" style="padding:0;overflow:hidden;gap:0;border-color:${done ? 'var(--green-d)' : 'var(--line)'}"><div style="height:150px;position:relative">${window.sceneFor ? window.sceneFor(T, 0) : ''}</div>
    <div style="padding:16px;display:flex;flex-direction:column;gap:10px"><div class="row" style="flex-wrap:wrap"><span class="chip g">TODAY · ${esc(T.field)}</span><span class="chip o">IELTS 6.0</span><span class="chip o">≈ 15 min</span></div><h1>${esc(T.title)}</h1><div class="sub">${esc(T.storyTitle)}</div>
    <div class="bar" style="height:6px"><span style="width:${p}%"></span></div><div style="font-size:12px;color:var(--muted)">${p}% done</div>
    <button class="btn" data-a="open" data-id="${T.id}">${done ? 'Review today’s lesson' : `${ico.play} ${p > 0 ? 'Resume' : 'Start today’s lesson'}`}</button></div></div>
  ${past.length ? `<div class="card" style="gap:8px"><div class="h" style="font-size:15px;font-weight:600">Review past topics</div>${past.map(l => { const q = pctOf(l, DB.progress[l.id]); return `<button data-a="open" data-id="${l.id}" style="display:flex;justify-content:space-between;gap:10px;align-items:center;background:none;border:0;border-top:1px solid var(--line);padding:10px 0 2px;color:var(--text);cursor:pointer;text-align:left;width:100%"><span style="min-width:0"><span style="display:block;font-size:14px;font-weight:600">${esc(l.title)}</span><span style="font-size:12px;color:var(--muted)">${esc(FIELD_VI[l.field] || l.field)}</span></span><span class="h" style="font-weight:700;color:${q >= 100 ? '#44D62C' : '#FFC24B'}">${q >= 100 ? '✓' : q + '%'}</span></button>`; }).join('')}</div>` : ''}
  <div class="card" style="gap:10px"><div class="h" style="font-size:15px;font-weight:600">Lee’s voice</div>
    ${vs.length ? `<select data-a="voice" aria-label="Lee's voice" style="height:44px;border-radius:10px;background:#0F0F0F;color:#F2F2F2;border:1px solid #3A3A3A;padding:0 10px;font-size:15px">${vs.map(v => `<option value="${esc(v.name)}" ${voice && voice.name === v.name ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})${FEMALE.test(v.name) ? ' · female' : ''}</option>`).join('')}</select>` : `<div class="sub">${ttsOk ? 'Loading voices…' : 'This browser cannot read aloud.'}</div>`}
    <button class="btn2" data-a="say" data-t="Hi, I'm Lee. Let's practise English together." style="align-self:flex-start">${ico.spk} Hear Lee</button></div>
  <div class="note">One new topic each day, rotating HR, banking, real estate and energy. Tap any English word to hear it. ${SR ? 'Speaking practice uses your microphone – allow it when asked.' : 'For speaking practice with the microphone, open this page in Safari (iPhone) or Chrome/Edge (computer).'} Progress is saved on this device only.</div>
  <button class="btn2" data-a="rename" style="align-self:flex-start">Change name</button>`;
}
const NAMES = ['Listen', 'Words', 'Grammar', 'Speak'];
function header() {
  const segs = NAMES.map((n, i) => { const st = i + 1, lock = st > S.unlocked, cur = S.step === st, p = stepPcts()[i]; return `<button class="seg ${cur ? 'cur' : lock ? 'lock' : p >= 1 ? 'done' : ''}" data-a="go" data-s="${st}" ${lock ? 'aria-disabled="true"' : ''}>${lock ? ico.lock : p >= 1 ? ico.check : ''}${n}</button>`; }).join('');
  return `<div class="top"><div class="toprow"><button class="btn2" data-a="home" aria-label="Back to Today" style="width:40px;height:40px;padding:0">${ico.back}</button><div style="flex-grow:1;min-width:0"><div style="font-size:12px;color:var(--muted)">${esc(L.field)} · IELTS 6.0</div><div class="h" style="font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(L.title)}</div></div><div style="text-align:right"><div class="pct">${pctOf(L, S)}%</div></div></div><div class="segs">${segs}</div></div>`;
}
const nextBtn = (ok, label, lockText) => ok ? `<button class="btn" data-a="next">${label}</button>` : `<button class="btn" disabled>${ico.lock} ${lockText}</button>`;
function vListen() {
  const Ls = S.listen, i = Ls.line, n = L.lines.length, ok = fillsOk(), nq = L.fills.length + 1;
  const fills = L.fills.map((f, k) => `<div><label class="q" for="q${k}"><b style="color:var(--green)">${k + 1}</b> ${esc(f.text)}</label><input type="text" id="q${k}" data-a="fill" data-q="q${k}" value="${esc(Ls.a['q' + k] || '')}" placeholder="One word or number" autocomplete="off" autocapitalize="off" class="${Ls.checked ? (ok[k] ? 'ok' : 'bad') : ''}" style="margin-top:6px">${Ls.checked ? `<div class="res ${ok[k] ? 'ok' : 'bad'}">${ok[k] ? 'Correct' : 'Answer: ' + esc(f.ans[0])}</div>` : ''}</div>`).join('');
  const tl = L.lines.map((t, k) => {
    const fi = L.fills.findIndex(x => x.line === k), f = L.fills[fi], ev = L.evidence.includes(k);
    let body = esc(t);
    if (f) body = body.replace(new RegExp('(^|[^A-Za-z])(' + f.word + ')(?![A-Za-z])', 'i'), (m, a, w) => `${a}<span class="hlA">${w}</span>`);
    if (ev) body = `<span class="hlE">${body}</span>`;
    const tags = (f ? `<span class="qtag" style="color:var(--green);border:1px solid var(--green-d)">Q${fi + 1}</span>` : '') + (ev ? `<span class="qtag" style="background:var(--amber);color:#0A0A0A">Q${nq}</span>` : '');
    return `<button class="tline ${ev ? 'ev' : ''} ${k === i ? 'cur' : ''}" data-a="seek" data-i="${k}"><span class="t">${k + 1}</span><span style="flex-grow:1">${body}</span><span style="display:flex;flex-direction:column;gap:4px">${tags}</span></button>`;
  }).join('');
  const keys = L.keys.map((k, j) => `<label style="display:flex;gap:10px;align-items:center;font-size:14px;cursor:pointer"><input type="checkbox" data-a="tick" data-j="${j}" ${Ls.ticks.includes(j) ? 'checked' : ''} style="width:20px;height:20px;accent-color:#44D62C">${esc(k)}</label>`).join('');
  return `<div><div class="kicker">STEP 1 · LISTEN &amp; ANSWER</div><h1>${esc(L.storyTitle)}</h1><div class="sub">IELTS 6.0 style · sentence completion + short answer</div></div>
  <div class="scene" role="img" aria-label="Picture for sentence ${i + 1}">${window.sceneFor ? window.sceneFor(L, i) : ''}${Ls.cc ? `<div class="sub-ov">${words(L.lines[i])}</div>` : ''}</div>
  <div class="player"><button class="play" data-a="toggle" aria-label="${playing ? 'Pause' : 'Play'}">${playing ? ico.pause : ico.play}</button><div style="flex-grow:1;display:flex;flex-direction:column;gap:5px"><div class="bar"><span style="width:${Math.round(((i + (playing ? 0.5 : 0)) / n) * 100)}%"></span></div><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted)"><span>Sentence ${i + 1} / ${n}</span><span>${ttsOk ? 'Lee reads aloud' : 'Audio not supported'}</span></div></div><button class="cc ${Ls.cc ? 'on' : ''}" data-a="cc" aria-pressed="${Ls.cc}">CC</button></div>
  <div class="card"><div><div class="h" style="font-size:16px;font-weight:600">Questions 1–${L.fills.length}</div><div class="sub">Write ONE WORD AND/OR A NUMBER for each answer.</div></div>${fills}<button class="btn2 g" data-a="check">Check answers</button>
    <div style="height:1px;background:var(--line)"></div>
    <div><div class="h" style="font-size:16px;font-weight:600">Question ${nq} · Explain</div><label class="q" for="q4"><b style="color:var(--amber)">${nq}</b> ${esc(L.explainQ)} Answer in 2 sentences.</label></div>
    <textarea id="q4" rows="3" data-a="q4" placeholder="Type or speak your answer…">${esc(Ls.q4)}</textarea>
    <div class="row">${SR ? `<button class="btn2" data-a="dictate">${ico.mic.replace(/26/g, '16')} Speak</button>` : ''}<button class="btn2 g" data-a="reveal" style="flex-grow:1">Compare with Lee's answer</button></div>
    ${Ls.revealed ? `<div class="lee-fb"><span class="lee sm">L</span><div style="display:flex;flex-direction:column;gap:8px"><div><b>Lee's answer:</b> ${esc(L.model)}</div><div class="sub" style="color:#C7C7C7">Did your answer include these? Tick what you had:</div>${keys}<button class="btn2" data-a="say" data-t="${esc(L.model)}" style="align-self:flex-start;height:34px;font-size:12px">${ico.spk} Hear it</button></div></div>` : ''}
  </div>
  <div class="row" style="justify-content:space-between"><span class="h" style="font-size:16px;font-weight:600">Transcript</span><button class="btn2" data-a="showT" aria-expanded="${Ls.showT}">${Ls.showT ? 'Hide transcript' : 'Show transcript'}</button></div>
  ${Ls.showT ? `<div class="legend"><span><i style="background:var(--green)"></i>Answers 1–${L.fills.length}</span><span><i style="background:var(--amber-bg);border:1px solid var(--amber)"></i>Evidence for ${nq}</span><span>Tap a line to replay it</span></div><div style="display:flex;flex-direction:column;gap:4px">${tl}</div>` : `<div class="card" style="border-style:dashed;align-items:center;text-align:center"><span class="sub">Hidden. Try the questions first.</span></div>`}
  ${nextBtn(listenDone(), 'Next: New words', `Check answers and compare question ${nq}`)}`;
}
function vWords() {
  const cards = L.words.map((w, k) => { const open = S.words.open === k, seen = S.words.seen.includes(k); return `<div class="wordcard ${open ? 'open' : ''}"><div class="wc-head"><button class="icon-btn" data-a="say" data-t="${esc(w.en)}" aria-label="Hear ${esc(w.en)}">${ico.spk}</button><div style="flex-grow:1;min-width:0"><button data-a="word" data-w="${esc(w.en)}" class="h" style="background:none;border:0;padding:0;font-size:18px;font-weight:700;color:var(--text);cursor:pointer;text-align:left;text-decoration:underline dotted #5A5A5A;text-underline-offset:5px">${esc(w.en)}</button><div style="font-size:13px;color:var(--muted)">${esc(w.ipa)}</div></div>${seen ? `<span class="chip g" aria-label="Reviewed">${ico.check}</span>` : ''}<button class="btn2" data-a="wopen" data-k="${k}" aria-expanded="${open}" aria-label="${open ? 'Close' : 'Open'} ${esc(w.en)}" style="width:44px;padding:0">${open ? '−' : '+'}</button></div>${open ? `<div style="border-top:1px solid var(--line);margin-top:10px;padding-top:10px;display:flex;flex-direction:column;gap:8px"><div style="font-size:14px;color:#C7C7C7">${esc(w.def)}</div><div style="background:#0F0F0F;border-radius:8px;padding:6px;display:flex;flex-wrap:wrap;font-size:15px">${words(w.ex)}</div><button class="btn2" data-a="say" data-t="${esc(w.ex)}" style="align-self:flex-start">${ico.spk} Hear the sentence</button></div>` : ''}</div>`; }).join('');
  return `<div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="kicker">STEP 2 · NEW WORDS</div><h1>${L.words.length} words from the story</h1></div><span class="pct">${S.words.seen.length}/${L.words.length}</span></div><div class="note">Tap a word for Vietnamese. Open every card to continue.</div>${cards}${nextBtn(wordsDone(), 'Next: Grammar', `Open every card · ${S.words.seen.length}/${L.words.length}`)}`;
}
function vGrammar() {
  const G = L.grammar, focus = G.focus.map(keyOf);
  const qs = G.qs.map((q, i) => { const p = S.grammar.picks[i]; const opts = q.opts.map((o, j) => { let c = ''; if (p !== undefined) { if (p === q.a && j === q.a) c = 'ok'; else if (j === p) c = 'bad'; } return `<button class="opt ${c}" data-a="gpick" data-i="${i}" data-j="${j}">${esc(o)}</button>`; }).join(''); return `<div class="card"><div style="font-size:15px;font-weight:600;line-height:1.45">${i + 1}. ${esc(q.q)}</div><div style="display:flex;flex-direction:column;gap:8px">${opts}</div>${p !== undefined ? `<div class="sub" style="color:${p === q.a ? '#9AF08B' : '#FFB3B3'}">${p === q.a ? 'Correct. ' + esc(q.why) : 'Not quite – try again.'}</div>` : ''}</div>`; }).join('');
  return `<div><div class="kicker">STEP 3 · GRAMMAR</div><h1>${esc(G.title)}</h1><div class="sub">${esc(G.why)}</div></div><div class="card" style="gap:6px">${G.examples.map(e => `<div style="display:flex;flex-wrap:wrap;font-size:15px">${words(e, focus)}</div>`).join('')}</div>${qs}${nextBtn(grammarDone(), 'Next: Speak with Lee', 'Get every answer right')}`;
}
let LISTEN = { on: false, rec: null, interim: '', err: '' };
function vSpeak() {
  const sp = S.speak, i = Math.min(sp.i, L.speak.length - 1), turn = L.speak[i], res = sp.results[i];
  const past = L.speak.slice(0, i).map((t, k) => { const r = sp.results[k]; return `<div class="theirs"><div class="b">${words(t.lee)}</div></div><div class="mine"><div class="corr">${(r && r.tokens ? r.tokens : t.target.split(' ').map(x => ({ text: x, flag: 'ok' }))).map((x, j) => `<button class="w ${x.flag !== 'ok' ? 'f-' + x.flag : ''}" data-a="${x.flag !== 'ok' ? 'flag' : 'word'}" data-t="${k}" data-k="${j}" data-w="${esc(x.text)}">${esc(x.text)}</button>`).join('')}</div>${r ? `<div class="tip">${r.score}%</div>` : ''}</div>`; }).join('');
  const cur = res && res.tokens ? res.tokens.map((x, j) => `<button class="w ${x.flag !== 'ok' ? 'f-' + x.flag : ''}" data-a="${x.flag !== 'ok' ? 'flag' : 'word'}" data-t="${i}" data-k="${j}" data-w="${esc(x.text)}">${esc(x.text)}</button>`).join('') : sp.hide ? '<span class="sub">Sentence hidden – use the Vietnamese hint.</span>' : words(turn.target);
  const allDone = speakDone();
  return `<div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="kicker">STEP 4 · SPEAK WITH LEE</div><h1>Role-play</h1></div><span class="pct">${L.speak.filter((t, k) => sp.results[k] && sp.results[k].passed).length}/${L.speak.length}</span></div>
  <div class="legend"><span><i style="background:var(--red-bg);border:1px solid #FF5A5A"></i>Heard differently – practise it</span><span><i style="background:var(--amber-bg);border:1px dashed var(--amber)"></i>Missing</span></div>
  <div class="msgs">${past}
  ${allDone ? '' : `<div class="theirs"><div class="row"><span class="chip ol">LEE · ${i + 1}/${L.speak.length}</span></div><div class="b">${words(turn.lee)}</div><button class="btn2" data-a="say" data-t="${esc(turn.lee)}" style="height:32px;font-size:12px;align-self:flex-start">${ico.spk} Hear Lee</button></div>
  <div class="card" style="gap:10px"><div class="row" style="justify-content:space-between"><span style="font-size:12px;font-weight:700;color:var(--muted);letter-spacing:.6px">YOUR ANSWER</span><button class="btn2" data-a="hideToggle" style="height:30px;font-size:12px">${sp.hide ? 'Show sentence' : 'Hide sentence (harder)'}</button></div>
    <div lang="vi" style="font-size:13px;color:#C7C7C7">Gợi ý: ${esc(turn.vi)}</div>
    <div class="corr" style="border-color:${res ? (res.passed ? 'var(--green)' : '#FF5A5A') : 'var(--line2)'}">${cur}</div>
    ${res ? `<div class="row" style="justify-content:space-between"><span class="said">Heard: “${esc(res.heard)}”</span><span class="h" style="font-weight:700;color:${res.passed ? '#44D62C' : '#FFC24B'}">${res.score}%</span></div>` : ''}
    ${LISTEN.on ? `<div class="note" style="color:#44D62C" role="status">Listening… ${esc(LISTEN.interim)}</div>` : ''}
    ${LISTEN.err ? `<div class="note" style="color:#FFB3B3">${esc(LISTEN.err)}</div>` : ''}
    <div class="row" style="justify-content:center;gap:14px">
      <button class="btn2" data-a="say" data-t="${esc(turn.target)}" aria-label="Hear the model answer">${ico.spk} Model</button>
      ${SR ? `<button class="play" data-a="mic" aria-label="${LISTEN.on ? 'Stop' : 'Speak your answer'}" style="width:72px;height:72px;${LISTEN.on ? 'background:#F2F2F2' : ''}">${ico.mic}</button>` : ''}
      ${res && (res.passed || res.tries >= 3) ? `<button class="btn2 g" data-a="nextTurn">${i + 1 < L.speak.length ? 'Next ▸' : 'Finish'}</button>` : ''}
    </div>
    ${!SR ? `<div class="row"><input type="text" id="typed" placeholder="Type your answer (no microphone in this browser)"><button class="btn2 g" data-a="typedGo">Check</button></div>` : ''}
    ${res && !res.passed && res.tries < 3 ? `<div class="note">Aim for 70% or more. Tap a red word to hear it, then try again (${3 - res.tries} tries left).</div>` : ''}
  </div>`}</div>
  ${allDone ? `<button class="btn" data-a="next">Finish lesson</button>` : ''}`;
}
function vDone() {
  const p = pctOf(L, S);
  return `<div class="done-ring"><svg width="96" height="96" viewBox="0 0 120 120" role="img" aria-label="${p} percent done"><circle cx="60" cy="60" r="50" fill="none" stroke="#2A2A2A" stroke-width="12"/><circle cx="60" cy="60" r="50" fill="none" stroke="#44D62C" stroke-width="12" stroke-linecap="round" stroke-dasharray="${p * 3.142} 314.2" transform="rotate(-90 60 60)"/></svg><div><div class="kicker">LESSON COMPLETE</div><h1>Well done, ${esc(DB.name)}!</h1></div></div>
  <div class="card"><div class="h" style="font-size:16px;font-weight:600">Words to keep</div><div class="row" style="flex-wrap:wrap">${L.words.map(w => `<button class="chip ol" data-a="word" data-w="${esc(w.en)}" style="background:none;cursor:pointer">${esc(w.en)}</button>`).join('')}</div></div>
  <div class="bubble"><span class="lee sm">L</span><div class="b" style="font-size:14px">That’s today’s topic done. See you tomorrow for a new one!</div></div>
  <button class="btn" data-a="home">Back to Today</button>`;
}
function render() {
  const app = document.getElementById('app');
  if (VIEW === 'home' || !L) { app.innerHTML = vHome(); return; }
  refreshUnlock();
  if (S.step === 5 && !S.finished) { S.finished = true; DB.doneDates = [...new Set((DB.doneDates || []).concat(dayKey()))].slice(-400); save(); }
  app.innerHTML = header() + [null, vListen, vWords, vGrammar, vSpeak, vDone][S.step]();
}

/* ---------- word sheet ---------- */
function openSheet(html) { document.getElementById('sheetIn').innerHTML = html; document.getElementById('sheet').classList.add('show'); document.getElementById('scrim').classList.add('show'); }
function closeSheet() { document.getElementById('sheet').classList.remove('show'); document.getElementById('scrim').classList.remove('show'); }
function showWord(raw, note) {
  const k = keyOf(raw); if (!k) return;
  const lw = L && L.words.find(w => w.en.toLowerCase() === k);
  let vi = (lw && lw.vi) || (L && L.dict[k]) || COMMON[k] || '';
  if (!vi && L) { for (const x of window.LESSONS) { if (x.dict[k]) { vi = x.dict[k]; break; } const w = x.words.find(y => y.en.toLowerCase() === k); if (w) { vi = w.vi; break; } } }
  openSheet(`<div class="row" style="justify-content:space-between;align-items:flex-start"><div><div class="h" style="font-size:24px;font-weight:700;color:var(--green)">${esc(k)}</div>${lw ? `<div style="font-size:14px;color:var(--muted)">${esc(lw.ipa)}</div>` : ''}</div><button class="btn2" data-a="close" aria-label="Close" style="width:40px;height:40px;padding:0;border-radius:50%">✕</button></div>${note ? `<div style="font-size:14px;line-height:1.5;color:#FFE2A3">${esc(note)}</div>` : ''}<div lang="vi" style="font-size:16px">${vi ? esc(vi) : '<span class="sub">(Chưa có nghĩa tiếng Việt cho từ này)</span>'}</div><div class="row"><button class="btn2 g" data-a="say" data-t="${esc(k)}">${ico.spk} Hear it</button><button class="btn2" data-a="sayslow" data-t="${esc(k)}">Slowly</button></div>`);
  speak(k, 0.8);
}

/* ---------- microphone ---------- */
function score(heard) {
  const sp = S.speak, i = sp.i, turn = L.speak[i];
  const r = compare(turn.target, heard), prev = sp.results[i];
  sp.results[i] = { tokens: r.tokens, score: r.score, heard, tries: (prev ? prev.tries : 0) + 1, passed: r.score >= 70 };
  save(); render();
}
function startMic() {
  if (!SR) return;
  if (LISTEN.on) { try { LISTEN.rec.stop(); } catch (e) {} return; }
  stopSpeech();
  const rec = new SR(); LISTEN = { on: true, rec, interim: '', err: '' };
  rec.lang = 'en-US'; rec.interimResults = true; rec.continuous = false;
  let fin = '';
  rec.onresult = ev => { let it = ''; fin = ''; for (let k = 0; k < ev.results.length; k++) { if (ev.results[k].isFinal) fin += ev.results[k][0].transcript; else it += ev.results[k][0].transcript; } LISTEN.interim = (fin + ' ' + it).trim(); const st = document.querySelector('[role=status]'); if (st) st.textContent = 'Listening… ' + LISTEN.interim; };
  rec.onerror = ev => { LISTEN.err = ev.error === 'not-allowed' || ev.error === 'service-not-allowed' ? 'The microphone is blocked. Allow it for this site in your browser settings (iPhone: also turn on Dictation in Settings › General › Keyboard).' : ev.error === 'no-speech' ? 'Lee did not hear anything. Tap the mic and speak a little louder.' : 'Speech recognition error: ' + ev.error; };
  rec.onend = () => { const heard = (fin || LISTEN.interim).trim(); LISTEN.on = false; LISTEN.interim = ''; if (heard) score(heard); else render(); };
  try { rec.start(); } catch (e) { LISTEN.on = false; LISTEN.err = 'Could not start the microphone.'; }
  render();
}
function dictate() {
  if (!SR) return; const ta = document.getElementById('q4'); if (!ta) return;
  const rec = new SR(); rec.lang = 'en-US'; rec.interimResults = true; const before = ta.value ? ta.value.trim() + ' ' : '';
  rec.onresult = ev => { let t = ''; for (let k = 0; k < ev.results.length; k++) t += ev.results[k][0].transcript; ta.value = before + t; S.listen.q4 = ta.value; save(); };
  rec.onerror = ev => { if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') ta.placeholder = 'Microphone blocked – allow it in browser settings.'; };
  try { rec.start(); ta.placeholder = 'Listening…'; } catch (e) {}
}

/* ---------- events ---------- */
function openLesson(id) { const les = window.LESSONS.find(x => x.id === id); if (!les) return; stopSpeech(); L = les; S = Object.assign(blank(), DB.progress[id] || {}); VIEW = 'lesson'; save(); render(); window.scrollTo(0, 0); }
document.addEventListener('click', e => {
  const el = e.target.closest('[data-a]'); if (!el) return; const a = el.dataset.a;
  if (a === 'setName') { const v = (document.getElementById('nameIn').value || '').trim(); if (!v) return; DB.name = v.slice(0, 30); saveDB(); render(); }
  else if (a === 'rename') { DB.name = ''; saveDB(); render(); }
  else if (a === 'open') openLesson(el.dataset.id);
  else if (a === 'home') { stopSpeech(); VIEW = 'home'; render(); window.scrollTo(0, 0); }
  else if (a === 'go') { const s = +el.dataset.s; if (s <= S.unlocked) { stopSpeech(); S.step = s; save(); render(); window.scrollTo(0, 0); } }
  else if (a === 'next') { stopSpeech(); S.step = Math.min(S.step + 1, 5); save(); render(); window.scrollTo(0, 0); }
  else if (a === 'toggle') { if (playing) { stopSpeech(); render(); } else playFrom(S.listen.line >= L.lines.length - 1 ? 0 : S.listen.line); }
  else if (a === 'seek') playFrom(+el.dataset.i);
  else if (a === 'cc') { S.listen.cc = !S.listen.cc; save(); render(); }
  else if (a === 'showT') { S.listen.showT = !S.listen.showT; save(); render(); }
  else if (a === 'check') { L.fills.forEach((f, i) => { const inp = document.getElementById('q' + i); if (inp) S.listen.a['q' + i] = inp.value; }); S.listen.checked = true; save(); render(); }
  else if (a === 'reveal') { const t = document.getElementById('q4'); S.listen.q4 = t ? t.value : ''; S.listen.revealed = true; save(); render(); }
  else if (a === 'dictate') dictate();
  else if (a === 'word') showWord(el.dataset.w);
  else if (a === 'flag') { const r = S.speak.results[+el.dataset.t]; const t = r && r.tokens[+el.dataset.k]; if (!t) return; showWord(t.text, t.flag === 'unclear' ? `Lee heard “${t.said}”. Listen and say it again.` : 'You missed this word.'); }
  else if (a === 'say') speak(el.dataset.t, 0.9);
  else if (a === 'sayslow') speak(el.dataset.t, 0.6);
  else if (a === 'close') closeSheet();
  else if (a === 'wopen') { const k = +el.dataset.k; S.words.open = S.words.open === k ? null : k; if (!S.words.seen.includes(k)) S.words.seen.push(k); save(); render(); }
  else if (a === 'gpick') { const i = +el.dataset.i; if (S.grammar.picks[i] === L.grammar.qs[i].a) return; S.grammar.picks[i] = +el.dataset.j; save(); render(); }
  else if (a === 'mic') startMic();
  else if (a === 'typedGo') { const v = (document.getElementById('typed').value || '').trim(); if (v) score(v); }
  else if (a === 'nextTurn') { S.speak.i = Math.min(S.speak.i + 1, L.speak.length - 1); LISTEN.err = ''; save(); render(); setTimeout(() => speak(L.speak[S.speak.i].lee, 0.95), 150); }
  else if (a === 'hideToggle') { S.speak.hide = !S.speak.hide; save(); render(); }
});
document.addEventListener('change', e => { const el = e.target; if (el.dataset && el.dataset.a === 'voice') { DB.voice = el.value; saveDB(); pickVoice(); speak("Hi, I'm Lee.", 0.95); return; } if (el.dataset && el.dataset.a === 'tick') { const j = +el.dataset.j; S.listen.ticks = el.checked ? [...new Set(S.listen.ticks.concat(j))] : S.listen.ticks.filter(x => x !== j); save(); } });
document.addEventListener('input', e => { const el = e.target; if (!el.dataset) return; if (el.dataset.a === 'fill') { S.listen.a[el.dataset.q] = el.value; S.listen.checked = false; save(); } if (el.dataset.a === 'q4') { S.listen.q4 = el.value; save(); } });
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'nameIn') document.querySelector('[data-a=setName]').click(); });
document.getElementById('scrim').addEventListener('click', closeSheet);
render();
