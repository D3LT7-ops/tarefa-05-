const CONFIG = {
    musicVolume: 0.3,
    musicUrl: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3',
    animationDelay: 100
};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
class SiteManager {
    constructor() {
        this.audio = null;
        this.musicStarted = false;
        this.init();
    }
    init() {
        this.setupMusic();
        this.setupAnimations();
        this.setupInteractions();
        this.setupFilters();
        this.setupForm();
        console.log('✅ Site carregado com sucesso!');
    }
    setupMusic() {
        this.audio = document.createElement('audio');
        this.audio.loop = true;
        this.audio.volume = CONFIG.musicVolume;
        this.audio.src = CONFIG.musicUrl;
        document.body.appendChild(this.audio);
        document.addEventListener('click', () => {
            if (!this.musicStarted) {
                this.audio.play().catch(e => console.log('Música não pôde ser reproduzida:', e));
                this.musicStarted = true;
            }
        }, { once: true });
    }
    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });
        $$('.feature-card, .course-card, .stat-card, .benefit-item').forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${i * CONFIG.animationDelay}ms`;
            observer.observe(el);
        });
        const logo = $('.logo img');
        if (logo) logo.classList.add('pulse');
        this.animateHeroGradient();
    }
    animateHeroGradient() {
        const hero = $('.hero');
        if (!hero) return;
        const style = document.createElement('style');
        style.textContent = `
            .hero {
                background: linear-gradient(135deg, var(--accent), var(--secondary), var(--primary)) !important;
                background-size: 300% 300% !important;
                animation: gradientShift 8s ease infinite !important;
            }
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
    setupInteractions() {
        $$('.course-card, .feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            });
        });
        $$('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.boxShadow = 'none';
            });
        });
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = $('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    setupFilters() {
        const filterBtns = $$('.filter-btn');
        const courseCards = $$('.course-card');
        if (!filterBtns.length || !courseCards.length) return;
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.dataset.category;
                courseCards.forEach(card => {
                    const shouldShow = category === 'all' || card.dataset.category === category;
                    if (shouldShow) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    setupForm() {
        const form = $('#contactForm');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const requiredFields = ['nome', 'email', 'assunto', 'mensagem'];
            const termos = $('input[name="termos"]');
            const isValid = requiredFields.every(field => {
                const input = $(`#${field}`);
                return input && input.value.trim();
            }) && termos && termos.checked;
            if (!isValid) {
                this.showNotification('Por favor, preencha todos os campos obrigatórios!', 'error');
                return;
            }

            // Simular envio
            this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
        });
    }
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification notification-${type}`;
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease',
            background: type === 'success' ? '#33FF57' : '#FF5733',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
        if (!$('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    pauseMusic() {
        if (this.audio) this.audio.pause();
    }
    playMusic() {
        if (this.audio) this.audio.play().catch(e => console.log('Erro ao reproduzir:', e));
    }
    setVolume(volume) {
        if (this.audio) this.audio.volume = Math.max(0, Math.min(1, volume));
    }
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Inicializando site Explorando o Conhecimento...');
    window.site = new SiteManager();
    window.siteControls = {
        pauseMusic: () => window.site.pauseMusic(),
        playMusic: () => window.site.playMusic(),
        setVolume: (vol) => window.site.setVolume(vol)
    };
});