// Shill-to-Earn Page JavaScript

// Quest Tab Switching
document.querySelectorAll('.quest-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.quest-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.quest-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Quest Button Interactions
document.querySelectorAll('.quest-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.quest-card');
        const progressBar = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.progress-text');
        
        // Simulate quest start
        this.textContent = 'In Progress...';
        this.disabled = true;
        
        // Animate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.textContent = 'Claim Reward';
                this.classList.add('claim');
                progressText.textContent = '1/1 Complete';
            }
            progressBar.style.width = progress + '%';
        }, 500);
    });
});

// Animated Counter for Active Shillers
function animateShillerCount() {
    const counter = document.querySelector('[data-counter]');
    if (!counter) return;
    
    const target = Math.floor(Math.random() * 10000) + 5000;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Initialize counter on page load
window.addEventListener('load', animateShillerCount);

// Tier Card Hover Effects
document.querySelectorAll('.tier-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
        
        // Add glow effect based on tier
        const header = this.querySelector('.tier-header');
        if (header.classList.contains('diamond')) {
            this.style.boxShadow = '0 20px 40px rgba(185, 242, 255, 0.4)';
        } else if (header.classList.contains('gold')) {
            this.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.4)';
        } else if (header.classList.contains('silver')) {
            this.style.boxShadow = '0 20px 40px rgba(192, 192, 192, 0.4)';
        } else {
            this.style.boxShadow = '0 20px 40px rgba(205, 127, 50, 0.4)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
});

// Simulate Real-time Stats Updates
function updateStats() {
    const statsValues = document.querySelectorAll('.stat-value');
    
    // Simulate random updates
    setInterval(() => {
        const randomStat = statsValues[Math.floor(Math.random() * statsValues.length)];
        if (randomStat && !randomStat.textContent.includes('#')) {
            const currentValue = parseInt(randomStat.textContent) || 0;
            const increment = Math.floor(Math.random() * 100) + 10;
            randomStat.textContent = (currentValue + increment).toLocaleString() + ' BBABY';
            
            // Add flash effect
            randomStat.style.animation = 'flash 0.5s';
            setTimeout(() => {
                randomStat.style.animation = '';
            }, 500);
        }
    }, 5000);
}

// Flash animation
const style = document.createElement('style');
style.textContent = `
    @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; transform: scale(1.1); }
    }
    
    .quest-btn.claim {
        background: var(--gradient-gold);
        animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Initialize stats updates
updateStats();

// Connect Wallet Button
document.querySelectorAll('.buy-btn').forEach(btn => {
    if (btn.textContent === 'Connect Wallet') {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.textContent = 'Connecting...';
            
            setTimeout(() => {
                this.textContent = '0xAbC...789';
                this.style.background = 'var(--gradient-gold)';
                
                // Update requirement cards
                document.querySelector('.req-card').classList.add('completed');
                
                // Show toast notification
                showToast('Wallet Connected Successfully!');
            }, 2000);
        });
    }
});

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.5s, slideOut 0.5s 2.5s;
        z-index: 10000;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add toast animations
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
`;
document.head.appendChild(toastStyle);

console.log('🚀 Shill-to-Earn System Loaded!');