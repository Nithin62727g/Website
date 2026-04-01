// Dashboard Logic

// ── Dashboard Entry ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth()) return;

  const listEl = document.getElementById('learning-list');
  const user = getUser();

  // Optimistic UI for header
  if (user) {
    document.getElementById('user-greeting').textContent = `Hi, ${user.name.split(' ')[0]} 👋`;
    document.getElementById('user-xp').textContent = `${user.xp || 0} XP`;
    document.getElementById('user-level-badge').textContent = xpToLevel(user.xp || 0);
    const statXp = document.getElementById('stat-xp');
    const statLevel = document.getElementById('stat-level');
    if (statXp) statXp.textContent = user.xp || 0;
    if (statLevel) statLevel.textContent = xpToLevel(user.xp || 0);
  }

  try {
    // Refresh user data from backend
    const remoteUser = await api.auth.me();
    saveUser(remoteUser);
    const xp = remoteUser.xp || 0;
    const level = xpToLevel(xp);
    document.getElementById('user-greeting').textContent = `Hi, ${remoteUser.name.split(' ')[0]} 👋`;
    document.getElementById('user-xp').textContent = `${xp} XP`;
    document.getElementById('user-level-badge').textContent = level;
    const statXp = document.getElementById('stat-xp');
    const statLevel = document.getElementById('stat-level');
    if (statXp) statXp.textContent = xp;
    if (statLevel) statLevel.textContent = level;

    // XP ring level labels
    const xpLvl = document.getElementById('xp-ring-level');
    const xpNum = document.getElementById('xp-ring-num');
    const xpEnd = document.getElementById('xp-ring-toend');
    if (xpLvl) xpLvl.textContent = level;
    if (xpNum) xpNum.textContent = xp;
    if (xpEnd) xpEnd.textContent = (level * 100) - xp;

    // ── Fetch roadmaps from backend ─────────────────────────────
    let apiRoadmaps = [];
    try {
      const res = await api.roadmaps.list();
      apiRoadmaps = res.roadmaps || [];
      let cache = getRoadmapsCache();
      apiRoadmaps.forEach(r => {
        cache = cache.filter(c => c.id !== r.id);
        cache.push(r);
      });
      saveRoadmapsCache(cache);
    } catch (e) {}

    // ── Build combined list ──────────────────────────────────────
    const apiSaved = apiRoadmaps;
    const savedTitles = getSavedTitles();
    const localCache = getRoadmapsCache();
    const localSaved = localCache.filter(r =>
      r.data?.is_saved || savedTitles.has(r.goal_title)
    );

    const seenIds = new Set(apiSaved.map(r => r.id));
    const extras = localSaved.filter(r => !seenIds.has(r.id));
    const allSaved = [...apiSaved, ...extras];

    const statRoadmaps = document.getElementById('stat-roadmaps');
    if (statRoadmaps) statRoadmaps.textContent = allSaved.length;

    // ── Render ──────────────────────────────────────────────────
    if (allSaved.length === 0) {
      listEl.innerHTML = `
        <div class="card-white" onclick="window.location='explore.html'" style="text-align:center;padding:36px 20px;cursor:pointer;border:1.5px dashed var(--card-border);">
          <div style="width:52px;height:52px;background:var(--primary-light);border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <div class="font-bold" style="margin-bottom:6px;letter-spacing:-0.2px;">No learning paths yet</div>
          <div class="text-sm text-muted" style="margin-bottom:16px;line-height:1.5;">Bookmark paths from Explore or generate a personalized one with AI.</div>
          <span class="btn btn-primary" style="display:inline-flex;padding:10px 20px;font-size:13px;border-radius:var(--radius-full);">Browse Learning Paths →</span>
        </div>`;
    } else {
      const completedIds = new Set(remoteUser.completed_topics || []);
      // Also merge local progress
      try {
        const local = JSON.parse(localStorage.getItem(userKey('completed_topics')) || '[]');
        local.forEach(id => completedIds.add(id));
      } catch(e) {}

      listEl.innerHTML = allSaved.map(r => {
        const data = r.data || r;
        const modules = data.modules || [];
        let totalTopics = 0;
        let doneTopics = 0;

        modules.forEach(m => {
          (m.topics || []).forEach(t => {
            totalTopics++;
            // Use the topic's own ID if it exists (repaired by getRoadmapsCache/backend), 
            // otherwise fallback to a slugified version to ensure matches.
            const topicId = t.id || `${r.id}_${slugify(t.title)}`;
            if (completedIds.has(topicId)) doneTopics++;
          });
        });

        const pct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;
        const isStatic = data.is_static || r.id?.startsWith('static_');
        const rawSource = data.source || (isStatic ? 'Curated Path' : 'AI Generated');
        const source = rawSource.toUpperCase();
        const topicsLabel = totalTopics > 0 ? `${pct}% · ${totalTopics} topics` : 'Tap to start';

        return `
          <div class="roadmap-card" style="position:relative;" onclick="openRoadmap('${r.id}')">
            <button onclick="event.stopPropagation(); deleteRoadmap('${r.id}')" style="position:absolute; top:12px; right:12px; background:transparent; border:none; color:var(--on-surface-var); cursor:pointer; padding:4px; opacity:0.6; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'; this.style.color='var(--error)';" onmouseout="this.style.opacity='0.6'; this.style.color='var(--on-surface-var)';" title="Delete Roadmap">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
            <div class="roadmap-icon-box" style="background:var(--primary-light);color:var(--primary);">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
            </div>
            <div class="roadmap-meta">
              <h3 class="roadmap-title">${r.goal_title}</h3>
              <div class="roadmap-source">${source}</div>
              <div class="roadmap-progress-row">
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${pct}%"></div>
                </div>
                <span class="text-xs font-bold text-muted">${topicsLabel}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

  } catch (err) {
    if (err.status === 401) logout();
    else {
      const savedTitles = getSavedTitles();
      const localCache = getRoadmapsCache();
      const localSaved = localCache.filter(r =>
        r.data?.is_saved || savedTitles.has(r.goal_title)
      );

      if (localSaved.length > 0) {
        const statRoadmaps = document.getElementById('stat-roadmaps');
        if (statRoadmaps) statRoadmaps.textContent = localSaved.length;
        listEl.innerHTML = localSaved.map(r => {
          const data = r.data || r;
          return `
            <div class="roadmap-card" style="position:relative;" onclick="openRoadmap('${r.id}')">
              <button onclick="event.stopPropagation(); deleteRoadmap('${r.id}')" style="position:absolute; top:12px; right:12px; background:transparent; border:none; color:var(--on-surface-var); cursor:pointer; padding:4px; opacity:0.6; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'; this.style.color='var(--error)';" onmouseout="this.style.opacity='0.6'; this.style.color='var(--on-surface-var)';" title="Delete Roadmap">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
              <div class="roadmap-icon-box" style="background:var(--primary-light);color:var(--primary);">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
              </div>
              <div class="roadmap-meta">
                <h3 class="roadmap-title">${r.goal_title}</h3>
                <div class="roadmap-source">${((data.source || 'Curated Path').toUpperCase())}</div>
                <div class="roadmap-progress-row">
                  <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
                  <span class="text-xs font-bold text-muted">Offline</span>
                </div>
              </div>
            </div>`;
        }).join('');
      } else {
        listEl.innerHTML = `<div class="card"><p class="text-error text-center text-sm">Failed to load learning paths</p></div>`;
      }
    }
  }
});

window.openRoadmap = function(id) {
  window.location.href = `roadmap.html?id=${id}`;
};

window.deleteRoadmap = async function(id) {
  if (!confirm("Are you sure you want to delete this roadmap?")) return;
  
  try {
    let cache = getRoadmapsCache();
    let toDelete = cache.find(c => c.id === id);
    let titleToRemove = toDelete ? toDelete.goal_title : null;

    if (id.startsWith('static_') || id.startsWith('fallback_')) {
      // Local removal
      cache = cache.filter(c => c.id !== id);
      saveRoadmapsCache(cache);
      
      if (titleToRemove) {
        let saved = getSavedTitles();
        saved.delete(titleToRemove);
        saveSavedTitles(saved);
      }
    } else {
      // API removal
      await api.roadmaps.delete(id);
      
      // Update local cache if present
      cache = cache.filter(c => c.id !== id);
      saveRoadmapsCache(cache);

      if (titleToRemove) {
        let saved = getSavedTitles();
        saved.delete(titleToRemove);
        saveSavedTitles(saved);
      }
    }
    
    showToast("Roadmap deleted safely", "success");
    setTimeout(() => window.location.reload(), 1000);
  } catch (err) {
    showToast(err.message || "Failed to delete roadmap", "error");
  }
};
