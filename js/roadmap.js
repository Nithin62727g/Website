// roadmap.js — Mind-map style modules + topic detail modal (roadmap.sh style)

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatExplanationBody(s) {
  return escapeHtml(s).replace(/\n/g, '<br>');
}

/** Previous module must be fully completed before the next unlocks. */
function isModuleLocked(mi, modules, doneSet) {
  if (mi === 0) return false;
  const prev = modules[mi - 1];
  const pt = prev.topics || [];
  if (!pt.length) return false;
  return !pt.every((t) => doneSet.has(String(t.id)));
}

function isGenericTopicDescription(desc) {
  if (!desc || String(desc).trim().length < 20) return true;
  return /^Learn\s+.+\s+as part of\s+/i.test(String(desc).trim());
}

// ── Roadmap.sh-style Resource Data ───────────────────────────────────────────
function getTopicResources(topicTitle) {
  const q = encodeURIComponent(topicTitle);
  const t = topicTitle;
  const roadmapTitle = (window._rmData && window._rmData.title) ? window._rmData.title : '';
  const isCode = /web|html|css|js|react|angular|vue|javascript|java|python|frontend|backend|fullstack|node|express|api|programming|code|dev/i.test(roadmapTitle + ' ' + topicTitle);

  const aiCourses = [
    `${t} Basics`,
    `${t} in Practice`,
    `Advanced ${t}`,
    `${t} Best Practices`,
  ];

  let freeRes, premiumRes;
  if (isCode) {
    freeRes = [
      { type: 'Article', title: `${t} — MDN Web Docs`,                      url: `https://developer.mozilla.org/en-US/search?q=${q}` },
      { type: 'Article', title: `${t} Explained (freeCodeCamp)`,             url: `https://www.freecodecamp.org/news/search/?query=${q}` },
      { type: 'Article', title: `Introduction to ${t}`,                      url: `https://www.google.com/search?q=introduction+to+${q}` },
      { type: 'Video',   title: `${t} Full Course (YouTube)`,                url: `https://www.youtube.com/results?search_query=${q}+full+course` },
      { type: 'Video',   title: `How does ${t} work? (Full Course)`,         url: `https://www.youtube.com/results?search_query=how+does+${q}+work` },
    ];
    premiumRes = [
      { type: 'Course', title: `The Complete ${t} Bootcamp — Udemy`,         url: `https://www.udemy.com/courses/search/?q=${q}`, discount: null },
      { type: 'Course', title: `Scrimba — Web Developer Career Path`,        url: `https://scrimba.com/learn`, discount: '20% Off' },
    ];
  } else {
    freeRes = [
      { type: 'Article', title: `${t} — Wikipedia`,                          url: `https://en.wikipedia.org/wiki/Special:Search?search=${q}` },
      { type: 'Article', title: `${t} Explained (Khan Academy)`,             url: `https://www.khanacademy.org/search?page_search_query=${q}` },
      { type: 'Article', title: `Introduction to ${t}`,                      url: `https://www.google.com/search?q=introduction+to+${q}` },
      { type: 'Video',   title: `${t} Crash Course (YouTube)`,               url: `https://www.youtube.com/results?search_query=${q}+crash+course` },
      { type: 'Video',   title: `Understanding ${t} (Video)`,                url: `https://www.youtube.com/results?search_query=understanding+${q}` },
    ];
    premiumRes = [
      { type: 'Course', title: `${t} Masterclass — Coursera`,                url: `https://www.coursera.org/search?query=${q}`, discount: null },
      { type: 'Course', title: `The Complete ${t} Guide — Udemy`,            url: `https://www.udemy.com/courses/search/?q=${q}`, discount: 'Special' },
    ];
  }

  return { free: freeRes, aiCourses, premium: premiumRes };
}

// ── Resource type badge colors ────────────────────────────────────────────────
const RES_COLORS = {
  Article: { bg: '#22c55e', label: '#22c55e' },
  Video:   { bg: '#8b5cf6', label: '#8b5cf6' },
  Course:  { bg: '#22c55e', label: '#22c55e' },
  Docs:    { bg: '#3b82f6', label: '#3b82f6' },
  GitHub:  { bg: '#f59e0b', label: '#f59e0b' },
};

function resBadge(type) {
  const c = RES_COLORS[type] || { bg: '#6b7280', label: '#6b7280' };
  return `<span style="flex-shrink:0;padding:3px 9px;border-radius:6px;font-size:10px;font-weight:800;letter-spacing:.5px;background:${c.bg}22;border:1px solid ${c.bg}66;color:${c.label}">${escapeHtml(type)}</span>`;
}

function resRow(r) {
  return `<a href="${escapeHtml(r.url)}" target="_blank" rel="noopener"
    style="text-decoration:none;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;transition:background .15s;"
    onmouseover="this.style.background='var(--card)'" onmouseout="this.style.background=''"
  >
    ${resBadge(r.type)}
    <span style="flex:1;font-size:14px;font-weight:600;color:var(--primary);text-decoration:underline;text-underline-offset:2px">${escapeHtml(r.title)}</span>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--on-surface-var)" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  </a>`;
}

function sectionHeader(emoji, label, color) {
  return `<div style="display:flex;justify-content:center;margin:18px 0 10px">
    <span style="display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;background:${color}18;border:1px solid ${color}44;color:${color}">
      ${emoji} ${escapeHtml(label)}
    </span>
  </div>`;
}

