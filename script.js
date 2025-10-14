// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
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

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .play-step, .benefit-item, .faq-item').forEach(el => {
    observer.observe(el);
});

// Game iframe responsive handling
function adjustGameIframe() {
    const iframe = document.querySelector('.game-iframe-wrapper iframe');
    if (iframe) {
        const container = iframe.parentElement;
        const containerWidth = container.offsetWidth;
        
        // Maintain aspect ratio (16:9)
        const aspectRatio = 16 / 9;
        const newHeight = containerWidth / aspectRatio;
        
        if (newHeight > 600) {
            iframe.style.height = '600px';
        } else {
            iframe.style.height = newHeight + 'px';
        }
    }
}

// Adjust iframe on window resize
window.addEventListener('resize', adjustGameIframe);
window.addEventListener('load', adjustGameIframe);

// Add loading animation for game iframe
const gameIframe = document.querySelector('.game-iframe-wrapper iframe');
if (gameIframe) {
    gameIframe.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Initial loading state
    gameIframe.style.opacity = '0';
    gameIframe.style.transition = 'opacity 0.5s ease';
}

// Balloon animation enhancement
function createFloatingBalloons() {
    const gamePreview = document.querySelector('.game-preview');
    if (!gamePreview) return;
    
    // Create additional floating elements
    for (let i = 0; i < 3; i++) {
        const balloon = document.createElement('div');
        balloon.innerHTML = '🎈';
        balloon.style.position = 'absolute';
        balloon.style.fontSize = '1.5rem';
        balloon.style.animation = `float ${2 + Math.random() * 2}s ease-in-out infinite`;
        balloon.style.animationDelay = `${Math.random() * 2}s`;
        balloon.style.left = Math.random() * 80 + 10 + '%';
        balloon.style.top = Math.random() * 80 + 10 + '%';
        
        gamePreview.appendChild(balloon);
    }
}

// Initialize floating balloons
document.addEventListener('DOMContentLoaded', createFloatingBalloons);

// Add click effects to buttons
document.querySelectorAll('.submit-btn, .nav-link').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy load images and iframes
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('iframe[src]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src || iframe.src;
                lazyObserver.unobserve(iframe);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close FAQ items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Add focus management for accessibility
document.querySelectorAll('.nav-link, .faq-question, .submit-btn').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #FFE66D';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// PLAY NOW Button functionality
document.addEventListener('DOMContentLoaded', function() {
    const playNowBtn = document.getElementById('playNowBtn');
    const gamePreview = document.getElementById('gamePreview');
    const gameIframe = document.getElementById('gameIframe');
    
    console.log('Elements found:', { playNowBtn, gamePreview, gameIframe });
    
    if (playNowBtn && gamePreview && gameIframe) {
        playNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('PLAY NOW button clicked!');
            
            // Add loading animation
            this.innerHTML = '<span class="btn-text">Loading...</span><div class="btn-indicator"></div>';
            this.style.opacity = '0.7';
            this.disabled = true;
            
            // Hide preview and show iframe after a short delay
            setTimeout(() => {
                console.log('Hiding preview, showing iframe');
                gamePreview.style.display = 'none';
                gameIframe.style.display = 'block';
                gameIframe.style.opacity = '0';
                
                // Show iframe immediately
                setTimeout(() => {
                    gameIframe.style.transition = 'opacity 0.5s ease';
                    gameIframe.style.opacity = '1';
                    console.log('Iframe should now be visible');
                    
                    // Hide background image immediately
                    const iframeBackground = gameIframe.querySelector('.iframe-background');
                    if (iframeBackground) {
                        iframeBackground.classList.add('hide-background');
                        console.log('Background image hidden');
                    }
                }, 100);
            }, 1000);
        });
    } else {
        console.error('Could not find required elements:', { playNowBtn, gamePreview, gameIframe });
    }
});

// Console welcome message
console.log(`
🎈 Welcome to Bloons.xyz! 🎈
🎮 The ultimate balloon popping arcade experience!
🐒 Help the monkey pop those balloons!
🏆 Challenge yourself and beat the high scores!
`);

// Add error handling for iframe
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IFRAME') {
        console.warn('Game iframe failed to load. This might be due to network restrictions.');
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            const errorMessage = document.createElement('div');
            errorMessage.innerHTML = `
                <div style="text-align: center; padding: 2rem; background: #ffebee; border-radius: 10px; margin: 1rem 0;">
                    <h3>🎮 Game Loading Issue</h3>
                    <p>The game might be temporarily unavailable. Please try refreshing the page or check your internet connection.</p>
                    <button onclick="location.reload()" style="background: #FF6B6B; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Refresh Page</button>
                </div>
            `;
            gameContainer.appendChild(errorMessage);
        }
    }
});

// Handle iframe load events
document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.querySelector('#gameIframe iframe');
    if (iframe) {
        iframe.addEventListener('error', function() {
            console.warn('Iframe failed to load');
        });
        
        iframe.addEventListener('load', function() {
            console.log('Iframe loaded successfully');
            // Force show iframe when loaded
            const iframeBackground = document.querySelector('#gameIframe .iframe-background');
            if (iframeBackground) {
                iframeBackground.classList.add('hide-background');
                console.log('Background hidden after iframe load');
            }
        });
    }
});
