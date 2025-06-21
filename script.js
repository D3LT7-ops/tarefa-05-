class MusicaFundo {
    constructor() {
        this.audio = null;
        this.inicializada = false;
        this.volume = 0.3;
        this.inicializar();
    }

    inicializar() {
       
        this.audio = document.createElement('audio');
        this.audio.loop = true;
        this.audio.volume = this.volume;
        
        
        this.audio.src = 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3';
        
        
        document.body.appendChild(this.audio);
        
        
        this.configurarReproducao();
    }

    configurarReproducao() {
        const iniciarMusica = () => {
            if (!this.inicializada) {
                this.audio.play().catch(e => {
                    console.log('Erro ao reproduzir música:', e);
                });
                this.inicializada = true;
                document.removeEventListener('click', iniciarMusica);
            }
        };
        
        document.addEventListener('click', iniciarMusica, { once: true });
    }

    pausar() {
        this.audio.pause();
    }

    reproduzir() {
        this.audio.play();
    }

    alterarVolume(novoVolume) {
        this.volume = novoVolume;
        this.audio.volume = novoVolume;
    }
}

class EstilizacaoDinamica {
    constructor() {
        this.inicializar();
    }

    inicializar() {
        this.adicionarEfeitosHover();
        this.configurarAnimacoes();
        this.adicionarEstilosPersonalizados();
    }

    adicionarEfeitosHover() {
        
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            });
        });

        
        const botoes = document.querySelectorAll('.btn-primary, .btn-secondary');
        botoes.forEach(botao => {
            botao.addEventListener('mouseenter', () => {
                botao.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                botao.style.transform = 'translateY(-5px)';
            });
            
            botao.addEventListener('mouseleave', () => {
                botao.style.boxShadow = 'none';
                botao.style.transform = 'translateY(0)';
            });
        });
    }

    configurarAnimacoes() {
        
        const observador = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        
        const elementos = document.querySelectorAll('.feature-card, .course-card, .stat-card');
        elementos.forEach((elemento, index) => {
            elemento.style.opacity = '0';
            elemento.style.transform = 'translateY(30px)';
            elemento.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observador.observe(elemento);
        });
    }

    adicionarEstilosPersonalizados() {
        
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.background = 'linear-gradient(135deg, #ff6b6b, #ffa726, #4ecdc4)';
            hero.style.backgroundSize = '300% 300%';
            hero.style.animation = 'gradientShift 8s ease infinite';
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .pulse {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

class FuncionalidadesInterativas {
    constructor() {
        this.inicializar();
    }

    inicializar() {
        this.configurarFiltrosCursos();
        this.configurarFormulario();
        this.adicionarEfeitosEspeciais();
    }

    configurarFiltrosCursos() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseCards = document.querySelectorAll('.course-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover classe ativa de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adicionar classe ativa ao botão clicado
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                courseCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Adicionar animação fadeIn
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    configurarFormulario() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                
                const nome = document.getElementById('nome')?.value;
                const email = document.getElementById('email')?.value;
                const assunto = document.getElementById('assunto')?.value;
                const mensagem = document.getElementById('mensagem')?.value;
                const termos = document.querySelector('input[name="termos"]')?.checked;

                if (!nome || !email || !assunto || !mensagem || !termos) {
                    this.mostrarNotificacao('Por favor, preencha todos os campos obrigatórios!', 'erro');
                    return;
                }

                
                this.mostrarNotificacao('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
                form.reset();
            });
        }
    }

    mostrarNotificacao(mensagem, tipo) {
        const notificacao = document.createElement('div');
        notificacao.textContent = mensagem;
        notificacao.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            background: ${tipo === 'sucesso' ? '#4ecdc4' : '#ff6b6b'};
        `;

        document.body.appendChild(notificacao);

        setTimeout(() => {
            notificacao.remove();
        }, 4000);
    }

    adicionarEfeitosEspeciais() {
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        
        const logo = document.querySelector('.logo img');
        if (logo) {
            logo.classList.add('pulse');
        }
    }
}

class ControleTema {
    constructor() {
        this.temaEscuro = false;
        this.criarBotaoTema();
    }

    criarBotaoTema() {
        const botao = document.createElement('button');
        botao.innerHTML = '🌙';
        botao.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: #2c5aa0;
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        botao.addEventListener('click', () => {
            this.alternarTema();
        });

        document.body.appendChild(botao);
        this.botaoTema = botao;
    }

    alternarTema() {
        this.temaEscuro = !this.temaEscuro;
        
        if (this.temaEscuro) {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            this.botaoTema.innerHTML = '☀️';
        } else {
            document.body.style.filter = 'none';
            this.botaoTema.innerHTML = '🌙';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Inicializando site Explorando o Conhecimento...');
    
    const musicaFundo = new MusicaFundo();
    const estilizacao = new EstilizacaoDinamica();
    const funcionalidades = new FuncionalidadesInterativas();
    const controleTema = new ControleTema();
    
    console.log('✅ Site carregado com sucesso!');
    
    // Disponibilizar controles globais
    window.siteControls = {
        musica: musicaFundo,
        tema: controleTema
    };
});