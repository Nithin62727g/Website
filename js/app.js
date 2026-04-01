/* LearnFlow AI — Shared utilities, auth helpers, navigation */

// ── Auth helpers ──────────────────────────────────────────────
function requireAuth() {
  if (!localStorage.getItem('learnflow_token')) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function isAuthed() {
  return !!localStorage.getItem('learnflow_token');
}

function setToken(token) {
  localStorage.setItem('learnflow_token', token);
}

function logout() {
  // Clear current user's scoped keys
  const u = getUser();
  if (u?.id) {
    const prefix = `learnflow_${u.id}_`;
    Object.keys(localStorage).forEach(k => { if (k.startsWith(prefix)) localStorage.removeItem(k); });
  }
  localStorage.removeItem('learnflow_token');
  localStorage.removeItem('learnflow_user');
  window.location.href = 'login.html';
}

function getUser() {
  const u = localStorage.getItem('learnflow_user');
  return u ? JSON.parse(u) : null;
}

function saveUser(user) {
  localStorage.setItem('learnflow_user', JSON.stringify(user));
}

function slugify(text) {
  return (text || '').toString().toLowerCase()
    .trim()
    .replace(/\s+/g, '_')           // Replace spaces with _
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// ── XP / Level ────────────────────────────────────────────────
function xpToLevel(xp) {
  return Math.floor(xp / 100) + 1;
}

// ── Indian Standard Time date helper ─────────────────────────
// Returns yyyy-MM-dd in IST (Asia/Kolkata, UTC+5:30)
function getISTDate(d = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(d);
}

// ── Per-user localStorage key scoping ────────────────────────
// Prevents data leaks between different users on the same device
function userKey(suffix) {
  const u = getUser();
  const uid = u?.id || u?.email || 'anon';
  return `learnflow_${uid}_${suffix}`;
}

// ── Shared State Utilities ────────────────────────────────────
function getSavedTitles() {
  try {
    const key = isAuthed() ? userKey('saved_titles') : 'learnflow_anon_saved';
    return new Set(JSON.parse(localStorage.getItem(key) || '[]'));
  } catch(e) { return new Set(); }
}

function saveSavedTitles(set) {
  try {
    const key = isAuthed() ? userKey('saved_titles') : 'learnflow_anon_saved';
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch(e) { console.error("Failed to save titles", e); }
}

function getRoadmapsCache() {
  try { 
    const cache = JSON.parse(localStorage.getItem(userKey('roadmaps_cache')) || '[]');
    // Repair legacy topic IDs on the fly to permanently fix 100% completion bleeding
    cache.forEach(r => {
      const data = r.data || r;
      if (data.modules) {
        data.modules.forEach(m => {
          if (!m.id) {
            m.id = `${data.id}_m${m.title ? slugify(m.title) : Math.random().toString(36).substr(2, 5)}`;
          }
          if (m.topics) {
            m.topics.forEach(t => {
              // Ensure every topic has a unique ID tied to the roadmap ID
              if (!t.id || /^m\d+_t\d+$/.test(t.id)) {
                t.id = `${data.id}_${slugify(t.title)}`;
              }
            });
          }
        });
      }
    });
    return cache;
  }
  catch(e) { return []; }
}

function saveRoadmapsCache(cache) {
  try { localStorage.setItem(userKey('roadmaps_cache'), JSON.stringify(cache)); }
  catch(e) { console.error("Failed to save cache", e); }
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg, type = '') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3100);
}

// ── Animated entrances ────────────────────────────────────────
function animateUp() {
  const els = document.querySelectorAll('.animate-up, .animate-fade');
  els.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 60 + i * 70);
  });
}

// ── Set loading state on button ───────────────────────────────
function setLoading(btn, isLoading, text = '') {
  if (!btn) return;
  if (isLoading) {
    btn.dataset.originalText = btn.textContent;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner" style="width:18px;height:18px;border-width:2px;margin:0"></span>`;
  } else {
    btn.disabled = false;
    btn.textContent = text || btn.dataset.originalText || btn.textContent;
  }
}

// ── SVG icon helper ───────────────────────────────────────────
function icon(name, size = 22) {
  const icons = {
    home:      `<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    explore:   `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
    companion: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    profile:   `<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    roadmap:   `<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>`,
    bolt:      `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
    sparkle:   `<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>`,
    robot:     `<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="3"/><path d="M12 8v3"/><line x1="8" y1="15" x2="8" y2="17"/><line x1="16" y1="15" x2="16" y2="17"/>`,
    quiz:      `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>`,
    briefcase: `<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>`,
    arrow_left:`<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>`,
    book:      `<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>`,
    send:      `<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>`,
    chevron:   `<polyline points="6 9 12 15 18 9"/>`,
    check:     `<polyline points="20 6 9 17 4 12"/>`,
    trending:  `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
    star:      `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    logout:    `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[name] || ''}</svg>`;
}

// ── Sidebar HTML ──────────────────────────────────────────────
function renderSidebar(active = 0) {
  const pages    = ['dashboard.html', 'explore.html', 'companion.html', 'profile.html'];
  const labels   = ['Dashboard', 'Explore', 'Companion', 'Profile'];
  const iconNames = ['home', 'roadmap', 'companion', 'profile'];

  const user = getUser() || { name: 'User' };
  const initials = user.name ? user.name.substring(0, 2).toUpperCase() : 'U';

  // Mobile nav (injected into bottom of body)
  const mobileNav = `
  <nav class="mobile-nav" id="mobile-nav">
    ${iconNames.map((ic, i) => `
      <a href="${pages[i]}" class="mobile-nav-item ${i === active ? 'active' : ''}" id="mnav-${labels[i].toLowerCase()}">
        ${icon(ic, 22)}
        <span>${labels[i]}</span>
      </a>
    `).join('')}
  </nav>`;

  // Inject mobile nav into body
  setTimeout(() => {
    if (!document.getElementById('mobile-nav')) {
      document.body.insertAdjacentHTML('beforeend', mobileNav);
    }
  }, 0);

  return `
  <aside class="sidebar animate-up" id="sidebar">
    <a href="dashboard.html" class="sidebar-logo">
      <div class="sidebar-logo-icon">
        ${icon('bolt', 18)}
      </div>
      LearnFlow AI
    </a>
    <nav class="sidebar-nav">
      <span class="sidebar-section-label">Main</span>
      ${iconNames.map((ic, i) => `
        <a href="${pages[i]}" class="sidebar-item ${i === active ? 'active' : ''}" id="nav-${labels[i].toLowerCase()}">
          ${icon(ic, 18)} <span>${labels[i]}</span>
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-user">
      <div style="display:flex; align-items:center; gap:10px; overflow:hidden; flex:1;">
        <div class="user-avatar">${initials}</div>
        <div style="flex:1; overflow:hidden;">
          <div style="font-weight:700; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--on-bg);">${user.name}</div>
          <div style="font-size:11px; color:var(--on-surface-var);">Verified Account</div>
        </div>
      </div>
      <button onclick="logout()" title="Log out" style="background:transparent; border:none; color:var(--placeholder); cursor:pointer; padding:8px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.2s;" onmouseover="this.style.background='rgba(220,38,38,0.08)'; this.style.color='var(--error)';" onmouseout="this.style.background='transparent'; this.style.color='var(--placeholder)';">
        ${icon('logout', 17)}
      </button>
    </div>
  </aside>`;
}

document.addEventListener('DOMContentLoaded', animateUp);
