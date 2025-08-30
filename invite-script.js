// Invite & Earn Page JavaScript

// Copy Referral Link Function
function copyRefLink() {
    const refInput = document.getElementById('refLink');
    const copyBtn = document.querySelector('[onclick="copyRefLink()"]');
    
    if (refInput.value === 'Connect wallet to generate link') {
        showToast('Please connect your wallet first!', 'warning');
        return;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(refInput.value).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="copy-icon">✅</span> Copied!';
        copyBtn.style.background = 'var(--gradient-gold)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '';
        }, 2000);
        
        showToast('Referral link copied to clipboard!', 'success');
    });
}

// Copy Wallet ID Function
function copyWalletID() {
    const walletInput = document.getElementById('walletID');
    const copyBtn = document.querySelector('[onclick="copyWalletID()"]');
    
    if (walletInput.value === 'Connect wallet to generate ID') {
        showToast('Please connect your wallet first!', 'warning');
        return;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(walletInput.value).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="copy-icon">✅</span> Copied!';
        copyBtn.style.background = 'var(--gradient-gold)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '';
        }, 2000);
        
        showToast('Wallet ID copied to clipboard!', 'success');
    });
}

// Generate Referral Link and Wallet ID
function generateRefLink() {
    const refInput = document.getElementById('refLink');
    const walletInput = document.getElementById('walletID');
    const walletAddress = localStorage.getItem('walletAddress');
    
    if (walletAddress) {
        const shortAddress = walletAddress.substring(0, 6) + '...' + walletAddress.substring(38);
        refInput.value = `https://bnbbaby.fun/ref/${shortAddress}`;
        walletInput.value = walletAddress;
    }
}

// Share Button Functions
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const refLink = document.getElementById('refLink').value;
        
        if (refLink === 'Connect wallet to generate link') {
            showToast('Please connect your wallet first!', 'warning');
            return;
        }
        
        const message = encodeURIComponent('Join me on BBABY! The cutest memecoin on BNB Chain 🍼🚀\n\n');
        const link = encodeURIComponent(refLink);
        
        if (this.classList.contains('twitter')) {
            window.open(`https://twitter.com/intent/tweet?text=${message}&url=${link}`, '_blank');
        } else if (this.classList.contains('telegram')) {
            window.open(`https://t.me/share/url?url=${link}&text=${message}`, '_blank');
        } else if (this.classList.contains('discord')) {
            navigator.clipboard.writeText(`${decodeURIComponent(message)}\n${refLink}`);
            showToast('Message copied! Paste it in Discord', 'success');
        }
    });
});

// Connect Wallet and Generate Link
document.querySelectorAll('.btn-large').forEach(btn => {
    if (btn.textContent === 'Generate My Link') {
        btn.addEventListener('click', function() {
            this.textContent = 'Connecting...';
            
            setTimeout(() => {
                // Simulate wallet connection
                const walletAddress = '0x' + Math.random().toString(36).substring(2, 42).toUpperCase();
                localStorage.setItem('walletAddress', walletAddress);
                
                generateRefLink();
                this.textContent = 'Link Generated!';
                this.style.background = 'var(--gradient-gold)';
                
                // Update dashboard
                updateDashboard();
                
                showToast('Wallet connected and link generated!', 'success');
                
                setTimeout(() => {
                    this.textContent = 'Regenerate Link';
                    this.style.background = '';
                }, 2000);
            }, 2000);
        });
    }
});

// Update Dashboard with Mock Data
function updateDashboard() {
    const dashboardValues = document.querySelectorAll('.dashboard-value');
    
    // Mock data
    dashboardValues[0].textContent = Math.floor(Math.random() * 50);
    dashboardValues[1].textContent = Math.floor(Math.random() * 20);
    dashboardValues[2].textContent = Math.floor(Math.random() * 100000).toLocaleString() + ' BBABY';
    dashboardValues[3].textContent = 'Influencer';
    
    // Update changes
    document.querySelectorAll('.dashboard-change')[0].textContent = `Last 24h: +${Math.floor(Math.random() * 5)}`;
    document.querySelectorAll('.dashboard-change')[1].textContent = `Pending: ${Math.floor(Math.random() * 5000)} BBABY`;
    document.querySelectorAll('.dashboard-change')[2].textContent = '15 referrals to next tier';
    
    // Add sample referrals to table
    updateReferralTable();
}

