// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation if it's a stat number
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards for animations
document.querySelectorAll('section, .feature-card, .token-stat, .shill-card, .gov-card, .why-card, .strategy-card, .security-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Animated counter function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Copy contract address function
function copyContract() {
    const contractAddress = document.getElementById('contractAddress').textContent;
    navigator.clipboard.writeText(contractAddress).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
}

// Create floating particles dynamically
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: radial-gradient(circle, rgba(255, 107, 157, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Create CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
            opacity: 0.8;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
            opacity: 0.3;
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles on load
createParticles();

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Add hover effect to stat cards
document.querySelectorAll('.stat-card, .feature-card, .token-stat').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add glow effect on mouse move for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// Add dynamic glow to buttons
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    .btn::after {
        content: '';
        position: absolute;
        top: var(--y, 50%);
        left: var(--x, 50%);
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    }
    
    .btn:hover::after {
        opacity: 1;
    }
`;
document.head.appendChild(glowStyle);

// Typing effect for hero tagline
function typeWriter() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    setTimeout(type, 1000);
}

// Initialize typing effect on load
window.addEventListener('load', typeWriter);

// Add random floating animation to baby icons
document.querySelectorAll('.baby-icon, .floating-baby').forEach((baby, index) => {
    baby.style.animationDelay = `${index * 0.5}s`;
});

// Create shooting stars effect
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        top: ${Math.random() * 50}%;
        left: -10px;
        animation: shootingStar 1s linear;
        z-index: 0;
    `;
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 1000);
}

// Add shooting star animation
const shootingStarStyle = document.createElement('style');
shootingStarStyle.textContent = `
    @keyframes shootingStar {
        from {
            transform: translateX(0) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(100vw) translateY(100px);
            opacity: 0;
        }
    }
    
    .shooting-star::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 1px;
        background: linear-gradient(90deg, white, transparent);
        transform: translateX(-100%);
    }
`;
document.head.appendChild(shootingStarStyle);

// Create shooting stars periodically
setInterval(createShootingStar, 3000);

// Add pulse effect to CTA buttons on scroll
const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('pulse-animation');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.btn-large, .buy-btn').forEach(btn => {
    ctaObserver.observe(btn);
});

// Add pulse animation style
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    .pulse-animation {
        animation: pulseCTA 2s ease-in-out infinite;
    }
    
    @keyframes pulseCTA {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
        }
        50% {
            box-shadow: 0 0 0 20px rgba(102, 126, 234, 0);
        }
    }
`;
document.head.appendChild(pulseStyle);

// Add tilt effect to cards on hover
document.querySelectorAll('.feature-card, .shill-card, .strategy-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loaded class style
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 1s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadedStyle);

console.log('🍼 BBABY Website Loaded Successfully! To the moon! 🚀');