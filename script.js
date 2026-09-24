// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initScrollAnimations();
    initCounters(); // Placeholder for future stats
    init3DCardEffects();
    initSmoothScroll();
    initContactForm(); // Placeholder for form validation
    initNavbarScroll();
    initCursorGlow();
    initTypingEffect();
    initGlobe(); // Keeping the globe animation
});

// --- 1. PARTICLE BACKGROUND ---
function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null };
    let scrollY = 0;

    window.addEventListener('scroll', () => scrollY = window.scrollY);
    window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.05; // Very slow
            this.vy = (Math.random() - 0.5) * 0.05; // Very slow
            this.size = Math.random() * 2;
            this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(112, 0, 255, ';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy + (scrollY * 0.005);
            if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;

            // Mouse interaction
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    this.vx -= (dx / distance) * force * 0.5;
                    this.vy -= (dy / distance) * force * 0.5;
                }
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + '0.5)';
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        let numberOfParticles = (width * height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 240, 255, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
    }

    init();
    animate();
    window.addEventListener('resize', init);
}

// --- 2. SCROLL ANIMATIONS ---
function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: "0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-block, .card, .timeline-item, .section-header, .service-category');
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });
}

// --- 3. COUNTERS (Placeholder) ---
function initCounters() {
    // Look for elements with class 'counter' and animate numbers
    // Implementation can be added if stats are introduced
}

// --- 4. 3D CARD EFFECTS ---
function init3DCardEffects() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });
}

// --- 5. SMOOTH SCROLL ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// --- 6. CONTACT FORM (Placeholder) ---
function initContactForm() {
    // Add form validation logic here
}

// --- 7. NAVBAR SCROLL ---
function initNavbarScroll() {
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            nav.style.background = 'rgba(5, 5, 16, 0.95)';
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            nav.classList.remove('scrolled');
            nav.style.background = 'rgba(5, 5, 16, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });
}

// --- 8. CURSOR ANIMATION (Detailed Trailing) ---
function initCursorGlow() {
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');

    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot moves instantly
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Outline follows with delay (Smooth Trail)
    function animateOutline() {
        // Interpolation
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .card, .service-category, .pill');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });
}

// --- 9. TYPING EFFECT ---
function initTypingEffect() {
    const typeElement = document.querySelector('.typing-effect');
    if (!typeElement) return;

    const words = ["Lead Gen", "Marketing", "Automation", "Scaling"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typeElement.textContent = currentWord.substring(0, charIndex--);
        } else {
            typeElement.textContent = currentWord.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentWord.length + 1) {
            isDeleting = true;
            setTimeout(type, 2000); // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500); // Pause before next word
        } else {
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }
    type();
}

// --- EXTRA: GLOBE ANIMATION (Keep existing) ---
function initGlobe() {
    const globeCanvas = document.getElementById('globe-canvas');
    if (!globeCanvas) return;
    const globeCtx = globeCanvas.getContext('2d');
    let globeParticles = [];
    let globeWidth, globeHeight;

    function resizeGlobe() {
        globeWidth = globeCanvas.width = globeCanvas.parentElement.offsetWidth;
        globeHeight = globeCanvas.height = globeCanvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', () => { resizeGlobe(); initParticles(); });

    function initParticles() {
        globeParticles = [];
        const radius = 200;
        const particleCount = 400;
        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);
            globeParticles.push({ x, y, z });
        }
    }

    let angle = 0;
    function animateGlobe() {
        if (!globeWidth) return;
        globeCtx.clearRect(0, 0, globeWidth, globeHeight);
        const centerX = globeWidth / 2;
        const centerY = globeHeight / 2;
        const perspective = 400;
        angle += 0.005;

        globeCtx.fillStyle = 'rgba(0, 240, 255, 0.8)';
        globeParticles.forEach(p => {
            const rx = p.x * Math.cos(angle) - p.z * Math.sin(angle);
            const rz = p.x * Math.sin(angle) + p.z * Math.cos(angle);
            const scale = perspective / (perspective + rz + 250);
            const x2d = rx * scale + centerX;
            const y2d = p.y * scale + centerY;
            if (scale > 0.5) {
                globeCtx.beginPath();
                globeCtx.arc(x2d, y2d, 1.5 * scale, 0, Math.PI * 2);
                globeCtx.fill();
            }
        });
        requestAnimationFrame(animateGlobe);
    }

    resizeGlobe();
    initParticles();
    animateGlobe();
}