// Update Referral Table
function updateReferralTable() {
    const tbody = document.querySelector('.referral-table tbody');
    
    const sampleReferrals = [
        { user: '0xDeF...456', joined: '2 hours ago', status: 'Active', earnings: '500 BBABY' },
        { user: '0xGhI...789', joined: '5 hours ago', status: 'Active', earnings: '350 BBABY' },
        { user: '0xJkL...012', joined: '1 day ago', status: 'Pending', earnings: '0 BBABY' },
        { user: '0xMnO...345', joined: '2 days ago', status: 'Active', earnings: '1,200 BBABY' }
    ];
    
    tbody.innerHTML = sampleReferrals.map(ref => `
        <tr>
            <td style="font-family: 'Courier New', monospace;">${ref.user}</td>
            <td>${ref.joined}</td>
            <td><span class="status-badge ${ref.status.toLowerCase()}">${ref.status}</span></td>
            <td style="color: var(--primary-gold); font-weight: 600;">${ref.earnings}</td>
        </tr>
    `).join('');
}

// Campaign Timer
function updateCampaignTimer() {
    const timer = document.querySelector('.timer');
    if (!timer) return;
    
    let hours = 62;
    let minutes = 14;
    let seconds = 32;
    
    setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                }
            }
        }
        
        const days = Math.floor(hours / 24);
        const displayHours = hours % 24;
        timer.textContent = `${days}d ${displayHours}h ${minutes}m`;
    }, 1000);
}

// Initialize campaign timer
updateCampaignTimer();

// Leaderboard Animation
document.querySelectorAll('.leaderboard-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.animation = 'slideInLeft 0.5s ease forwards';
});

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    const colors = {
        success: 'var(--gradient-gold)',
        warning: 'var(--gradient-secondary)',
        info: 'var(--gradient-primary)'
    };
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.5s, slideOut 0.5s 2.5s;
        z-index: 10000;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add required styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @keyframes slideInLeft {
        from { 
            opacity: 0;
            transform: translateX(-50px);
        }
        to { 
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .status-badge {
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
    }
    
    .status-badge.active {
        background: rgba(0, 255, 0, 0.2);
        color: #00ff00;
    }
    
    .status-badge.pending {
        background: rgba(255, 255, 0, 0.2);
        color: #ffff00;
    }
`;
document.head.appendChild(style);

// Simulate Live Updates
function simulateLiveUpdates() {
    setInterval(() => {
        // Random leaderboard position changes
        const leaderboardItems = document.querySelectorAll('.leaderboard-item');
        const randomItem = leaderboardItems[Math.floor(Math.random() * leaderboardItems.length)];
        
        if (randomItem) {
            const referralsSpan = randomItem.querySelector('.referrals');
            const currentReferrals = parseInt(referralsSpan.textContent);
            referralsSpan.textContent = (currentReferrals + 1) + ' referrals';
            
            // Flash effect
            randomItem.style.animation = 'flash 0.5s';
            setTimeout(() => {
                randomItem.style.animation = '';
            }, 500);
        }
        
        // Update active campaigns progress
        const progressBars = document.querySelectorAll('.campaign-progress .progress-fill');
        progressBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width) || 0;
            if (currentWidth < 100) {
                bar.style.width = Math.min(currentWidth + Math.random() * 5, 100) + '%';
            }
        });
    }, 10000);
}

// Add flash animation
const flashStyle = document.createElement('style');
flashStyle.textContent = `
    @keyframes flash {
        0%, 100% { background: inherit; }
        50% { background: rgba(251, 191, 36, 0.2); }
    }
`;
document.head.appendChild(flashStyle);

// Initialize live updates
simulateLiveUpdates();

// Check for existing wallet on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('walletAddress')) {
        generateRefLink();
        updateDashboard();
    }
});

console.log('🫂 Invite & Earn System Loaded!');