

// AI Companion Logic — 3-tab desktop design (MENTOR, GENERATE, QUIZZES)

const QUIZ_DOMAINS = [
    // Image 1 Left Column
    { name: "React Native", emoji: "📱" },
    { name: "Prompt Engineering", emoji: "🗣️" },
    { name: "Linux", emoji: "🐧" },
    { name: "Docker", emoji: "🐳" },
    { name: "Terraform", emoji: "🏗️" },
    { name: "Redis", emoji: "⚡" },
    { name: "PHP", emoji: "🐘" },
    { name: "AI Red Teaming", emoji: "🛡️" },
    { name: "Next.js", emoji: "▲" },
    { name: "Kotlin", emoji: "🎯" },
    { name: "CSS", emoji: "🎨" },
    { name: "Shell / Bash", emoji: "🐚" },
    { name: "Elasticsearch", emoji: "🔍" },
    { name: "Django", emoji: "🎸" },
    { name: "Ruby on Rails", emoji: "🛤️" },
    { name: "Vibe Coding", emoji: "✨" },

    // Image 1 Right Column
    { name: "Design System", emoji: "📐" },
    { name: "MongoDB", emoji: "🍃" },
    { name: "Kubernetes", emoji: "☸️" },
    { name: "AWS", emoji: "☁️" },
    { name: "Data Structures & Algorithms", emoji: "🌲" },
    { name: "Git and GitHub", emoji: "🐙" },
    { name: "Cloudflare", emoji: "🌩️" },
    { name: "AI Agents", emoji: "🤖" },
    { name: "Code Review", emoji: "👀" },
    { name: "HTML", emoji: "🌐" },
    { name: "Swift & Swift UI", emoji: "🦅" },
    { name: "Laravel", emoji: "🔥" },
    { name: "WordPress", emoji: "📝" },
    { name: "Ruby", emoji: "💎" },
    { name: "Claude Code", emoji: "🧠" },

    // Skill-based Roadmaps
    { name: "SQL", emoji: "🗄️" },
    { name: "React", emoji: "⚛️" },
    { name: "Angular", emoji: "🅰️" },
    { name: "TypeScript", emoji: "🔷" },
    { name: "Python", emoji: "🐍" },
    { name: "Java", emoji: "☕" },
    { name: "API Design", emoji: "🔌" },
    { name: "Flutter", emoji: "🦋" },
    { name: "Rust", emoji: "🦀" },
    { name: "Design and Architecture", emoji: "🏗️" },
    { name: "Computer Science", emoji: "💻" },
    { name: "Vue", emoji: "🟩" },
    { name: "JavaScript", emoji: "🟨" },
    { name: "Node.js", emoji: "🟢" },
    { name: "System Design", emoji: "⚙️" },
    { name: "ASP.NET Core", emoji: "🟣" },
    { name: "Spring Boot", emoji: "🌱" },
    { name: "C++", emoji: "➕" },
    { name: "Go Roadmap", emoji: "🐹" },
    { name: "GraphQL", emoji: "🔗" },

    // Role-based Roadmaps
    { name: "Frontend", emoji: "🖥️" },
    { name: "Backend", emoji: "⚙️" },
    { name: "Web Dev", emoji: "🌍" },
    { name: "DevOps", emoji: "🔄" },
    { name: "DevSecOps", emoji: "🔐" },
    { name: "Data Analyst", emoji: "📊" },
    { name: "AI/ML", emoji: "🧬" },
    { name: "AI and Data Scientist", emoji: "🔬" },
    { name: "Data Engineer", emoji: "🛠️" },
    { name: "Android Dev", emoji: "🤖" },
    { name: "Machine Learning", emoji: "🧠" },
    { name: "PostgreSQL", emoji: "🐘" },
    { name: "iOS", emoji: "🍎" },
    { name: "Blockchain", emoji: "⛓️" },
    { name: "QA", emoji: "✅" },
    { name: "Software Architect", emoji: "📐" },
    { name: "Cyber Security", emoji: "🔒" },
    { name: "UX Design", emoji: "🎨" },
    { name: "Technical Writer", emoji: "✍️" },
    { name: "Game Developer", emoji: "🎮" },
    { name: "Server Side Game Developer", emoji: "🖥️" },
    { name: "MLOps", emoji: "⚙️" },
    { name: "Product Manager", emoji: "📋" },
    { name: "Engineering Manager", emoji: "👔" },
    { name: "Developer Relations", emoji: "🤝" },
    { name: "BI Analyst", emoji: "📈" }
];