function renderResourcesTab(topicTitle) {
  const res = getTopicResources(topicTitle);

  const freeRows   = res.free.map(resRow).join('');
  const coursePills = res.aiCourses.map(c =>
    `<a href="https://www.google.com/search?q=${encodeURIComponent(c)}" target="_blank" rel="noopener"
      style="display:inline-block;margin:3px 4px;padding:5px 14px;border-radius:8px;font-size:12px;font-weight:700;background:#22c55e22;border:1px solid #22c55e66;color:#22c55e;text-decoration:none;transition:background .15s;"
      onmouseover="this.style.background='#22c55e44'" onmouseout="this.style.background='#22c55e22'"
    >${escapeHtml(c)}</a>`
  ).join('');

  const premiumRows = res.premium.map(r => {
    const badge = r.discount
      ? `<span style="padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;background:#f59e0b22;border:1px solid #f59e0b66;color:#f59e0b;margin-right:6px">${escapeHtml(r.discount)}</span>`
      : '';
    return `<a href="${escapeHtml(r.url)}" target="_blank" rel="noopener"
      style="text-decoration:none;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;transition:background .15s;"
      onmouseover="this.style.background='var(--card)'" onmouseout="this.style.background=''"
    >
      ${resBadge(r.type)}${badge}
      <span style="flex:1;font-size:14px;font-weight:600;color:var(--primary);text-decoration:underline;text-underline-offset:2px">${escapeHtml(r.title)}</span>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--on-surface-var)" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    </a>`;
  }).join('');

  return `
    ${sectionHeader('💚', 'Free Resources', '#22c55e')}
    <div style="margin-bottom:4px">${freeRows}</div>

    ${sectionHeader('✨', 'Your personalized AI tutor', '#8b5cf6')}
    <div style="padding:4px 8px 8px;display:flex;flex-wrap:wrap">${coursePills}</div>

    ${sectionHeader('⭐', 'Premium Resources', '#f59e0b')}
    <div style="margin-bottom:4px">${premiumRows}</div>
    <div style="margin:12px 14px 4px;padding:12px 14px;background:var(--card);border:1px solid var(--border);border-radius:12px;font-size:12px;color:var(--on-surface-var);line-height:1.5">
      <strong style="color:var(--on-bg)">Note on Premium Resources</strong><br>
      These are optional paid resources vetted by the community.<br>
      If you purchase a resource, we may receive a small commission at no extra cost to you.
    </div>
  `;
}

function renderAiTutorTab(topicTitle, topicId) {
  const res = getTopicResources(topicTitle);
  const chips = res.aiCourses.map((c, i) =>
    `<button onclick="modalAiTabMode('course','${escapeHtml(topicTitle)}','${escapeHtml(c)}')"
      style="padding:5px 14px;border-radius:8px;font-size:12px;font-weight:700;background:var(--card);border:1px solid var(--border);color:var(--on-bg);cursor:pointer;transition:background .15s;margin:3px 4px"
      onmouseover="this.style.background='var(--border)'" onmouseout="this.style.background='var(--card)'"
    >${escapeHtml(c)}</button>`
  ).join('');

  return `
    <div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:700;color:var(--on-surface-var);margin-bottom:8px">Complete the following AI Tutor courses</div>
      <div style="display:flex;flex-wrap:wrap;margin:-3px -4px">${chips}</div>
      <button onclick="modalAiTabMode('another','${escapeHtml(topicTitle)}','')"
        style="margin-top:8px;background:none;border:none;font-size:12px;color:var(--primary);cursor:pointer;padding:0;font-weight:600"
      >✦ Learn another topic</button>
    </div>

    <div style="border:1px solid var(--border);border-radius:16px;overflow:hidden;margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--card);border-bottom:1px solid var(--border)">
        <span style="font-size:13px;font-weight:700;color:var(--on-bg)">Chat with AI</span>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:11px;color:var(--on-surface-var)">0% credits used</span>
          <button style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:700;background:#f59e0b;color:#000;border:none;cursor:pointer">⚡ Upgrade</button>
        </div>
      </div>
      <div style="padding:12px 16px;display:flex;gap:8px">
        <button id="ai-mode-explain" onclick="setAiMode('explain','${escapeHtml(topicTitle)}')"
          style="display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:10px;font-size:13px;font-weight:600;background:var(--card);border:1px solid var(--border);color:var(--on-bg);cursor:pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Explain ▾
        </button>
        <button id="ai-mode-test" onclick="setAiMode('test','${escapeHtml(topicTitle)}')"
          style="display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:10px;font-size:13px;font-weight:600;background:var(--card);border:1px solid var(--border);color:var(--on-bg);cursor:pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          Test my Knowledge
        </button>
      </div>
      <div id="modal-chat-ai" style="max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:0 16px 12px">
        <div style="display:flex;align-items:flex-start;gap:10px">
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px">🤖</div>
          <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;border-top-left-radius:4px;padding:12px 14px;font-size:13px;color:var(--on-bg);line-height:1.5">
            Hey, I am your AI instructor. How can I help you today? 👋
          </div>
        </div>
      </div>
    </div>

    <div style="display:flex;gap:10px;align-items:center">
      <input id="modal-chat-input-ai" placeholder="Ask AI anything about the lesson…"
        style="flex:1;padding:12px 16px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--on-bg);font-size:13px;outline:none;font-family:inherit"
        onkeydown="if(event.key==='Enter')sendModalAiChat('${escapeHtml(topicTitle)}')"
      >
      <button onclick="sendModalAiChat('${escapeHtml(topicTitle)}')"
        style="width:44px;height:44px;border-radius:12px;background:var(--primary);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  `;
}

// ── AI explanation cache + loader ─────────────────────────────────────────────
const _explainCache = {};

