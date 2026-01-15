// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const LANGUAGE_KEY = 'birthdayLanguage';
const languageToggle = document.querySelector('.language-toggle');
const translatableElements = document.querySelectorAll('[data-en][data-pt]');
const greetingElement = document.querySelector('.greeting');
const greetingVariants = {
    en: "Hey You Know What! You're the most adorable human I ever met! 💖",
    pt: "Ei, sabe de uma coisa? Você é a pessoa mais adorável que já conheci! 💖"
};
let greetingText = '';
let charIndex = 0;
let typingTimeout;
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';

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

function startTyping() {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    charIndex = 0;
    if (greetingElement) {
        greetingElement.textContent = '';
    }
    typeGreeting();
}

function applyLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(LANGUAGE_KEY, lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    translatableElements.forEach((element) => {
        element.textContent = element.dataset[lang];
    });
    greetingText = greetingVariants[lang];
    startTyping();
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

// Subtitle animation
const subtitle = document.querySelector('.subtitle');

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        typingTimeout = setTimeout(typeGreeting, 100);
    }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Initialize animations
window.addEventListener('load', () => {
    setupCelebrationBursts();
    applyLanguage(currentLanguage);

    // Title animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // Subtitle animation
    gsap.to('.subtitle', {
        opacity: 1,
        duration: 1,
        delay: 0.3,
        y: 10,
        ease: "power2.out"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // Create floating elements periodically
    setInterval(createFloating, 1000);
});

// Hover effects
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.1,
            duration: 0.3
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3
        });
    });

    // Smooth page transition on click
    button.addEventListener('click', () => {
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'cause.html'; // Replace with the actual URL of the next page
            }
        });
    });
});