const QUIZ_DIFFICULTIES = [
    { level: "Beginner",     emoji: "🌱", sub: "CORE FUNDAMENTALS" },
    { level: "Intermediate", emoji: "⚡", sub: "APPLIED PATTERNS" },
    { level: "Advanced",     emoji: "🔥", sub: "EXPERT ARCHITECTURE" },
];

document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) return;

    // Check for ?tab param (e.g. from Explore's CTA)
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') || 'mentor';
    switchCompanionTab(tab);

    // Domains grid
    renderDomains();

    // Chat form
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = document.getElementById('chat-input');
            const msg = input.value.trim();
            if (!msg) return;
            input.value = '';
            appendChatBubble(msg, true);
            const send = document.getElementById('chat-send');
            setLoading(send, true);
            try {
                const res = await api.mentor.chat(msg);
                appendChatBubble(res.reply || res.message || 'Sorry, I could not process your request.', false);
            } catch (err) {
                appendChatBubble('Error: ' + err.message, false);
            } finally {
                setLoading(send, false);
            }
        });
    }

    // Generate form
    const genBtn = document.getElementById('gen-btn');
    if (genBtn) {
        genBtn.addEventListener('click', handleGenerate);
    }

    animateUp();
});

// ── Tab switching ──────────────────────────────────────────────────────────────

window.switchCompanionTab = function(tab) {
    ['mentor', 'generate', 'quiz'].forEach(t => {
        document.getElementById(`panel-${t}`)?.classList.toggle('active', t === tab);
        document.getElementById(`ctab-${t}`)?.classList.toggle('active', t === tab);
    });
};

window.selectIntensity = function(btn) {
    document.querySelectorAll('.intensity-chip').forEach(el => el.classList.remove('selected'));
    btn.classList.add('selected');
};

// ── Lightweight Markdown → HTML renderer ──────────────────────────────────────