function parseExplanationReply(reply) {
  const text = String(reply || '').trim();
  const kcMatch = text.match(/KEY_CONCEPTS:\s*(.+)/is);
  const key_concepts = kcMatch ? kcMatch[1].replace(/\n.*/s, '').trim() : '';
  const beforeKey = text.replace(/KEY_CONCEPTS:[\s\S]*/i, '').trim();
  const takeaways = [];
  const overviewLines = [];
  beforeKey.split('\n').forEach((line) => {
    const t = line.trim();
    if (t.startsWith('- ')) takeaways.push(t.slice(2).trim());
    else if (t.length) overviewLines.push(t);
  });
  const description = overviewLines.join(' ');
  return { description, key_concepts, takeaways };
}

async function fetchTopicExplanation(topicId, topicTitle, moduleTitle) {
  if (_explainCache[topicId]) return _explainCache[topicId];
  try {
    const prompt =
      `You are a technical educator. For the topic "${topicTitle}" inside the module "${moduleTitle}":\n\n` +
      `1) Write an OVERVIEW of 4–6 sentences: what this topic is, why it matters in real projects, one pitfall beginners hit, and how it connects to the rest of the module.\n` +
      `2) On separate lines, write exactly 4 bullet takeaways. Each line must start with "- " followed by one short sentence (max 18 words).\n` +
      `3) Last line must be exactly: KEY_CONCEPTS: term1, term2, term3, term4, term5, term6, term7\n\n` +
      `Plain text only. No markdown headings or bold.`;
    const res = await api.mentor.chat(prompt, topicTitle, `Module: ${moduleTitle}`);
    const reply = (res.reply || res.message || '').trim();
    const parsed = parseExplanationReply(reply);
    const result = {
      description: parsed.description,
      key_concepts: parsed.key_concepts,
      takeaways: parsed.takeaways,
    };
    _explainCache[topicId] = result;
    return result;
  } catch {
    const fallback = { description: '', key_concepts: '', takeaways: [] };
    _explainCache[topicId] = fallback;
    return fallback;
  }
}

function buildExplanationHTML(description, key_concepts, duration, topicTitle, moduleName, takeaways = []) {
  const displayDesc =
    description && description.length > 40
      ? description
      : `${topicTitle} is a core part of ${moduleName}. You will build practical skills you can use in real projects, see how this topic connects to neighboring ideas, and avoid common beginner mistakes. Use the resources and AI tutor below to go deeper.`;

  const takeawaysHtml =
    takeaways && takeaways.length
      ? `<div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px 18px;margin-bottom:16px">
      <div style="font-size:11px;font-weight:800;letter-spacing:0.08em;color:var(--primary);margin-bottom:10px">TAKEAWAYS</div>
      <ul style="margin:0;padding-left:18px;line-height:1.55;font-size:14px;color:var(--on-bg)">
        ${takeaways.map((t) => `<li style="margin-bottom:6px">${escapeHtml(t)}</li>`).join('')}
      </ul>
    </div>`
      : '';

  const pills = key_concepts
    ? key_concepts
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
        .map(
          (c) =>
            `<span style="display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;background:rgba(6,182,212,.1);border:1px solid rgba(6,182,212,.3);color:#06b6d4;margin:4px 4px 0 0">${escapeHtml(c)}</span>`
        )
        .join('')
    : '';

  const keyConcCard = pills
    ? `<div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px 20px;margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
        <span style="font-size:12px;font-weight:800;letter-spacing:1px;color:var(--on-bg)">KEY CONCEPTS</span>
      </div>
      <div>${pills}</div>
    </div>`
    : '';

  const durationRow = duration
    ? `<div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;color:var(--on-surface-var);font-size:13px;font-weight:500">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      Estimated time: <strong style="color:var(--on-bg)">${escapeHtml(duration)}</strong>
    </div>`
    : '';

  return { displayDesc, keyConcCard, durationRow, takeawaysHtml };
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
const SKELETON_CSS = `background:linear-gradient(90deg,var(--card) 25%,var(--border) 50%,var(--card) 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;border-radius:8px;`;
function skeletonBlock(w, h) {
  return `<div style="width:${w};height:${h};${SKELETON_CSS}margin-bottom:8px"></div>`;
}

// ── Page init ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth()) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) { window.location.href='dashboard.html'; return; }

  let cache = getRoadmapsCache();
  let rm = cache.find(r => String(r.id) === String(id));
  if (!rm) {
    try {
      const live = await api.roadmaps.list();
      rm = (live.roadmaps || []).find(r => String(r.id) === String(id));
      if (rm) {
        let c = getRoadmapsCache();
        c.unshift(rm);
        saveRoadmapsCache(c);
      }
    } catch(e) {}
  }
  if (!rm) { showToast('Roadmap not found','error'); setTimeout(()=>window.history.back(),1500); return; }

  const data = rm.data || rm;
  renderRoadmap(data);
});

// ── Roadmap canvas zoom (stable: scale only, transform-origin top center) ─────
const RM_ZOOM_MIN  = 0.5;
const RM_ZOOM_MAX  = 1.6;
const RM_ZOOM_STEP = 0.1;

let _rmScale  = 1.0;
let _rmZoomRo = null;

