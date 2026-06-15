const container = document.getElementById('container');
const particleCount = 1000;
const chars = "0123456789";

function isInsideHeart(x, y) {
    const ny = y * 1.1; 
    return Math.pow(x * x + ny * ny - 1, 3) - x * x * Math.pow(ny, 3) <= 0;
}

function getHeartPoint() {
    let x, y;
    do {
        x = (Math.random() - 0.5) * 2.4; 
        y = (Math.random() - 0.5) * 2.4; 
    } while (!isInsideHeart(x, y));
    return { x, y };
}

function initHeart() {
    container.innerHTML = ''; 
    const scale = Math.min(window.innerWidth, window.innerHeight) / 3.2;
    const maxDist = 1.5; 

    for (let i = 0; i < particleCount; i++) {
        const span = document.createElement('span');
        span.classList.add('number');
        span.textContent = chars[Math.floor(Math.random() * chars.length)];

        const fontSize = 7 + Math.random() * 6;
        span.style.setProperty('--fs', `${fontSize}px`);

        const startX = (Math.random() - 0.5) * window.innerWidth * 3;
        const startY = (Math.random() - 0.5) * window.innerHeight * 3;
        
        span.style.setProperty('--sx', `${startX}px`);
        span.style.setProperty('--sy', `${startY}px`);

        const point = getHeartPoint();
        span.dataset.px = point.x;
        span.dataset.py = point.y;

        const targetX = point.x * scale;
        const targetY = -point.y * scale;

        span.style.setProperty('--tx', `${targetX}px`);
        span.style.setProperty('--ty', `${targetY}px`);

        const distanceFromCenter = Math.sqrt(point.x * point.x + point.y * point.y);
        const baseDelay = (distanceFromCenter / maxDist) * 2.5;
        const jitter = Math.random() * 0.2; 
        
        span.style.transitionDelay = `${baseDelay + jitter}s`;

        container.appendChild(span);
    }

    setTimeout(() => {
        document.querySelectorAll('.number').forEach(num => {
            num.classList.add('assembled');
        });
    }, 100);
}

initHeart();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const scale = Math.min(window.innerWidth, window.innerHeight) / 3.2;
        document.querySelectorAll('.number').forEach(num => {
            const px = parseFloat(num.dataset.px);
            const py = parseFloat(num.dataset.py);
            num.style.setProperty('--tx', `${px * scale}px`);
            num.style.setProperty('--ty', `${-py * scale}px`);
        });
    }, 100);
});