// Careers Logic

const HOT_JOBS = [
  {title:"ML Engineer", category:"AI & Data", salary:"$130K–$200K", emoji:"🤖", demand:"Hot", skills:["Python","PyTorch","MLOps","LLMs"], companies:["Google","OpenAI","Meta"]},
  {title:"Software Engineer", category:"Engineering", salary:"$110K–$180K", emoji:"💻", demand:"Trending", skills:["Kotlin","Python","System Design"], companies:["FAANG","Startups","Fintech"]},
  {title:"Data Scientist", category:"AI & Data", salary:"$120K–$190K", emoji:"📊", demand:"Hot", skills:["Python","SQL","Statistics","ML"], companies:["Netflix","Spotify","Airbnb"]},
  {title:"DevOps Engineer", category:"Infrastructure", salary:"$120K–$185K", emoji:"⚙️", demand:"Trending", skills:["Kubernetes","Terraform","AWS","CI/CD"], companies:["AWS","Cloudflare","Stripe"]},
  {title:"Frontend Developer", category:"Web", salary:"$95K–$160K", emoji:"🎨", demand:"Growing", skills:["React","TypeScript","CSS","Next.js"], companies:["Figma","Vercel","Shopify"]},
  {title:"Backend Engineer", category:"Web", salary:"$110K–$175K", emoji:"🔧", demand:"Trending", skills:["Node.js","Go","PostgreSQL","Redis"], companies:["Stripe","Twilio","Plaid"]},
  {title:"Cloud Architect", category:"Infrastructure", salary:"$150K–$220K", emoji:"☁️", demand:"Hot", skills:["AWS","GCP","Architecture","Security"], companies:["AWS","Microsoft","Google"]},
  {title:"Mobile Developer", category:"Mobile", salary:"$105K–$170K", emoji:"📱", demand:"Growing", skills:["Kotlin","Swift","Compose","SwiftUI"], companies:["Uber","Lyft","DoorDash"]},
  {title:"Security Engineer", category:"Security", salary:"$130K–$200K", emoji:"🔐", demand:"Hot", skills:["Pentesting","Cryptography","Network"], companies:["CrowdStrike","Palo Alto","Okta"]},
  {title:"Product Manager", category:"Product", salary:"$120K–$195K", emoji:"📋", demand:"Trending", skills:["Roadmaps","User Research","Analytics"], companies:["Google","Atlassian","HubSpot"]},
  {title:"Blockchain Dev", category:"Web3", salary:"$130K–$210K", emoji:"⛓️", demand:"Growing", skills:["Solidity","Rust","DeFi","Contracts"], companies:["Coinbase","Binance","Chainlink"]},
  {title:"Prompt Engineer", category:"AI & Data", salary:"$110K–$180K", emoji:"✨", demand:"Hot", skills:["LLMs","Prompt Design","RAG","Python"], companies:["OpenAI","Anthropic","Cohere"]}
];

const DEMAND_COLORS = {
  "Hot": "var(--neon-pink)",
  "Trending": "var(--primary)",
  "Growing": "var(--success)"
};

document.addEventListener('DOMContentLoaded', () => {
  if (!requireAuth()) return;
  // Nav is handled in HTML/sidebar-container

  renderHotJobs();
  renderList('All');

  // Category filter clicks
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderList(chip.dataset.cat);
    });
  });
});

function getDemandBadge(demand) {
  const c = DEMAND_COLORS[demand];
  return `<div class="badge" style="background:${c}1f;color:${c}">${demand}</div>`;
}

function renderHotJobs() {
  const row = document.getElementById('hot-jobs-row');
  row.innerHTML = HOT_JOBS.slice(0, 6).map(j => `
    <div class="job-h-card" onclick="openInsights('${j.title}')">
      <div class="flex justify-between items-center w-full">
        <span style="font-size:32px">${j.emoji}</span>
        ${getDemandBadge(j.demand)}
      </div>
      <div class="mt-2">
        <h3 class="text-base font-extrabold text-on-bg" style="line-height:1.2">${j.title}</h3>
        <p class="text-xs text-muted mt-1">${j.category}</p>
      </div>
      <div class="mt-2" style="display:flex;flex-direction:column;gap:4px">
        <span class="text-sm font-bold text-success">${j.salary}</span>
        <div class="flex gap-2">
          ${j.skills.slice(0,2).map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderList(category) {
  const list = document.getElementById('jobs-list');
  const filtered = category === 'All' ? HOT_JOBS : HOT_JOBS.filter(j => j.category === category);
  
  list.innerHTML = filtered.map(j => `
    <div class="job-detail-card animate-up visible" onclick="openInsights('${j.title}')">
      <div class="flex justify-between items-start w-full">
        <div class="flex items-center gap-3">
          <span style="font-size:28px">${j.emoji}</span>
          <div>
            <h3 class="text-base font-extrabold text-on-bg">${j.title}</h3>
            <p class="text-xs text-muted">${j.category}</p>
          </div>
        </div>
        ${getDemandBadge(j.demand)}
      </div>
      
      <div class="flex justify-between items-center mt-3">
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold text-success">${j.salary}</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-muted">
          ${icon('briefcase', 14)} <span class="truncate" style="max-width:120px">${j.companies.join(', ')}</span>
        </div>
      </div>

      <div class="flex gap-2 mt-3">
        ${j.skills.map(s => `<span class="skill-tag bg-surface">${s}</span>`).join('')}
      </div>

      <div class="flex items-center mt-3">
        <div class="avatar-strip">
          <div class="avatar-circle">👨‍💻</div>
          <div class="avatar-circle">👩‍🔬</div>
          <div class="avatar-circle">🧑‍💻</div>
        </div>
        <span class="text-xs text-muted ml-3">10K+ professionals working in this role</span>
      </div>
    </div>
  `).join('');
}

window.openInsights = async function(roleName) {
  const modal = document.getElementById('modal-insights');
  document.getElementById('mi-role').textContent = roleName;
  
  const miContent = document.getElementById('mi-content');
  const miLoading = document.getElementById('mi-loading');
  
  miContent.classList.add('hidden');
  miLoading.classList.remove('hidden');
  modal.classList.add('open');

  try {
    const res = await api.career.insights(roleName);
    
    document.getElementById('mi-junior').textContent = res.salary_ranges?.junior || 'N/A';
    document.getElementById('mi-senior').textContent = res.salary_ranges?.senior || 'N/A';
    
    const skillsCont = document.getElementById('mi-skills');
    skillsCont.innerHTML = (res.top_skills || []).map(s => {
      const pct = Math.round((s.demand || 0) * 100);
      return `
        <div class="flex items-center justify-between text-sm">
          <span class="font-semibold text-on-bg">${s.skill || 'Skill'}</span>
          <span class="font-bold text-primary">${pct}% demand</span>
        </div>
        <div class="progress-bar mb-1"><div class="progress-fill" style="width:${pct}%"></div></div>
      `;
    }).join('');
    
    miLoading.classList.add('hidden');
    miContent.classList.remove('hidden');
    miContent.classList.add('animate-up', 'visible');
  } catch (err) {
    showToast(err.message, 'error');
    modal.classList.remove('open');
  }
}