function _rmApply() {
  const inner   = document.getElementById('rm-zoom-inner');
  const wrapper = document.getElementById('rm-zoom-wrapper');
  const pct     = document.getElementById('rm-zoom-pct');
  const outB    = document.getElementById('rm-zoom-out');
  const inB     = document.getElementById('rm-zoom-in');
  if (!inner) return;

  // Clear any old CSS zoom to firmly migrate to transform: scale
  inner.style.zoom = '';
  inner.style.transformOrigin = '0 0';
  inner.style.transform = `scale(${_rmScale})`;

  if (wrapper) {
    // Dynamically update the wrapper dimensions to match the scaled inner content.
    // This perfectly prevents the left/right content clipping issue that `transform` alone causes,
    // as it forces the parent container to create accurate scrollbars for the scaled area.
    wrapper.style.width  = (inner.scrollWidth * _rmScale) + 'px';
    wrapper.style.height = (inner.scrollHeight * _rmScale) + 'px';
  }

  if (pct)  pct.textContent = `${Math.round(_rmScale * 100)}%`;
  if (outB) outB.disabled   = _rmScale <= RM_ZOOM_MIN + 1e-6;
  if (inB)  inB.disabled    = _rmScale >= RM_ZOOM_MAX - 1e-6;
}

function _rmClamp(s) {
  return Math.min(RM_ZOOM_MAX, Math.max(RM_ZOOM_MIN, s));
}

// Compat wrappers (called from renderRoadmap)
function roadmapZoomRead()    { return _rmScale; }
function roadmapZoomWrite(z) { _rmScale = _rmClamp(z); return _rmScale; }
function roadmapZoomApply()  { _rmApply(); }
function roadmapZoomSet(z)   { _rmScale = _rmClamp(z); _rmApply(); }

function roadmapZoomBind() {
  const viewport = document.getElementById('modules-container');
  if (!viewport || viewport.dataset.rmZoomBound === '1') return;
  viewport.dataset.rmZoomBound = '1';

  // ── Toolbar buttons ─────────────────────────────────────────────────────────
  viewport.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    if      (btn.id === 'rm-zoom-in')    { e.preventDefault(); roadmapZoomSet(_rmClamp(_rmScale + RM_ZOOM_STEP)); }
    else if (btn.id === 'rm-zoom-out')   { e.preventDefault(); roadmapZoomSet(_rmClamp(_rmScale - RM_ZOOM_STEP)); }
    else if (btn.id === 'rm-zoom-reset') { e.preventDefault(); roadmapZoomSet(1.0); }
  });

  // ── Mouse-wheel smooth zoom ─────────────────────────────────────────────────
  viewport.addEventListener('wheel', (e) => {
    if (!e.target.closest('.rm-canvas, .rm-zoom-inner')) return;
    e.preventDefault();
    // Normalise delta so trackpads and wheel mice feel similar
    const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 50) / 500;
    roadmapZoomSet(_rmClamp(_rmScale - delta));
  }, { passive: false });

  // ── Touch pinch-zoom ────────────────────────────────────────────────────────
  let _pinchDist = null;

  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      _pinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 2 || _pinchDist === null) return;
    const d = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    if (_pinchDist > 0) roadmapZoomSet(_rmClamp(_rmScale * (d / _pinchDist)));
    _pinchDist = d;
    e.preventDefault();
  }, { passive: false });

  viewport.addEventListener('touchend', () => { _pinchDist = null; }, { passive: true });
}

function roadmapZoomObserve() {
  const inner = document.getElementById('rm-zoom-inner');
  if (!inner) return;
  if (_rmZoomRo) _rmZoomRo.disconnect();
  _rmZoomRo = new ResizeObserver(_rmApply);
  _rmZoomRo.observe(inner);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', roadmapZoomBind);
} else {
  roadmapZoomBind();
}



