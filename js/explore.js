// Explore Logic — Uses pre-built static roadmap data (no API generation)

const ROLE_ROADMAPS = [
  {title:"Frontend"}, {title:"Backend"}, {title:"Web Dev"},
  {title:"DevOps"}, {title:"DevSecOps"}, {title:"Data Analyst"},
  {title:"AI/ML"}, {title:"AI and Data Scientist"}, {title:"Data Engineer"},
  {title:"Android Dev"}, {title:"Machine Learning"}, {title:"PostgreSQL"},
  {title:"iOS"}, {title:"Blockchain"}, {title:"QA"},
  {title:"Software Architect"}, {title:"Cyber Security"}, {title:"UX Design"},
  {title:"Technical Writer"}, {title:"Game Developer"}, {title:"Server Side Game Developer"},
  {title:"MLOps"}, {title:"Product Manager"}, {title:"Engineering Manager"},
  {title:"Developer Relations"}, {title:"BI Analyst"}
];

const SKILL_ROADMAPS = [
  {title:"SQL"}, {title:"Computer Science"}, {title:"React"},
  {title:"Vue"}, {title:"Angular"}, {title:"JavaScript"},
  {title:"TypeScript"}, {title:"Node.js"}, {title:"Python"},
  {title:"System Design"}, {title:"Java"}, {title:"ASP.NET Core"},
  {title:"API Design"}, {title:"Spring Boot"}, {title:"Flutter"},
  {title:"C++"}, {title:"Rust"}, {title:"Go Roadmap"},
  {title:"Design and Architecture"}, {title:"GraphQL"}, {title:"React Native"},
  {title:"Design System"}, {title:"Prompt Engineering"}, {title:"MongoDB"},
  {title:"Linux"}, {title:"Kubernetes"}, {title:"Docker"},
  {title:"AWS"}, {title:"Terraform"}, {title:"Data Structures & Algorithms"},
  {title:"Redis"}, {title:"Git and GitHub"}, {title:"PHP"},
  {title:"Cloudflare"}, {title:"AI Red Teaming"}, {title:"AI Agents"},
  {title:"Next.js"}, {title:"Code Review"}, {title:"Kotlin"},
  {title:"HTML"}, {title:"CSS"}, {title:"Swift & Swift UI"},
  {title:"Shell / Bash"}, {title:"Laravel"}, {title:"Elasticsearch"},
  {title:"WordPress"}, {title:"Django"}, {title:"Ruby"},
  {title:"Ruby on Rails"}, {title:"Claude Code", isNew:true}, {title:"Vibe Coding", isNew:true}
];

const isAuthed = () => !!localStorage.getItem('learnflow_token');
let currentTab = 'role';

let savedTitles = getSavedTitles();

