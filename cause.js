// Reasons database
const reasons = [
    {
        text: {
            en: "You are my greatest blessing, my love, and my safest place. I feel so incredibly lucky to be yours. 💖",
            pt: "Você é a minha maior bênção, meu amor, e o meu lugar seguro. Tenho tanta sorte de ser seu. 💖"
        },
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: {
            en: "May every day remind you of how deeply you’re loved, cherished, and admired by me. 🌸",
            pt: "Que todos os dias te lembrem de como você é profundamente amada, querida e admirada por mim. 🌸"
        },
        emoji: "💗",
        gif: "gif2.gif"
    },
    {
        text: {
            en: "Wishing you endless happiness, success, and all the beautiful dreams we’re building together. ✨ ",
            pt: "Desejo a você felicidade sem fim, sucesso e todos os lindos sonhos que estamos construindo juntos. ✨ "
        },
        emoji: "💕",
        gif: "gif1.gif"
    },
    {
        text: {
            en: "Stay the amazing princess you are my love, my strength, my forever. I can’t wait to spend my life with you. 🥳 ",
            pt: "Continue sendo a princesa incrível que você é — meu amor, minha força, meu para sempre. Mal posso esperar para passar a vida com você. 🥳 "
        },
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

const LANGUAGE_KEY = 'birthdayLanguage';
const languageToggle = document.querySelector('.language-toggle');
const translatableElements = document.querySelectorAll('[data-en][data-pt]');
const languageContent = {
    en: {
        shuffleLabel: 'Click Here... 💕',
        storyLabel: 'Enter Our Storylane 💫',
        counter: (index, total) => `Reason ${index} of ${total}`
    },
    pt: {
        shuffleLabel: 'Clique Aqui... 💕',
        storyLabel: 'Entre na Nossa História 💫',
        counter: (index, total) => `Razão ${index} de ${total}`
    }
};
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

setupCelebrationBursts();
applyLanguage(currentLanguage);

function updateToggleLabel() {
    if (!languageToggle) return;
    const isEnglish = currentLanguage === 'en';
    languageToggle.textContent = isEnglish ? 'PT-BR' : 'EN';
    languageToggle.setAttribute(
        'aria-label',
        isEnglish ? 'Mudar idioma para português brasileiro' : 'Switch language to English'
    );
    languageToggle.setAttribute('aria-pressed', currentLanguage === 'pt');
}

function updateReasonCounter() {
    if (!reasonCounter) return;
    if (currentReasonIndex > 0) {
        reasonCounter.textContent = languageContent[currentLanguage].counter(currentReasonIndex, reasons.length);
    } else {
        reasonCounter.textContent = '';
    }
}

function updateReasonCards() {
    const cards = reasonsContainer?.querySelectorAll('.reason-card') || [];
    cards.forEach((card) => {
        const index = Number(card.dataset.reasonIndex);
        const reason = reasons[index];
        const text = card.querySelector('.reason-text');
        if (text && reason) {
            text.textContent = `${reason.emoji} ${reason.text[currentLanguage]}`;
        }
    });
}

function updateShuffleButtonLabel() {
    if (!shuffleButton) return;
    shuffleButton.textContent = shuffleButton.classList.contains('story-mode')
        ? languageContent[currentLanguage].storyLabel
        : languageContent[currentLanguage].shuffleLabel;
}

function applyLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(LANGUAGE_KEY, lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    translatableElements.forEach((element) => {
        element.textContent = element.dataset[lang];
    });
    updateShuffleButtonLabel();
    updateReasonCounter();
    updateReasonCards();
    updateToggleLabel();
}

if (languageToggle) {
    languageToggle.addEventListener('click', () => {
        applyLanguage(currentLanguage === 'en' ? 'pt' : 'en');
    });
}

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
function createReasonCard(reason, reasonIndex) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.dataset.reasonIndex = reasonIndex;

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.textContent = `${reason.emoji} ${reason.text[currentLanguage]}`;

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

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const reasonIndex = currentReasonIndex;
        const card = createReasonCard(reasons[reasonIndex], reasonIndex);
        reasonsContainer.appendChild(card);

        // Update counter
        currentReasonIndex++;
        updateReasonCounter();

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = languageContent[currentLanguage].storyLabel;
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

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