function renderRoadmap(data) {
  document.getElementById('rm-title').textContent = data.goal_title || 'Roadmap';
  document.getElementById('rm-desc').textContent = data.description || '';
  const descSidebar = document.getElementById('rm-desc-sidebar');
  if (descSidebar) descSidebar.textContent = data.description || 'Master this skill path with AI guidance.';
  const lb = document.getElementById('rm-level-badge');
  if (lb) lb.textContent = data.difficulty || 'All Levels';

  const modules = data.modules || [];
  const user = getUser();
  const doneSet = new Set((user && user.completed_topics) ? user.completed_topics : []);

  let totalTopics = 0, doneTopics = 0;
  modules.forEach(m => {
    (m.topics || []).forEach(t => {
      totalTopics++;
      if (doneSet.has(String(t.id))) doneTopics++;
    });
  });

  const modChip = document.getElementById('stat-mods');
  if (modChip) modChip.textContent = modules.length;
  const topChip = document.getElementById('stat-topics');
  if (topChip) topChip.textContent = totalTopics;

  const pct = totalTopics ? Math.round((doneTopics / totalTopics) * 100) : 0;
  const progEl = document.getElementById('rm-progress-text');
  if (progEl) progEl.textContent = `${doneTopics} of ${totalTopics} completed`;
  const progPct = document.getElementById('rm-progress-pct');
  if (progPct) progPct.textContent = `${pct}%`;
  const progBar = document.getElementById('rm-progress-bar');
  if (progBar) progBar.style.width = `${pct}%`;

  const mount = document.getElementById('rm-map-scaler') || document.getElementById('modules-container');
  if (!mount) return;
  mount.innerHTML = '';
  if (!modules.length) {
    mount.innerHTML = `<div class="empty-state"><div style="font-size:40px">🗺️</div><div class="text-base font-bold mt-4">No modules yet</div></div>`;
    return;
  }

  window._rmData = { topics: {}, modules: {} };

  const sections = modules
    .map((mod, mi) => {
      const topics = mod.topics || [];
      const modDone = topics.every((t) => doneSet.has(String(t.id)));
      const modLocked = isModuleLocked(mi, modules, doneSet);
      const modActive =
        !modDone &&
        !modLocked &&
        (mi === 0 ||
          modules.slice(0, mi).some((pm) => (pm.topics || []).some((t) => doneSet.has(String(t.id)))));
      /* Reference: module 1,3,5… branch RIGHT; module 2,4… branch LEFT */
      const branchRight = mi % 2 === 0;

      window._rmData.modules[mod.id] = mod;
      topics.forEach((t) => {
        window._rmData.topics[String(t.id)] = { topic: t, module: mod };
      });

      let markedCurrent = false;
      const topicRows = topics
        .map((t) => {
          const done = doneSet.has(String(t.id));
          const isCurrent =
            !modLocked && modActive && !done && !markedCurrent;
          if (isCurrent) markedCurrent = true;
          const tid = String(t.id).replace(/'/g, "\\'");
          const lockedCls = modLocked ? ' mm-locked' : '';
          const currentCls = isCurrent ? ' mm-topic-current' : '';
          const doneCls = done && !isCurrent ? ' done' : '';
          const card = `<button type="button" class="mm-topic-card${doneCls}${currentCls}${lockedCls}" data-tid="${escapeHtml(String(t.id))}" onclick="topicCardClick('${tid}', ${modLocked})"><span class="mm-topic-title">${escapeHtml(t.title)}</span></button>`;
          const twigCls = branchRight ? 'rm-twig-to-topic-right' : 'rm-twig-to-topic-left';
          const twig = `<div class="rm-twig ${twigCls}" aria-hidden="true"></div>`;
          /* Bus + elbow on rail; twig + arrow from bus into each topic */
          const inner = branchRight ? `${twig}${card}` : `${card}${twig}`;
          return `<div class="rm-topic-row">${inner}</div>`;
        })
        .join('');

      const hubClass = `mm-hub-card${modDone ? ' mm-hub-done' : ''}${modActive ? ' mm-hub-active' : ''}${modLocked ? ' mm-hub-locked' : ''}`;
      const stepBadge = mi + 1;
      const metaLine = modLocked
        ? '<div class="mm-hub-meta">Locked</div>'
        : modDone
          ? ''
          : '';
      /* Reference: step number sits on horizontal segment between hub and vertical bus */
      const elbow = `<div class="rm-elbow" aria-hidden="true"><span class="rm-elbow-line"></span><span class="rm-step-badge">${stepBadge}</span><span class="rm-elbow-line"></span></div>`;
      const hub = `
        <div class="${hubClass}">
          <span class="rm-step-badge rm-step-badge--mobile">${stepBadge}</span>
          <div class="mm-hub-title">${escapeHtml(mod.title)}</div>
          ${metaLine}
        </div>`;

      const railRight =
        '<div class="rm-rail rm-rail-right" aria-hidden="true"><div class="rm-arm-v"></div></div>';
      const railLeft =
        '<div class="rm-rail rm-rail-left" aria-hidden="true"><div class="rm-arm-v"></div></div>';
      const spineZone = `<div class="rm-spine-zone"><div class="rm-hub-anchor">${hub}</div></div>`;
      const topicStackHtml = `<div class="rm-topic-stack">${topicRows}</div>`;
      const railTopicsRight = `<div class="rm-rail-topics rm-rail-topics-right">${railRight}${topicStackHtml}</div>`;
      const railTopicsLeft = `<div class="rm-rail-topics rm-rail-topics-left">${topicStackHtml}${railLeft}</div>`;
      /* One flex row: elbow + rail/topics — indented so hub (centered on spine) does not overlap topics */
      const contRight = `<div class="rm-branch-continuation rm-branch-continuation-right">${elbow}${railTopicsRight}</div>`;
      const contLeft = `<div class="rm-branch-continuation rm-branch-continuation-left">${railTopicsLeft}${elbow}</div>`;
      const body = branchRight
        ? `${spineZone}${contRight}`
        : `${contLeft}${spineZone}`;

      return `<section class="rm-module-section rm-branch-${branchRight ? 'right' : 'left'}" data-module-index="${mi}">${body}</section>`;
    })
    .join('');

  mount.innerHTML = `
    <div class="mm-dot-grid rm-canvas">
      <div class="rm-zoom-wrapper" id="rm-zoom-wrapper" style="position:relative; transition: width 0.18s ease, height 0.18s ease; margin: 0 auto; min-width: max-content;">
        <div class="rm-zoom-inner" id="rm-zoom-inner" style="transition: transform 0.18s ease; width: max-content; min-width: 100%;">
          <div class="rm-spine-global" aria-hidden="true"></div>
          <div class="rm-modules">${sections}</div>
        </div>
      </div>
      <div class="rm-zoom-toolbar" role="toolbar" aria-label="Zoom roadmap">
        <button type="button" class="rm-zoom-btn" id="rm-zoom-in" title="Zoom in" aria-label="Zoom in">+</button>
        <span class="rm-zoom-pct" id="rm-zoom-pct">100%</span>
        <button type="button" class="rm-zoom-btn" id="rm-zoom-out" title="Zoom out" aria-label="Zoom out">−</button>
        <button type="button" class="rm-zoom-btn rm-zoom-btn-reset" id="rm-zoom-reset" title="Reset zoom">Reset</button>
      </div>
    </div>`;

  roadmapZoomBind();
  roadmapZoomApply(roadmapZoomRead());
  roadmapZoomObserve();
}

window.topicCardClick = function (tid, locked) {
  if (locked) {
    showToast('Complete the previous module to unlock', 'error');
    return;
  }
  window.openTopicById(tid);
};

// ── Topic modal ────────────────────────────────────────────────────────────────
window.openTopicById = async function(tid) {
  const entry = window._rmData && window._rmData.topics[String(tid)];
  if (!entry) return;
  const t = entry.topic, mod = entry.module;
  const user = getUser();
  const doneSet = new Set((user && user.completed_topics) ? user.completed_topics : []);
  const done = doneSet.has(String(t.id));

  const hasKeyConcepts = !!(t.key_concepts || t.keyConcepts);
  const hasRichData =
    t.description &&
    !isGenericTopicDescription(t.description) &&
    (String(t.description).trim().length > 35 || hasKeyConcepts);

  const tw = Array.isArray(t.takeaways) ? t.takeaways : [];
  const { displayDesc, keyConcCard, durationRow, takeawaysHtml } = hasRichData
    ? buildExplanationHTML(
        t.description,
        t.key_concepts || t.keyConcepts || '',
        t.duration || '',
        t.title,
        mod.title,
        tw
      )
    : { displayDesc: '', keyConcCard: '', durationRow: '', takeawaysHtml: '' };

  const skeletonSection = (!hasRichData) ? `
    <div id="explain-skeleton">
      ${skeletonBlock('100%', '14px')}
      ${skeletonBlock('85%', '14px')}
      ${skeletonBlock('60%', '14px')}
      <div style="margin-top:16px;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px 20px">
        ${skeletonBlock('120px', '12px')}
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          ${[80,100,70,90,65].map(w => `<div style="width:${w}px;height:28px;${SKELETON_CSS}border-radius:20px"></div>`).join('')}
        </div>
      </div>
    </div>
    <div id="explain-loaded" style="display:none"></div>` : '';

  const descHtml = hasRichData
    ? `<p class="text-base text-body mb-5" style="line-height:1.7">${formatExplanationBody(displayDesc)}</p>${takeawaysHtml}${keyConcCard}${durationRow}`
    : skeletonSection;

  const safeTitle = t.title.replace(/'/g, "\\'");

  // ── Modal: roadmap.sh sidebar style ──────────────────────────────────────────
  const modal = `
  <div class="modal-overlay" id="topic-modal" onclick="closeTopicModal(event)">
    <div class="modal" style="max-width:620px;max-height:92vh;overflow-y:auto;padding:0">

      <!-- Top action bar (Resources | AI Tutor | Pending | ✕) -->
      <div style="display:flex;align-items:center;gap:10px;padding:16px 20px;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--bg);z-index:10;flex-shrink:0">
        <button id="mtab-res" onclick="switchModalTab('res')"
          style="display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:20px;font-size:13px;font-weight:700;cursor:pointer;border:1px solid #3b82f666;background:#3b82f618;color:#3b82f6;transition:all .2s"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
          Resources
        </button>
        <button id="mtab-ai" onclick="switchModalTab('ai')"
          style="display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:20px;font-size:13px;font-weight:700;cursor:pointer;border:1px solid var(--border);background:var(--card);color:var(--on-surface-var);transition:all .2s"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          AI Tutor
        </button>
        <div style="margin-left:auto;display:flex;align-items:center;gap:8px">
          <div id="modal-status-badge" style="padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;background:${done ? '#111318' : 'var(--card)'};border:1px solid ${done ? '#111318' : 'var(--border)'};color:${done ? '#fff' : 'var(--on-surface-var)'}">
            ${done ? '\u2713 Done' : '\u25cf Pending'}
          </div>
          <button onclick="document.getElementById('topic-modal').remove()"
            style="width:32px;height:32px;border-radius:50%;border:1px solid var(--border);background:var(--card);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--on-surface-var)"
          >✕</button>
        </div>
      </div>

      <!-- Body scrollable area -->
      <div style="padding:24px 24px 16px">

        <!-- Topic title + description -->
        <h2 style="font-size:28px;font-weight:900;color:var(--on-bg);margin-bottom:12px;letter-spacing:-0.5px">${escapeHtml(t.title)}</h2>
        <div id="topic-explain-area">${descHtml}</div>

        <!-- Resources panel -->
        <div id="mpanel-res">
          ${renderResourcesTab(t.title)}
        </div>

        <!-- AI Tutor panel (hidden by default) -->
        <div id="mpanel-ai" style="display:none">
          ${renderAiTutorTab(t.title, t.id)}
        </div>
      </div>

      <!-- Sticky bottom: Mark as done -->
      <div style="position:sticky;bottom:0;background:var(--bg);border-top:1px solid var(--border);padding:16px 24px">
        <button class="btn ${done?'btn-secondary':'btn-primary'} w-full" style="padding:14px;font-size:15px;font-weight:700"
          id="mark-done-btn" onclick="markDone('${t.id}', '${mod.id}')"
        >
          ${done ? '✓ Completed' : 'Mark as Done'}
        </button>
      </div>
    </div>
  </div>`;

  document.getElementById('topic-modal')?.remove();
  document.body.insertAdjacentHTML('beforeend', modal);
  setTimeout(() => {
    const m = document.getElementById('topic-modal');
    if (m) m.classList.add('open');
  }, 10);

  // If topic lacks rich data, fetch AI explanation async and fill in
  if (!hasRichData) {
    fetchTopicExplanation(t.id, t.title, mod.title).then(result => {
      const explainArea = document.getElementById('topic-explain-area');
      if (!explainArea) return;
      const { displayDesc, keyConcCard, durationRow, takeawaysHtml } = buildExplanationHTML(
        result.description,
        result.key_concepts,
        t.duration || '',
        t.title,
        mod.title,
        result.takeaways || []
      );
      explainArea.innerHTML = `<p class="text-base text-body mb-5" style="line-height:1.7">${formatExplanationBody(displayDesc)}</p>${takeawaysHtml}${keyConcCard}${durationRow}`;
      t.description = result.description || t.description;
      t.key_concepts = result.key_concepts;
      t.takeaways = result.takeaways || [];
    });
  }
};

window.closeTopicModal = function(e) {
  if (e.target.id === 'topic-modal') {
    e.target.classList.remove('open');
    setTimeout(() => e.target.remove(), 300);
  }
};

window.switchModalTab = function(tab) {
  const resTab = document.getElementById('mtab-res');
  const aiTab  = document.getElementById('mtab-ai');
  const resPanel = document.getElementById('mpanel-res');
  const aiPanel  = document.getElementById('mpanel-ai');

  if (tab === 'res') {
    if (resTab) { resTab.style.border='1px solid #3b82f666'; resTab.style.background='#3b82f618'; resTab.style.color='#3b82f6'; }
    if (aiTab)  { aiTab.style.border='1px solid var(--border)'; aiTab.style.background='var(--card)'; aiTab.style.color='var(--on-surface-var)'; }
    if (resPanel) resPanel.style.display = '';
    if (aiPanel)  aiPanel.style.display  = 'none';
  } else {
    if (aiTab)  { aiTab.style.border='1px solid #8b5cf666'; aiTab.style.background='#8b5cf618'; aiTab.style.color='#8b5cf6'; }
    if (resTab) { resTab.style.border='1px solid var(--border)'; resTab.style.background='var(--card)'; resTab.style.color='var(--on-surface-var)'; }
    if (resPanel) resPanel.style.display = 'none';
    if (aiPanel)  aiPanel.style.display  = '';
  }
};

window.setAiMode = async function(mode, topicTitle) {
  const chat = document.getElementById('modal-chat-ai');
  if (!chat) return;
  const explainBtn = document.getElementById('ai-mode-explain');
  const testBtn = document.getElementById('ai-mode-test');

  // Highlight active button
  if (mode === 'explain') {
    if (explainBtn) { explainBtn.style.background='#7c3aed22'; explainBtn.style.borderColor='#7c3aed66'; explainBtn.style.color='#a78bfa'; }
    if (testBtn)    { testBtn.style.background='var(--card)'; testBtn.style.borderColor='var(--border)'; testBtn.style.color='var(--on-bg)'; }
  } else {
    if (testBtn)    { testBtn.style.background='#7c3aed22'; testBtn.style.borderColor='#7c3aed66'; testBtn.style.color='#a78bfa'; }
    if (explainBtn) { explainBtn.style.background='var(--card)'; explainBtn.style.borderColor='var(--border)'; explainBtn.style.color='var(--on-bg)'; }
  }

  const prompt = mode === 'explain'
    ? `Please give me a clear, beginner-friendly explanation of "${topicTitle}". Use simple language and a practical example.`
    : `Quiz me on "${topicTitle}". Give me one medium-difficulty question and wait for my answer.`;

  // Add user bubble
  chat.insertAdjacentHTML('beforeend', `
    <div style="display:flex;justify-content:flex-end">
      <div style="max-width:80%;background:var(--primary);color:#fff;border-radius:14px;border-bottom-right-radius:4px;padding:10px 14px;font-size:13px;line-height:1.5">
        ${mode === 'explain' ? '📖 Explain this topic' : '🧪 Test my knowledge'}
      </div>
    </div>
  `);
  chat.scrollTop = chat.scrollHeight;

  const loaderId = `loader-${Date.now()}`;
  chat.insertAdjacentHTML('beforeend', `
    <div id="${loaderId}" style="display:flex;align-items:flex-start;gap:10px">
      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px">🤖</div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;border-top-left-radius:4px;padding:12px 14px;font-size:13px;color:var(--on-surface-var)">…</div>
    </div>
  `);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await api.mentor.chat(prompt, topicTitle, `Topic: ${topicTitle}`);
    const reply = res.reply || res.message || 'Sorry, I could not answer.';
    document.getElementById(loaderId)?.remove();
    chat.insertAdjacentHTML('beforeend', `
      <div style="display:flex;align-items:flex-start;gap:10px">
        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px">🤖</div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;border-top-left-radius:4px;padding:12px 14px;font-size:13px;color:var(--on-bg);line-height:1.6">${escapeHtml(reply).replace(/\n/g,'<br>')}</div>
      </div>
    `);
    chat.scrollTop = chat.scrollHeight;
  } catch {
    document.getElementById(loaderId)?.remove();
    chat.insertAdjacentHTML('beforeend', `<div style="font-size:12px;color:var(--on-surface-var);padding:4px 8px">Connection error. Please try again.</div>`);
  }
};

window.modalAiTabMode = function(mode, topicTitle, courseName) {
  switchModalTab('ai');
  if (mode === 'course' && courseName) {
    const input = document.getElementById('modal-chat-input-ai');
    if (input) {
      input.value = `Teach me about: ${courseName}`;
      input.focus();
    }
  } else if (mode === 'another') {
    const input = document.getElementById('modal-chat-input-ai');
    if (input) {
      input.value = '';
      input.placeholder = 'Which topic would you like to learn?';
      input.focus();
    }
  }
};

window.sendModalAiChat = async function(topicTitle) {
  const input = document.getElementById('modal-chat-input-ai');
  const chat  = document.getElementById('modal-chat-ai');
  if (!input || !chat) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  chat.insertAdjacentHTML('beforeend', `
    <div style="display:flex;justify-content:flex-end">
      <div style="max-width:80%;background:var(--primary);color:#fff;border-radius:14px;border-bottom-right-radius:4px;padding:10px 14px;font-size:13px;line-height:1.5">${escapeHtml(msg)}</div>
    </div>
  `);
  chat.scrollTop = chat.scrollHeight;

  const loaderId = `loader-${Date.now()}`;
  chat.insertAdjacentHTML('beforeend', `
    <div id="${loaderId}" style="display:flex;align-items:flex-start;gap:10px">
      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px">🤖</div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;border-top-left-radius:4px;padding:12px 14px;font-size:13px;color:var(--on-surface-var)">…</div>
    </div>
  `);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await api.mentor.chat(msg, topicTitle, `Topic: ${topicTitle}`);
    const reply = res.reply || res.message || 'Sorry, I could not answer.';
    document.getElementById(loaderId)?.remove();
    chat.insertAdjacentHTML('beforeend', `
      <div style="display:flex;align-items:flex-start;gap:10px">
        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px">🤖</div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;border-top-left-radius:4px;padding:12px 14px;font-size:13px;color:var(--on-bg);line-height:1.6">${escapeHtml(reply).replace(/\n/g,'<br>')}</div>
      </div>
    `);
    chat.scrollTop = chat.scrollHeight;
  } catch {
    document.getElementById(loaderId)?.remove();
    chat.insertAdjacentHTML('beforeend', `<div style="font-size:12px;color:var(--on-surface-var);padding:4px 8px">Connection error. Please try again.</div>`);
  }
};

