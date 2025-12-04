// Reasons database and translations
const translations = {
    en: {
        toggleLabel: 'PT-BR 🇧🇷',
        metaTitle: "Why You're My Best Friend! 💖",
        heading: 'Happy Birthday Priyaa 💖',
        button: 'Click Here... 💕',
        counterText: (index, total) => `Reason ${index} of ${total}`,
        ending: "You're the BESTEST ! 💖",
        storyCta: 'Enter Our Storylane 💫',
        reasons: [
            {
                text: "You’re such a kind and wonderful person, and I feel lucky to share such a good bond with you. 💖",
                emoji: "🌟",
                gif: "gif1.gif"
            },
            {
                text: "May your day be filled with love, laughter, and endless joy. 🌸 ",
                emoji: "💗",
                gif: "gif2.gif"
            },
            {
                text: "Wishing you success, happiness, and everything your heart desires. ✨ ",
                emoji: "💕",
                gif: "gif1.gif"
            },
            {
                text: "Stay the amazing girl you are—always spreading positivity around. Have the happiest year ahead! 🥳 ",
                emoji: "🌟",
                gif: "gif2.gif"
            }
        ]
    },
    pt: {
        toggleLabel: 'EN 🇺🇸',
        metaTitle: 'Por que você é minha melhor amiga! 💖',
        heading: 'Feliz Aniversário, Priyaa 💖',
        button: 'Clique aqui... 💕',
        counterText: (index, total) => `Razão ${index} de ${total}`,
        ending: 'Você é a MELHOR! 💖',
        storyCta: 'Entre na Nossa História 💫',
        reasons: [
            {
                text: 'Você é tão gentil e maravilhosa, e me sinto sortudo por compartilhar um vínculo tão bom com você. 💖',
                emoji: '🌟',
                gif: 'gif1.gif'
            },
            {
                text: 'Que seu dia seja cheio de amor, risadas e alegria sem fim. 🌸',
                emoji: '💗',
                gif: 'gif2.gif'
            },
            {
                text: 'Desejo sucesso, felicidade e tudo o que seu coração desejar. ✨',
                emoji: '💕',
                gif: 'gif1.gif'
            },
            {
                text: 'Continue sendo essa garota incrível — sempre espalhando positividade. Tenha o ano mais feliz! 🥳',
                emoji: '🌟',
                gif: 'gif2.gif'
            }
        ]
    }
};

// State management
let currentLanguage = getSavedLanguage('en');
let reasonsData = translations[currentLanguage].reasons;
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
const languageButton = document.querySelector('.language-toggle');
const endingText = document.querySelector('.ending-text');
const pageTitle = document.querySelector('title');
let isTransitioning = false;
let storyNavigationHandler = null;

setupCelebrationBursts();

function setupCelebrationBursts() {
    const layer = document.createElement('div');
    layer.className = 'celebration-layer';
    document.body.appendChild(layer);

    const confetti = ['🎉', '🎊', '💖', '💗', '💝', '✨', '🌸'];

    function burst(x, y) {
        const total = 16;
        for (let i = 0; i < total; i++) {
            const emoji = document.createElement('span');
            emoji.className = 'celebration-emoji';
            emoji.textContent = confetti[Math.floor(Math.random() * confetti.length)];
            emoji.style.left = `${x}px`;
            emoji.style.top = `${y}px`;
            layer.appendChild(emoji);

            const angle = (Math.PI * 2 * (i / total)) + Math.random() * 0.5;
            const distance = 80 + Math.random() * 60;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;

            gsap.fromTo(emoji,
                { scale: 0.6, opacity: 0.9 },
                {
                    x: targetX,
                    y: targetY,
                    opacity: 0,
                    duration: 1.3,
                    ease: 'power2.out',
                    onComplete: () => emoji.remove()
                }
            );
        }
    }

    document.addEventListener('pointerdown', (event) => {
        if (event.target.closest('button')) return;
        burst(event.clientX, event.clientY);
    });
}

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

function attachStoryNavigation() {
    if (storyNavigationHandler) {
        shuffleButton.removeEventListener('click', storyNavigationHandler);
    }

    storyNavigationHandler = () => {
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
    };

    shuffleButton.addEventListener('click', storyNavigationHandler);
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasonsData.length) {
        const card = createReasonCard(reasonsData[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        // Update counter
        reasonCounter.textContent = translations[currentLanguage].counterText(currentReasonIndex + 1, reasonsData.length);

        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasonsData.length) {
            shuffleButton.removeEventListener('click', primaryClickHandler);
            primaryListenerAttached = false;
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = translations[currentLanguage].storyCta;
                    shuffleButton.classList.add('story-mode');
                    attachStoryNavigation();
                }
            });
        }

        // Create floating elements
        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        window.location.href = "#storylane";
    }
}

function resetReasons() {
    reasonsContainer.innerHTML = '';
    currentReasonIndex = 0;
    shuffleButton.textContent = translations[currentLanguage].button;
    shuffleButton.classList.remove('story-mode');
    reasonCounter.textContent = '';

    if (storyNavigationHandler) {
        shuffleButton.removeEventListener('click', storyNavigationHandler);
        storyNavigationHandler = null;
    }

    if (!primaryListenerAttached) {
        shuffleButton.addEventListener('click', primaryClickHandler);
        primaryListenerAttached = true;
    }
}

let primaryListenerAttached = false;
function primaryClickHandler() {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
}

shuffleButton.addEventListener('click', primaryClickHandler);
primaryListenerAttached = true;

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);

function applyLanguage(language, { shouldSave = true } = {}) {
    currentLanguage = language;
    reasonsData = translations[currentLanguage].reasons;
    document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en';
    pageTitle.textContent = translations[currentLanguage].metaTitle;
    document.querySelector('h1').textContent = translations[currentLanguage].heading;
    shuffleButton.textContent = translations[currentLanguage].button;
    endingText.textContent = translations[currentLanguage].ending;
    languageButton.textContent = translations[currentLanguage === 'en' ? 'pt' : 'en'].toggleLabel;

    resetReasons();

    if (shouldSave) {
        saveLanguage(language);
    }
}

languageButton.addEventListener('click', () => {
    const nextLanguage = toggleLanguage(currentLanguage);
    applyLanguage(nextLanguage);
});

applyLanguage(currentLanguage, { shouldSave: false });
