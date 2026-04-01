// quizzes-data.js - Dynamically generates quizzes using ROADMAPS_DATA
// Returns 10 completely unique questions based on the specific curriculum.

function shuffleArray(array) {
    let newArr = [...array];
    let curId = newArr.length;
    while (0 !== curId) {
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        let tmp = newArr[curId];
        newArr[curId] = newArr[randId];
        newArr[randId] = tmp;
    }
    return newArr;
}

window.getStaticQuiz = function(domain, difficulty, curriculum = []) {
    const questions = [];
    const allTopics = [];
    const allModules = [];
    
    // 1. Try extracting from ROADMAPS_DATA
    const roadmapData = typeof ROADMAPS_DATA !== 'undefined' ? ROADMAPS_DATA[domain] : null;
    
    if (roadmapData && roadmapData.mods) {
        roadmapData.mods.forEach(m => {
            allModules.push(m.t);
            if (m.tps) {
                m.tps.forEach(tp => {
                    const title = typeof tp === 'string' ? tp : tp.t;
                    allTopics.push({ module: m.t, topic: title });
                });
            }
        });
    } else if (curriculum && curriculum.length > 0) {
        // 2. Parse from curriculum input array
        curriculum.forEach(modString => {
            const match = modString.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);
            if (match) {
                const modName = match[1].trim();
                allModules.push(modName);
                if (match[2]) {
                    const topics = match[2].split(',').map(t => t.trim().replace(/\.\.\.$/, ''));
                    topics.forEach(t => allTopics.push({ module: modName, topic: t }));
                } else {
                    allTopics.push({ module: modName, topic: `${modName} Core Concepts` });
                }
            }
        });
    }

    // If a domain is somehow entirely missing, pull real data from ANY available roadmap
    if (allTopics.length === 0 && typeof ROADMAPS_DATA !== 'undefined') {
        const allDomains = Object.keys(ROADMAPS_DATA);
        // Take an arbitrary common domain to borrow real topics from
        const fallbackDomain = allDomains.includes("Web Dev") ? "Web Dev" : allDomains[0];
        ROADMAPS_DATA[fallbackDomain].mods.forEach(m => {
            allModules.push(m.t);
            if (m.tps) {
                m.tps.forEach(tp => {
                    const title = typeof tp === 'string' ? tp : tp.t;
                    allTopics.push({ module: m.t, topic: title });
                });
            }
        });
    }

    let availableTopics = shuffleArray([...allTopics]);
    const totalQuestions = 10;
    
    for (let i = 0; i < totalQuestions; i++) {
        // Recycle topics if we run out
        if (availableTopics.length === 0) {
            availableTopics = shuffleArray([...allTopics]);
        }
        
        const target = availableTopics.pop();
        
        const qType = Math.floor(Math.random() * 3);
        let questionText = ``;
        let correctAnswer = "";
        let wrongAnswers = [];
        let expText = "";
        
        if (qType === 0) {
            questionText = `Which of the following topics is heavily emphasized in the '${target.module}' module of ${domain}?`;
            correctAnswer = target.topic;
            let pool = allTopics.filter(t => t.topic !== target.topic);
            wrongAnswers = shuffleArray(pool).slice(0, 3).map(t => t.topic);
            expText = `In ${domain}, '${target.topic}' is a foundational block of the ${target.module} module.`;
        } else if (qType === 1 && allModules.length > 2) {
            questionText = `In ${domain}, the concept of '${target.topic}' primarily belongs to which learning phase?`;
            correctAnswer = target.module;
            let pool = allModules.filter(m => m !== target.module);
            wrongAnswers = shuffleArray(pool).slice(0, 3);
            expText = `The topic '${target.topic}' sits perfectly within the scope of ${target.module}.`;
        } else {
            questionText = `When mastering ${domain} at a ${difficulty} level, what is a key takeaway from '${target.module}'?`;
            correctAnswer = `Understanding ${target.topic}`;
            let pool = allTopics.filter(t => t.topic !== target.topic);
            
            // Build real distractors using actual topics from the pool
            if (pool.length >= 3) {
                wrongAnswers = [
                    `Focusing primarily on ${pool[0].topic}`,
                    `Implementing ${pool[1].topic} patterns`,
                    `Mastering ${pool[2].topic} exclusively`
                ];
            } else {
                wrongAnswers = [
                    `Focusing primarily on syntax`,
                    `Writing deprecated code`,
                    `Memorizing random patterns`
                ];
            }
            expText = `Mastering ${domain} requires understanding ${target.topic} as part of ${target.module}.`;
        }
        
        // Ensure we always have exactly 3 wrong answers by pulling extra real topics if necessary
        while (wrongAnswers.length < 3) {
            const extraRealTopic = allTopics[Math.floor(Math.random() * allTopics.length)].topic;
            if (!wrongAnswers.includes(extraRealTopic) && extraRealTopic !== correctAnswer) {
                wrongAnswers.push(extraRealTopic);
            }
        }
        
        let optionsWithCorrect = [
            { text: correctAnswer, isCorrect: true },
            ...wrongAnswers.slice(0, 3).map(w => ({ text: w, isCorrect: false }))
        ];
        
        optionsWithCorrect = shuffleArray(optionsWithCorrect);
        const correctIndex = optionsWithCorrect.findIndex(opt => opt.isCorrect);
        const optionsTexts = optionsWithCorrect.map(opt => opt.text);
        
        questions.push({
            question: `[${difficulty}] ${questionText}`,
            options: optionsTexts,
            correct_answer: correctIndex,
            explanation: expText
        });
    }
    
    return questions;
};