// Old sendModalChat kept for backward compat
window.sendModalChat = window.sendModalAiChat;

window.markDone = async function(topicId, modId) {
  try {
    const params = new URLSearchParams(window.location.search);
    const rmId = params.get('id');
    
    // Auto-save roadmap to "My Learning" if progressing via "Mark as done"
    let cache = getRoadmapsCache();
    let rm = cache.find(r => String(r.id) === rmId);
    if (rm) {
      const data = rm.data || rm;
      if (!data.is_saved || String(rm.id).startsWith('static_')) {
        try {
          const res = await api.roadmaps.saveOffline(data);
          if (res && res.id) {
            const oldId = String(rm.id);
            const newId = String(res.id);
            
            // If ID changed (e.g. static_frontend -> 123), migrate progress
            if (oldId !== newId) {
              rm.id = newId;
              rm.data = res;
              
              // 1. Update current topicId for the API call below
              if (topicId.startsWith(oldId + '_')) {
                topicId = topicId.replace(oldId + '_', newId + '_');
              }
              
              // 2. Migrate existing local progress for this roadmap
              const user = getUser();
              if (user && user.completed_topics) {
                user.completed_topics = user.completed_topics.map(tid => {
                  if (tid.startsWith(oldId + '_')) return tid.replace(oldId + '_', newId + '_');
                  return tid;
                });
                saveUser(user);
              }
              
              // 3. Update URL to point to the new saved ID
              const newUrl = new URL(window.location.href);
              newUrl.searchParams.set('id', newId);
              window.history.replaceState({}, '', newUrl.toString());
            }
          }
        } catch(e) { console.error("Auto-save failed", e); }
        
        try {
          const stKey = isAuthed() ? userKey('saved_titles') : 'learnflow_anon_saved';
          const savedSet = new Set(JSON.parse(localStorage.getItem(stKey) || '[]'));
          if (data.goal_title) savedSet.add(data.goal_title);
          localStorage.setItem(stKey, JSON.stringify([...savedSet]));
        } catch(e) {}
        saveRoadmapsCache(cache);
      }
    }

    let xpEarned = 5;
    try {
      const res = await api.roadmaps.saveProgress(topicId);
      xpEarned = res.xp_earned !== undefined ? res.xp_earned : 5;
      const user = getUser();
      if (user) {
        if (res.total_xp !== undefined) {
          user.xp = res.total_xp;
        }
        user.completed_topics = user.completed_topics || [];
        if (!user.completed_topics.includes(String(topicId))) {
          user.completed_topics.push(String(topicId));
        }
        localStorage.setItem('learnflow_user', JSON.stringify(user));
      }
    } catch(e) {
      // Fallback
      const user = getUser();
      if (user) {
        user.completed_topics = user.completed_topics || [];
        if (!user.completed_topics.includes(String(topicId))) {
          user.completed_topics.push(String(topicId));
          user.xp = (user.xp || 0) + xpEarned;
          localStorage.setItem('learnflow_user', JSON.stringify(user));
        }
      }
    }
    showToast(`Topic marked as done! +${xpEarned} XP`, 'success');
    const btn = document.getElementById('mark-done-btn');
    if (btn) { btn.textContent = '✓ Completed'; btn.className = 'btn btn-secondary w-full'; btn.style.padding='14px'; }
    document.querySelectorAll('.mm-topic-card, .path-topic').forEach((el) => {
      if (el.getAttribute('data-tid') === String(topicId)) {
        el.classList.add('done');
        el.classList.remove('mm-topic-current');
        // Immediately apply black completion style
        el.style.background = '#111318';
        el.style.borderColor = '#111318';
        el.style.color = '#fff';
        el.querySelector('.path-topic-dot')?.classList.add('filled');
      }
    });
    // Also update the modal status badge to Done
    const statusBadge = document.getElementById('modal-status-badge');
    if (statusBadge) {
      statusBadge.textContent = '\u2713 Done';
      statusBadge.style.background = '#111318';
      statusBadge.style.borderColor = '#111318';
      statusBadge.style.color = '#fff';
    }
    cache = getRoadmapsCache();
    rm = cache.find(r => String(r.id) === params.get('id'));
    if (rm) setTimeout(() => renderRoadmap(rm.data || rm), 500);
  } catch(e) {
    showToast('Failed to save progress', 'error');
  }
};

