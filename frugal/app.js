/* 위스키 적금 PWA — 클라이언트 전용(localStorage), 백엔드 0 (CMPA-347) */
(() => {
  'use strict';
  const KEY = 'frugal_v1';
  const won = n => n.toLocaleString('ko-KR');

  // 절약 항목 시드 (plan §6) — itemRates 로 사용자가 단가 편집 가능
  const SEED_ITEMS = [
    { id: 'coffee',   emo: '☕', name: '드립커피',   rate: 4500 },
    { id: 'tumbler',  emo: '🥤', name: '텀블러',     rate: 1200 },
    { id: 'midnight', emo: '🌙', name: '야식 거름',   rate: 18000 },
    { id: 'homedrink',emo: '🍶', name: '홈술',       rate: 30000 },
    { id: 'lunchbox', emo: '🍱', name: '도시락',     rate: 8000 },
    { id: 'walk',     emo: '🚶', name: '도보·대중교통', rate: 9000 },
    { id: 'unsub',    emo: '✂️', name: '구독 해지',   rate: 13500 },
    { id: 'mvno',     emo: '📱', name: '알뜰폰(월)',  rate: 30000 },
    { id: 'mart',     emo: '🛒', name: '편의점→마트', rate: 3000 },
    { id: 'impulse',  emo: '🛑', name: '충동구매 참기', rate: 0, ask: true },
  ];

  // ---- 상태 ----
  let state = load();
  let floorData = null;     // whisky_floor.json
  let lastAction = null;    // 1탭 되돌리기용

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY)) || {};
      return { savings: s.savings || [], goal: s.goal || null, itemRates: s.itemRates || {} };
    } catch { return { savings: [], goal: null, itemRates: {} }; }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
  const rateOf = it => (state.itemRates[it.id] != null ? state.itemRates[it.id] : it.rate);
  const total = () => state.savings.reduce((a, s) => a + s.amount, 0);

  // ---- DOM ----
  const $ = id => document.getElementById(id);
  const grid = $('grid'), goalSelect = $('goalSelect');

  // ---- 항목 그리드 ----
  function renderGrid() {
    grid.innerHTML = '';
    SEED_ITEMS.forEach(it => {
      const b = document.createElement('button');
      b.className = 'tile'; b.type = 'button';
      b.innerHTML = `<span class="emo">${it.emo}</span><span>${it.name}</span>` +
        `<span class="amt">${it.ask ? '입력' : '+' + won(rateOf(it))}</span>`;
      bindLongPress(b, it);
      grid.appendChild(b);
    });
  }

  // 탭=적립 / 롱프레스=단가 편집 (입력은 편집·목표선택뿐, 핵심루프 타이핑0)
  function bindLongPress(el, it) {
    let timer = null, longed = false;
    const start = () => { longed = false; timer = setTimeout(() => { longed = true; editRate(it); }, 500); };
    const clear = () => { if (timer) clearTimeout(timer); };
    const tap = e => { e.preventDefault(); clear(); if (!longed) logSaving(it); };
    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchend', tap);
    el.addEventListener('touchmove', clear, { passive: true });
    // 데스크톱 폴백
    el.addEventListener('mousedown', start);
    el.addEventListener('mouseup', tap);
    el.addEventListener('mouseleave', clear);
  }

  function editRate(it) {
    const cur = rateOf(it);
    const v = prompt(`${it.name} 1회 절약 금액(원)`, cur || '');
    if (v == null) return;
    const n = Math.max(0, Math.round(Number(v.replace(/[^\d]/g, ''))));
    if (!isNaN(n)) { state.itemRates[it.id] = n; save(); renderGrid(); }
  }

  // ---- 적립 (1탭 = 즉시 적립 + 카운트업 + 토스트 + 햅틱) ----
  function logSaving(it) {
    let amt = rateOf(it);
    if (it.ask) {
      const v = prompt(`참은 ${it.name} 금액(원)`, '');
      if (v == null) return;
      amt = Math.max(0, Math.round(Number(String(v).replace(/[^\d]/g, ''))));
      if (!amt || isNaN(amt)) return;
    }
    if (amt <= 0) return;
    const rec = { ts: Date.now(), itemId: it.id, name: it.name, amount: amt };
    state.savings.push(rec); save();
    lastAction = rec;
    if (navigator.vibrate) navigator.vibrate(15);
    toast(`${it.emo} ${it.name} +${won(amt)}원`);
    showUndo(it.name);
    refresh(true);
  }

  function undoLast() {
    if (!lastAction) return;
    const i = state.savings.lastIndexOf(lastAction);
    if (i >= 0) state.savings.splice(i, 1);
    lastAction = null; save();
    hideUndo(); toast('되돌렸어요'); refresh(true);
  }
  function removeAt(ts) {
    const i = state.savings.findIndex(s => s.ts === ts);
    if (i >= 0) { state.savings.splice(i, 1); save(); refresh(true); renderSheet(); }
  }

  // ---- 합계/목표/진행률 ----
  function startOfWeek(d){const x=new Date(d);const day=(x.getDay()+6)%7;x.setHours(0,0,0,0);x.setDate(x.getDate()-day);return x.getTime();}
  function startOfMonth(d){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(1);return x.getTime();}

  function refresh(animate) {
    const t = total();
    countUp($('purseNum'), t, animate);
    if (animate) { const p=$('purseNum').parentElement; p.classList.remove('bump'); void p.offsetWidth; p.classList.add('bump'); }
    const now = Date.now(), w = startOfWeek(now), m = startOfMonth(now);
    $('weekNum').textContent = won(state.savings.filter(s=>s.ts>=w).reduce((a,s)=>a+s.amount,0)) + '원';
    $('monthNum').textContent = won(state.savings.filter(s=>s.ts>=m).reduce((a,s)=>a+s.amount,0)) + '원';
    $('logCount').textContent = state.savings.length;
    renderGoal(t);
  }

  function renderGoal(t) {
    const g = currentGoal();
    if (!g) { $('floorNum').textContent='—'; $('goalRemain').textContent='목표를 선택하세요'; $('buyCta').hidden=true; return; }
    $('floorNum').textContent = won(g.floor_krw);
    $('floorDate').textContent = (g.collected_at||floorData?.collected_at||'') + ' 수집 기준';
    const pct = Math.min(100, Math.round(t / g.floor_krw * 100));
    $('barFill').style.width = pct + '%';
    $('barPct').textContent = pct + '%';
    const remain = g.floor_krw - t;
    const cta = $('buyCta');
    if (remain <= 0) {
      $('goalRemain').textContent = `🎉 ${g.name} 살 수 있어요!`;
      cta.hidden = false; cta.href = g.dailyshot_url;
    } else {
      $('goalRemain').textContent = `${g.name}까지 ${pct}% · ${won(remain)}원 남음`;
      cta.hidden = true;
    }
  }

  function currentGoal() {
    if (!floorData) return null;
    const id = state.goal?.productId;
    return floorData.whiskies.find(w => w.product_id === id) || floorData.whiskies[0] || null;
  }

  // 카운트업 애니메이션
  function countUp(el, to, animate) {
    const from = Number(String(el.textContent).replace(/[^\d]/g,'')) || 0;
    if (!animate || from === to) { el.textContent = won(to); return; }
    const t0 = performance.now(), dur = 450;
    (function step(now){
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = won(Math.round(from + (to - from) * (1 - Math.pow(1-p,3))));
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  // ---- 토스트 / 되돌리기 ----
  let toastT;
  function toast(msg){ const el=$('toast'); el.textContent=msg; el.classList.add('show');
    clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('show'),1600); }
  let undoT;
  function showUndo(label){ $('undoLabel').textContent=label; const u=$('undoBar'); u.hidden=false;
    clearTimeout(undoT); undoT=setTimeout(hideUndo,4000); }
  function hideUndo(){ $('undoBar').hidden=true; }

  // ---- 기록 시트 ----
  function renderSheet() {
    const ul = $('sheetList'); ul.innerHTML='';
    if (!state.savings.length){ ul.innerHTML='<li style="color:var(--mut);justify-content:center">아직 기록이 없어요</li>'; return; }
    [...state.savings].reverse().forEach(s => {
      const d = new Date(s.ts);
      const li = document.createElement('li');
      li.innerHTML = `<span class="s-date">${d.getMonth()+1}/${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}</span>`+
        `<span>${s.name}</span><span class="s-amt">+${won(s.amount)}</span>`;
      const btn = document.createElement('button'); btn.className='s-undo'; btn.textContent='삭제';
      btn.onclick = () => removeAt(s.ts);
      li.appendChild(btn); ul.appendChild(li);
    });
  }

  // ---- floor 로드 ----
  async function loadFloor() {
    try {
      const r = await fetch('whisky_floor.json', { cache: 'no-cache' });
      floorData = await r.json();
    } catch { floorData = floorData || { collected_at:'', whiskies: [] }; }
    goalSelect.innerHTML = '';
    floorData.whiskies.forEach(w => {
      const o = document.createElement('option');
      o.value = w.product_id; o.textContent = `${w.name} · ${won(w.floor_krw)}원`;
      goalSelect.appendChild(o);
    });
    if (state.goal?.productId) goalSelect.value = state.goal.productId;
    else if (floorData.whiskies[0]) state.goal = { productId: floorData.whiskies[0].product_id, name: floorData.whiskies[0].name };
    refresh(false);
  }

  // ---- 이벤트 ----
  goalSelect.addEventListener('change', () => {
    const w = floorData.whiskies.find(x => x.product_id === goalSelect.value);
    if (w) { state.goal = { productId: w.product_id, name: w.name }; save(); refresh(false); }
  });
  $('undoBar').addEventListener('click', undoLast);
  $('histBtn').addEventListener('click', () => { renderSheet(); $('sheet').hidden=false; });
  $('sheetClose').addEventListener('click', () => $('sheet').hidden=true);
  $('sheet').addEventListener('click', e => { if (e.target.id==='sheet') $('sheet').hidden=true; });

  // ---- 초기화 ----
  renderGrid();
  refresh(false);
  loadFloor();
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(()=>{}));
  }
})();
