 // Reasons database
 const reasons = [
    {
        text: "You are my greatest blessing, my love, and my safest place. I feel so incredibly lucky to be yours. 💖",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: "May every day remind you of how deeply you’re loved, cherished, and admired by me. 🌸",
        emoji: "💗",
        gif: "gif2.gif"
    },
    {
        text: "Wishing you endless happiness, success, and all the beautiful dreams we’re building together. ✨ ",
        emoji: "💕",
        gif: "gif1.gif"
    },
    {
        text: "Stay the amazing princess you are my love, my strength, my forever. I can’t wait to spend my life with you. 🥳 ",
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

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

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;

        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
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