function parseMarkdown(text) {
    // Escape HTML entities first to avoid XSS
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Fenced code blocks ```...```
    html = html.replace(/```([\s\S]*?)```/g, (_, code) =>
        `<pre style="background:rgba(92,53,212,0.06);border:1px solid var(--card-border);border-radius:8px;padding:12px 14px;overflow-x:auto;font-size:13px;line-height:1.6;margin:10px 0;"><code style="font-family:'Courier New',monospace;white-space:pre;">${code.trim()}</code></pre>`
    );

    // Inline code `...`
    html = html.replace(/`([^`]+)`/g,
        `<code style="background:rgba(92,53,212,0.08);border:1px solid var(--card-border);border-radius:4px;padding:2px 6px;font-size:0.88em;font-family:'Courier New',monospace;">$1</code>`
    );

    // Bold + italic ***text***
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    // Bold **text**
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*  (single, not part of a word)
    html = html.replace(/(?<!\w)\*(?!\s)(.+?)(?<!\s)\*(?!\w)/g, '<em>$1</em>');

    // Numbered list lines: "1. ...", "2. ..." etc.
    // Process line by line
    const lines = html.split('\n');
    const processed = [];
    let inOl = false, inUl = false;

    for (const line of lines) {
        const olMatch = line.match(/^(\d+)\.\s+(.+)/);
        const ulMatch = line.match(/^[-•]\s+(.+)/);

        if (olMatch) {
            if (!inOl) { processed.push('<ol style="padding-left:22px;margin:8px 0;line-height:1.7;">'); inOl = true; }
            if (inUl) { processed.push('</ul>'); inUl = false; }
            processed.push(`<li>${olMatch[2]}</li>`);
        } else if (ulMatch) {
            if (!inUl) { processed.push('<ul style="padding-left:22px;margin:8px 0;line-height:1.7;">'); inUl = true; }
            if (inOl) { processed.push('</ol>'); inOl = false; }
            processed.push(`<li>${ulMatch[1]}</li>`);
        } else {
            if (inOl) { processed.push('</ol>'); inOl = false; }
            if (inUl) { processed.push('</ul>'); inUl = false; }
            processed.push(line.trim() === '' ? '<br>' : line + '<br>');
        }
    }
    if (inOl) processed.push('</ol>');
    if (inUl) processed.push('</ul>');

    return processed.join('');
}

// ── AI Mentor Chat ────────────────────────────────────────────────────────────

function appendChatBubble(text, isUser) {
    const messages = document.getElementById('chat-messages');
    const container = messages.querySelector('.chat-bubbles') || messages;

    const div = document.createElement('div');
    div.className = `chat-bubble ${isUser ? 'user' : 'assistant'}`;

    if (isUser) {
        div.textContent = text;
    } else {
        // Render markdown for AI responses
        div.innerHTML = parseMarkdown(text);
        // Style links inside AI messages
        div.querySelectorAll('a').forEach(a => {
            a.style.color = 'var(--primary)';
            a.style.fontWeight = '600';
        });
    }

    container.appendChild(div);

    // Smooth scroll to bottom
    setTimeout(() => {
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
    }, 60);
}

// ── Generate Roadmap ──────────────────────────────────────────────────────────

async function handleGenerate() {
    const topic = document.getElementById('gen-topic').value.trim();
    const hours = parseInt(document.getElementById('gen-hours').value) || 10;
    const intensity = document.querySelector('.intensity-chip.selected')?.dataset?.level || 'Beginner';

    if (!topic) { showToast('Please enter a target topic', 'error'); return; }

    const btn = document.getElementById('gen-btn');
    setLoading(btn, true, 'INITIALIZING...');

    try {
        const rm = await api.roadmaps.generate(topic, intensity, hours);

        // Cache
        let cache = getRoadmapsCache();
        cache.unshift({ id: rm.id, goal_title: rm.goal_title, data: rm });
        saveRoadmapsCache(cache);

        showToast('✅ Roadmap saved to My Learning!', 'success');

        setTimeout(() => {
            window.location.href = `roadmap.html?id=${rm.id}`;
        }, 500);
    } catch (err) {
        showToast(err.message || 'Generation failed', 'error');
        setLoading(btn, false, 'Generate Roadmap ✦');
    }
}


// ── Quiz ──────────────────────────────────────────────────────────────────────

let _selectedDomain = null;
let _quizData = [];
let _quizIndex = 0;
let _quizScore = 0;

function renderDomains() {
    const grid = document.getElementById('quiz-domain-grid');
    if (!grid) return;
    grid.innerHTML = QUIZ_DOMAINS.map(d => `
        <div class="domain-card" onclick="selectDomain('${encodeURIComponent(d.name)}', '${d.emoji}')">
            <span class="emoji">${d.emoji}</span>
            <span class="name">${d.name}</span>
        </div>
    `).join('');
}

window.selectDomain = function(encodedName, emoji) {
    _selectedDomain = { name: decodeURIComponent(encodedName), emoji };
    document.getElementById('sel-domain-emoji').textContent = emoji;
    document.getElementById('sel-domain-name').textContent = decodeURIComponent(encodedName).toUpperCase();
    document.getElementById('quiz-domain-view').classList.add('hidden');
    document.getElementById('quiz-difficulty-view').classList.remove('hidden');

    document.getElementById('difficulty-options').innerHTML = QUIZ_DIFFICULTIES.map(d => `
        <div class="difficulty-card" onclick="startQuiz('${d.level}')">
            <span class="emoji">${d.emoji}</span>
            <div class="info">
                <div class="level">${d.level}</div>
                <div class="sub">${d.sub}</div>
            </div>
        </div>
    `).join('');
};

window.backToDomains = function() {
    document.getElementById('quiz-domain-view').classList.remove('hidden');
    document.getElementById('quiz-difficulty-view').classList.add('hidden');
};

window.startQuiz = async function(difficulty) {
    if (!_selectedDomain) return;

    // Show loading state for AI generation
    const setupCard = document.getElementById('quiz-setup');
    const orgOpacity = setupCard.style.opacity;
    const orgEvents = setupCard.style.pointerEvents;
    
    setupCard.style.opacity = '0.5';
    setupCard.style.pointerEvents = 'none';
    showToast(`Generating AI Quiz for ${_selectedDomain.name}... this takes a few seconds.`, 'info');

    // Extract precise curriculum from roadmaps-data.js if available
    let curriculum = [];
    if (typeof window.ROADMAPS_DATA !== 'undefined' && window.ROADMAPS_DATA[_selectedDomain.name]) {
        curriculum = window.ROADMAPS_DATA[_selectedDomain.name].mods.map(mod => {
            const topics = mod.tps.map(tp => typeof tp === 'string' ? tp : tp.t).slice(0, 4);
            return `${mod.t} (${topics.join(', ')}...)`;
        });
    }

    try {
        const res = await api.quizzes.generate(_selectedDomain.name, difficulty, curriculum.length ? curriculum : null);
        
        if (!res || !res.questions || !res.questions.length) {
            throw new Error("No quiz data generated. Please try again.");
        }

        // Map `correct_index` from API to expected `correct_answer`
        _quizData = res.questions.map(q => ({
            question: q.question,
            options: q.options,
            correct_answer: q.correct_index,
            explanation: q.explanation
        }));

        _quizIndex = 0;
        _quizScore = 0;

        document.getElementById('quiz-setup').classList.add('hidden');
        document.getElementById('quiz-runner').classList.remove('hidden');
        document.getElementById('quiz-badge-topic').textContent = `${_selectedDomain.emoji} ${_selectedDomain.name}`;
        showQuestion();
    } catch (err) {
        console.warn('AI Quiz generation failed, falling back to static/curriculum quiz:', err);
        try {
            _quizData = window.getStaticQuiz(_selectedDomain.name, difficulty, curriculum);
            _quizIndex = 0;
            _quizScore = 0;
            document.getElementById('quiz-setup').classList.add('hidden');
            document.getElementById('quiz-runner').classList.remove('hidden');
            document.getElementById('quiz-badge-topic').textContent = `${_selectedDomain.emoji} ${_selectedDomain.name}`;
            showQuestion();
        } catch(fallbackErr) {
            showToast('Failed to load offline quiz.', 'error');
        }
    } finally {
        // Restore setup interactions in case of error
        setupCard.style.opacity = orgOpacity;
        setupCard.style.pointerEvents = orgEvents;
    }
};

let _quizAnswered = false;

function showQuestion() {
    _quizAnswered = false;
    const q = _quizData[_quizIndex];
    if (!q) return;

    document.getElementById('quiz-counter').textContent = `Q ${_quizIndex + 1} / ${_quizData.length}`;
    document.getElementById('quiz-score-header').textContent = `Score: ${_quizScore}`;

    const progressPct = ((_quizIndex + 1) / _quizData.length) * 100;
    document.getElementById('quiz-progress-bar').style.width = `${progressPct}%`;

    document.getElementById('quiz-question').textContent = q.question;
    document.getElementById('quiz-feedback').classList.add('hidden');

    const opts = document.getElementById('quiz-options-container');
    const letters = ['A', 'B', 'C', 'D'];

    opts.innerHTML = q.options.map((opt, i) => `
        <div class="quiz-option-card" onclick="answerQuiz(${i})" data-index="${i}" style="display:flex;align-items:center;padding:14px 16px;border:1.5px solid var(--card-border);border-radius:12px;cursor:pointer;background:var(--surface);transition:all 0.2s ease;gap:12px;">
            <div class="quiz-letter" style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;background:var(--card);border:1px solid var(--card-border);color:var(--on-surface-var);font-weight:700;font-size:12px;border-radius:8px;flex-shrink:0;">
                ${letters[i]}
            </div>
            <div style="flex:1;font-size:14px;color:var(--on-bg);line-height:1.4;">${opt}</div>
            <div class="quiz-icon" style="width:22px;height:22px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"></div>
        </div>
    `).join('');
}

window.answerQuiz = function(selectedIndex) {
    if (_quizAnswered) return;
    _quizAnswered = true;

    const q = _quizData[_quizIndex];
    const isCorrect = selectedIndex === q.correct_answer;
    if (isCorrect) _quizScore++;

    document.getElementById('quiz-score-header').textContent = `Score: ${_quizScore}`;

    document.querySelectorAll('.quiz-option-card').forEach((card, i) => {
        card.style.pointerEvents = 'none';
        const letter = card.querySelector('.quiz-letter');
        const icon = card.querySelector('.quiz-icon');

        if (i === q.correct_answer) {
            card.style.background = 'rgba(16,185,129,0.08)';
            card.style.borderColor = 'var(--success)';
            letter.style.background = 'rgba(16,185,129,0.15)';
            letter.style.color = 'var(--success)';
            letter.style.borderColor = 'var(--success)';
            icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else if (i === selectedIndex && !isCorrect) {
            card.style.background = 'rgba(239,68,68,0.08)';
            card.style.borderColor = 'var(--error)';
            letter.style.background = 'rgba(239,68,68,0.15)';
            letter.style.color = 'var(--error)';
            letter.style.borderColor = 'var(--error)';
            icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
        } else {
            card.style.opacity = '0.5';
        }
    });

    document.getElementById('quiz-explanation').textContent = q.explanation || (isCorrect ? 'Awesome job! You nailed it.' : 'Not quite right. Review the fundamentals!');
    document.getElementById('quiz-feedback').classList.remove('hidden');

    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.textContent = (_quizIndex + 1 < _quizData.length) ? "Next Question →" : "See Results 🎉";
    nextBtn.onclick = () => {
        _quizIndex++;
        if (_quizIndex >= _quizData.length) showResult();
        else showQuestion();
    };
};

async function showResult() {
    document.getElementById('quiz-runner').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');

    const pct = Math.round((_quizScore / _quizData.length) * 100);
    const passed = pct >= 60;

    document.getElementById('result-icon').textContent = passed ? '🎉' : '💪';
    document.getElementById('result-title').textContent = passed ? 'Well Done!' : 'Keep Practicing!';
    document.getElementById('result-topic').textContent = _selectedDomain.name;

    document.getElementById('result-score').textContent = `${_quizScore}/${_quizData.length}`;
    document.getElementById('result-accuracy').textContent = `${pct}%`;

    let xpEarned = _quizScore;
    let totalXp = 0;
    
    try {
        const res = await api.quizzes.submit(_selectedDomain.name, _quizScore, _quizData.length);
        xpEarned = res.xp_earned;
        totalXp = res.total_xp;
        
        const user = getUser();
        if (user) {
            user.xp = totalXp;
            saveUser(user);
        }
    } catch(e) {
        // Fallback for offline or errors
        const user = getUser();
        if (user) {
            user.xp = (user.xp || 0) + xpEarned;
            totalXp = user.xp;
            saveUser(user);
        }
    }

    document.getElementById('result-xp-earned').textContent = `+${xpEarned}`;
    document.getElementById('result-total-xp').textContent = `${totalXp} XP`;
}

window.resetQuiz = function() {
    _selectedDomain = null;
    _quizData = [];
    _quizIndex = 0;
    _quizScore = 0;
    document.getElementById('quiz-runner').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-setup').classList.remove('hidden');
    document.getElementById('quiz-domain-view').classList.remove('hidden');
    document.getElementById('quiz-difficulty-view').classList.add('hidden');
};
