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
    }
};

let currentLanguage = getSavedLanguage('en');
let reasonsData = translations.en.reasons;
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

function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = reason.emoji;

    const text = document.createElement('div');
    text.className = 'text';
    text.textContent = reason.text;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';

    const gif = document.createElement('img');
    gif.src = reason.gif;
    gif.alt = reason.text;

    gifOverlay.appendChild(gif);

    card.appendChild(emoji);
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

function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasonsData.length) {
        const card = createReasonCard(reasonsData[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        reasonCounter.textContent = translations[currentLanguage].counterText(currentReasonIndex + 1, reasonsData.length);

        currentReasonIndex++;

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

function createCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
}

function handleKeyNavigation(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        shuffleButton.click();
    }
}

async function buildPortugueseContent() {
    const base = translations.en;
    const [metaTitle, heading, button, ending, storyCta] = await translateListToPortuguese([
        base.metaTitle,
        base.heading,
        base.button,
        base.ending,
        base.storyCta
    ]);

    const reasons = await translateStructuredList(base.reasons, ['text']);

    return {
        toggleLabel: 'EN 🇺🇸',
        metaTitle,
        heading,
        button,
        counterText: (index, total) => `Razão ${index} de ${total}`,
        ending,
        storyCta,
        reasons
    };
}

async function applyLanguage(language, { shouldSave = true } = {}) {
    const isPortuguese = language === 'pt';
    document.documentElement.lang = isPortuguese ? 'pt-BR' : 'en';

    translations.pt = translations.pt || (isPortuguese ? await buildPortugueseContent() : null);
    const content = isPortuguese ? translations.pt : translations.en;

    pageTitle.textContent = content.metaTitle;
    document.querySelector('h1').textContent = content.heading;
    shuffleButton.textContent = content.button;
    endingText.textContent = content.ending;
    languageButton.textContent = isPortuguese ? 'EN 🇺🇸' : 'PT-BR 🇧🇷';

    reasonsData = content.reasons;
    resetReasons();

    if (shouldSave) {
        saveLanguage(language);
    }
}

languageButton.addEventListener('click', async () => {
    currentLanguage = toggleLanguage(currentLanguage);
    await applyLanguage(currentLanguage);
});

window.addEventListener('keydown', handleKeyNavigation);
createCustomCursor();
applyLanguage(currentLanguage, { shouldSave: false });