function showSignInGate(action = 'access this roadmap') {
  // Remove old modal if present
  const old = document.getElementById('signin-gate-modal');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.id = 'signin-gate-modal';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:999;
    background:rgba(15,23,42,0.55);
    backdrop-filter:blur(8px);
    -webkit-backdrop-filter:blur(8px);
    display:flex;align-items:center;justify-content:center;
    padding:24px;
    animation: gate-fade-in .2s ease;
  `;

  overlay.innerHTML = `
    <style>
      @keyframes gate-fade-in { from{opacity:0} to{opacity:1} }
      @keyframes gate-slide-up { from{opacity:0;transform:translateY(24px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
      .gate-card {
        background:white;border-radius:24px;padding:40px 36px;max-width:420px;width:100%;text-align:center;
        box-shadow:0 32px 80px rgba(15,23,42,.22),0 8px 24px rgba(15,23,42,.10),0 0 0 1px rgba(255,255,255,.9) inset;
        position:relative;overflow:hidden;
        animation: gate-slide-up .3s cubic-bezier(0.34,1.2,0.64,1);
      }
      .gate-card::before {
        content:'';
        position:absolute;top:0;left:0;right:0;height:4px;
        background:linear-gradient(90deg,#5C35D4,#8B5CF6,#06B6D4);
      }
      .gate-orb {
        position:absolute;bottom:-60px;right:-60px;width:200px;height:200px;
        border-radius:50%;background:radial-gradient(circle,rgba(92,53,212,.08) 0%,transparent 70%);
        pointer-events:none;
      }
      .gate-icon {
        width:68px;height:68px;border-radius:18px;
        background:linear-gradient(135deg,#6B45E8,#8B5CF6);
        display:flex;align-items:center;justify-content:center;
        margin:0 auto 20px;
        box-shadow:0 10px 28px rgba(92,53,212,.36),inset 0 1px 0 rgba(255,255,255,.25);
      }
      .gate-title { font-size:1.35rem;font-weight:900;color:#0f172a;letter-spacing:-.4px;margin-bottom:8px; }
      .gate-sub { font-size:14px;color:#64748b;line-height:1.65;margin-bottom:28px; }
      .gate-btn {
        display:block;width:100%;padding:14px;border-radius:12px;border:none;cursor:pointer;
        font-size:15px;font-weight:800;transition:all .2s;
      }
      .gate-btn-primary {
        background:linear-gradient(135deg,#6B45E8 0%,#5C35D4 50%,#8B5CF6 100%);
        color:white;
        box-shadow:0 6px 20px rgba(92,53,212,.38),inset 0 1px 0 rgba(255,255,255,.2);
        margin-bottom:10px;
      }
      .gate-btn-primary:hover { transform:translateY(-2px);box-shadow:0 10px 28px rgba(92,53,212,.45); }
      .gate-btn-secondary {
        background:linear-gradient(160deg,#fff 0%,#f5f7fa 100%);
        color:#475569;border:1.5px solid #e2e8f0;
        box-shadow:0 2px 8px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,1);
      }
      .gate-btn-secondary:hover { box-shadow:0 4px 12px rgba(15,23,42,.10); }
      .gate-close { position:absolute;top:14px;right:14px;background:none;border:none;cursor:pointer;color:#94a3b8;font-size:18px;line-height:1;padding:6px;border-radius:8px; }
      .gate-close:hover { background:#f1f5f9;color:#0f172a; }
    </style>
    <div class="gate-card">
      <div class="gate-orb"></div>
      <button class="gate-close" onclick="document.getElementById('signin-gate-modal').remove()">✕</button>
      <div class="gate-icon">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
      <div class="gate-title">Sign in to continue</div>
      <div class="gate-sub">Create a free account to ${action}, track your progress, and get AI-powered learning paths.</div>
      <button class="gate-btn gate-btn-primary" onclick="window.location='login.html?tab=signup'">Create Free Account →</button>
      <button class="gate-btn gate-btn-secondary" onclick="window.location='login.html'">Already have an account? Sign in</button>
    </div>
  `;

  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

document.addEventListener('DOMContentLoaded', async () => {
  const searchEl = document.getElementById('explore-search');
  if (!searchEl) return; // Exit if not on the explore page

  // Public page — no auth required to browse
  renderGrid();
  animateUp();
  searchEl.addEventListener('input', renderGrid);

  // If authenticated, sync with backend
  if (isAuthed()) {
    try {
      const res = await api.roadmaps.list();
      (res.roadmaps || []).forEach(r => {
        if (r.data?.is_saved || r.is_saved) savedTitles.add(r.goal_title);
      });
      saveSavedTitles(savedTitles);
      renderGrid();
    } catch(e) {}
  }
});


window.switchTab = function(tab) {
  currentTab = tab;
  document.getElementById('tab-role').classList.toggle('active', tab === 'role');
  document.getElementById('tab-skill').classList.toggle('active', tab === 'skill');
  renderGrid();
};

function renderGrid() {
  const q = document.getElementById('explore-search').value.trim().toLowerCase();
  const list = currentTab === 'role' ? ROLE_ROADMAPS : SKILL_ROADMAPS;
  const filtered = q ? list.filter(r => r.title.toLowerCase().includes(q)) : list;
  
  // Update visible count (if the element exists)
  const visibleCountEl = document.getElementById('visible-count');
  if (visibleCountEl) visibleCountEl.textContent = filtered.length;

  const grid = document.getElementById('roadmap-grid');
  if (!filtered.length) {
    grid.innerHTML = `<div id="no-results" style="grid-column:1/-1; text-align:center; padding:40px;"><div class="text-base font-bold">No results</div><div class="text-sm text-muted mt-1">Try a different search</div></div>`;
    return;
  }

  grid.innerHTML = filtered.map(rm => {
    const saved = savedTitles.has(rm.title);
    const fill = saved ? 'var(--primary)' : 'none';
    const stroke = saved ? 'var(--primary)' : 'rgba(100, 116, 139, 0.45)';
    
    return `
      <div class="rm-grid-card ${saved?'saved':''}" onclick="openRoadmap('${encodeURIComponent(rm.title)}')">
        <span class="title">${rm.title}</span>
        <div class="card-actions">
          ${rm.isNew ? `<div class="new-badge"><span class="new-dot"></span><span>New</span></div>` : ''}
          <button class="bookmark-btn ${saved?'saved':''}" onclick="saveRoadmap(event,'${encodeURIComponent(rm.title)}',this)" title="${saved?'Remove from saved':'Save to My Learning'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2.5" style="transition:all .2s;">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>
      </div>`;
  }).join('') + `
    <div style="grid-column:1/-1; margin-top: 8px;">
      <button class="create-own-btn" onclick="window.location='companion.html'">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Create your own Roadmap
      </button>
    </div>`;
}

window.openRoadmap = function(encodedTitle) {
  // Gate: require sign-in to open a roadmap
  if (!isAuthed()) {
    showSignInGate('open and track this roadmap');
    return;
  }
  const title = decodeURIComponent(encodedTitle);
  let data = ROADMAPS_DATA[title];
  if (!data) {
    // Generate Android-style default roadmap fallback
    data = {
      diff: "Beginner", hrs: 10, desc: `A comprehensive exploration of ${title}.`,
      mods: [
        {t: `Getting Started with ${title}`, tps: [`Introduction to ${title}`, "History and Evolution", "Core Paradigms", "Setting up the Environment", "Your First Program", "Community & Resources"]},
        {t: "Core Fundamentals", tps: ["Variables and Types", "Control Flow", "Functions and Methods", "Data Structures", "Error Handling", "I/O Operations"]},
        {t: "Intermediate Concepts", tps: ["Object-Oriented Design", "Functional Concepts", "Concurrency Basics", "Memory Management", "Performance Considerations", "Design Patterns"]},
        {t: "Ecosystem & Tooling", tps: ["Package Managers", "Build Tools", "Testing Frameworks", "Debugging Techniques", "Code Quality Tools", "Deployment Strategies"]},
        {t: "Advanced Topics", tps: ["Scalability Patterns", "Security Best Practices", "Integration Patterns", "Microservice Architecture", "Performance Profiling", "Advanced Debugging"]},
        {t: "Real-World Projects", tps: ["Building a REST API", "Database Integration", "Authentication System", "Deployment Pipeline", "Monitoring & Logging", "Documentation"]}
      ]
    };
  }
  // Build roadmap object and store in cache
  const id = 'static_' + title.replace(/\s+/g,'_').toLowerCase();
  const rm = {
    id, goal_title: title,
    description: data.desc,
    difficulty: data.diff,
    hours_per_week: data.hrs,
    is_static: true,
    modules: data.mods.map((m, mi) => ({
      id: `m${mi}`, title: m.t, order: mi,
      topics: m.tps.map((tp, ti) => {
        const isObj = typeof tp === 'object';
        const title = isObj ? tp.t : tp;
        return {
          id: `${id}_${title.replace(/ /g, '_').toLowerCase()}`, 
          title: title,
          description: isObj ? (tp.d || `Learn ${title} as part of ${m.t}`) : `Learn ${title} as part of ${m.t}`,
          key_concepts: isObj ? (tp.k || '') : '',
          duration: isObj ? (tp.dur || '') : '',
          resources: [], order: ti, is_done: false
        };
      })
    }))
  };
  let cache = getRoadmapsCache();
  cache = cache.filter(c => c.id !== id);
  cache.unshift({ id, goal_title: title, data: rm });
  saveRoadmapsCache(cache);
  window.location.href = `roadmap.html?id=${id}`;
};

window.saveRoadmap = async function(e, encodedTitle, btn) {
  e.stopPropagation();
  // Gate: require sign-in to save
  if (!isAuthed()) {
    showSignInGate('save roadmaps to My Learning');
    return;
  }
  const title = decodeURIComponent(encodedTitle);
  const isCurrentlySaved = savedTitles.has(title);

  if (isCurrentlySaved) {
    // Unsave — animate out (shrink then fill none)
    const svg = btn.querySelector('svg');
    btn.style.transform = 'scale(0.7)'; setTimeout(()=> btn.style.transform='', 200);
    savedTitles.delete(title);
    btn.classList.remove('saved');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    btn.style.color = '';
    btn.title = 'Save to My Learning';
    saveSavedTitles(savedTitles);
    showToast('Removed from My Learning', '');
    const id = 'static_' + title.replace(/\s+/g, '_').toLowerCase();
    let cache = getRoadmapsCache();
    cache = cache.filter(c => c.id !== id);
    saveRoadmapsCache(cache);
    return;
  }

  // Save — Optimistic UI with scale animation
  const svg = btn.querySelector('svg');
  btn.style.transition = 'transform .2s cubic-bezier(.34,1.56,.64,1)';
  btn.style.transform = 'scale(1.4)'; setTimeout(() => btn.style.transform = 'scale(1)', 200);
  savedTitles.add(title);
  btn.classList.add('saved');
  svg.setAttribute('fill', '#7C3AED');
  svg.setAttribute('stroke', '#7C3AED');
  btn.style.color = '#7C3AED';
  btn.title = 'Remove from My Learning';
  saveSavedTitles(savedTitles);
  showToast('⭐ Saving...', '');
  // Remove toast early — will show success toast after API callroadmap object — use ROADMAPS_DATA if available, otherwise build a minimal stub
  const id = 'static_' + title.replace(/\s+/g, '_').toLowerCase();
  const data = ROADMAPS_DATA[title];
  const rm = data
    ? {
        id, goal_title: title,
        description: data.desc,
        difficulty: data.diff,
        hours_per_week: data.hrs,
        is_static: true, is_saved: true, source: 'Curated Path',
        modules: data.mods.map((m, mi) => ({
          id: `m${mi}`, title: m.t, order: mi,
          topics: m.tps.map((tp, ti) => {
            const isObj = typeof tp === 'object';
            const title = isObj ? tp.t : tp;
            return {
              id: `${id}_${title.replace(/ /g, '_').toLowerCase()}`, 
              title: title,
              description: isObj ? (tp.d || `Learn ${title} as part of ${m.t}`) : `Learn ${title} as part of ${m.t}`,
              key_concepts: isObj ? (tp.k || '') : '',
              duration: isObj ? (tp.dur || '') : '',
              resources: [], order: ti, is_done: false
            };
          })
        }))
      }
    : {
        // Stub for titles without detailed data yet
        id, goal_title: title,
        description: `${title} learning roadmap`,
        difficulty: 'Beginner', hours_per_week: 10,
        is_static: true, is_saved: true, source: 'Curated Path',
        modules: []
      };

  let cache = getRoadmapsCache();
  cache = cache.filter(c => c.id !== id);
  cache.unshift({ id, goal_title: title, data: rm });
  saveRoadmapsCache(cache);

  // Save to backend (always — so it syncs to My Learning on all devices)
  try {
    const result = await api.roadmaps.saveOffline(rm);
    console.log('Explore save successful:', result);
    // On success, the backend returns the roadmap with a real numeric ID.
    // We should keep the title in savedTitles so the icon stays filled.
    showToast('✅ Saved to My Learning!', 'success');
    // No need to call renderGrid here, as the optimistic update already handled the UI.
    // If there were any server-side specific changes to display, then renderGrid would be useful.
  } catch(err) {
    console.error('Explore save failed:', err);
    showToast('Saved locally to My Learning!', 'success');
  }
};
