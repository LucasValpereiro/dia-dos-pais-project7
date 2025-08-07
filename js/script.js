// Carrossel de fotos - CORRIGIDO E MELHORADO
function startPhotoCarousels() {
    const carousels = document.querySelectorAll('.photo-carousel');
    
    carousels.forEach((carousel, carouselIndex) => {
        const photos = carousel.querySelectorAll('.carousel-photo');
        let currentIndex = 0;
        
        console.log(`Carrossel ${carouselIndex + 1} iniciado com ${photos.length} fotos`);
        
        // Garante que apenas a primeira foto está ativa inicialmente
        photos.forEach((photo, index) => {
            photo.classList.toggle('active', index === 0);
        });
        
        // Função para mudar foto
        const changePhoto = () => {
            if (photos.length > 1) {
                // Remove classe active da foto atual
                photos[currentIndex].classList.remove('active');
                
                // Avança para próxima foto
                currentIndex = (currentIndex + 1) % photos.length;
                
                // Adiciona classe active na nova foto
                photos[currentIndex].classList.add('active');
                
                console.log(`Carrossel ${carouselIndex + 1}: Foto ${currentIndex + 1} de ${photos.length}`);
            }
        };
        
        // Inicia troca de fotos a cada 4 segundos
        if (photos.length > 1) {
            setInterval(changePhoto, 4000);
        }
    });
}

// Função para mostrar mensagens visuais quando áudio não funciona
function showAudioMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 1.5rem;
        z-index: 9999;
        animation: fadeInOut 3s ease-in-out;
        pointer-events: none;
    `;
    
    // Adiciona animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        document.body.removeChild(messageDiv);
        document.head.removeChild(style);
    }, 3000);
}

// Áudio interativo - CORRIGIDO E MELHORADO
function setupAudioInteractions() {
    const corinthiansIcon = document.querySelector('.corinthians-icon');
    const bitcoinIcon = document.querySelector('.bitcoin-icon');
    
    // Seletores corretos para os elementos de áudio
    const hinoAudio = document.getElementById('hino-corinthians');
    const bitcoinAudio = document.getElementById('bitcoin-cash');
    
    console.log('Configurando interações de áudio...');
    console.log('Ícone Corinthians:', corinthiansIcon);
    console.log('Ícone Bitcoin:', bitcoinIcon);
    console.log('Áudio Hino:', hinoAudio);
    console.log('Áudio Bitcoin:', bitcoinAudio);
    
    // Clique no ícone do Corinthians
    if (corinthiansIcon) {
        corinthiansIcon.addEventListener('click', () => {
            console.log('Clicou no ícone do Corinthians!');
            
            // Para outros áudios primeiro
            if (bitcoinAudio) {
                bitcoinAudio.pause();
                bitcoinAudio.currentTime = 0;
            }
            
            // Toca hino do Corinthians
            if (hinoAudio) {
                hinoAudio.currentTime = 0;
                const playPromise = hinoAudio.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('Hino do Corinthians tocando!');
                        })
                        .catch(error => {
                            console.log('Erro ao tocar hino do Corinthians:', error);
                            showAudioMessage('🎵 Vai Corinthians! 🖤🤍');
                        });
                }
            } else {
                showAudioMessage('🎵 Vai Corinthians! 🖤🤍');
            }
            
            // Feedback visual melhorado
            corinthiansIcon.style.transform = 'scale(1.3) rotate(5deg)';
            corinthiansIcon.style.filter = 'drop-shadow(0 0 20px #000000)';
            setTimeout(() => {
                corinthiansIcon.style.transform = 'scale(1)';
                corinthiansIcon.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))';
            }, 300);
        });
    }
    
    // Clique no ícone do Bitcoin
    if (bitcoinIcon) {
        bitcoinIcon.addEventListener('click', () => {
            console.log('Clicou no ícone do Bitcoin!');
            
            // Para outros áudios primeiro
            if (hinoAudio) {
                hinoAudio.pause();
                hinoAudio.currentTime = 0;
            }
            
            // Toca som do Bitcoin
            if (bitcoinAudio) {
                bitcoinAudio.currentTime = 0;
                const playPromise = bitcoinAudio.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('Som do Bitcoin tocando!');
                        })
                        .catch(error => {
                            console.log('Erro ao tocar som do Bitcoin:', error);
                            showAudioMessage('💰 Cha-ching! To the moon! 🚀');
                        });
                }
            } else {
                showAudioMessage('💰 Cha-ching! To the moon! 🚀');
            }
            
            // Feedback visual melhorado
            bitcoinIcon.style.transform = 'scale(1.3) rotate(-5deg)';
            bitcoinIcon.style.filter = 'drop-shadow(0 0 20px #f7931a)';
            setTimeout(() => {
                bitcoinIcon.style.transform = 'scale(1)';
                bitcoinIcon.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))';
            }, 300);
        });
    }
}

// Criar ícones flutuantes dinamicamente
function createFloatingIcons() {
    const iconsContainer = document.querySelector('.floating-icons');
    const icons = ['⚽', '₿', '🏓', '🖤', '🤍', '🚀', '💪', '🏆'];
    
    setInterval(() => {
        const icon = document.createElement('div');
        icon.className = 'floating-icon';
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.left = Math.random() * 100 + '%';
        icon.style.animationDuration = (Math.random() * 4 + 6) + 's';
        icon.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
        
        iconsContainer.appendChild(icon);
        
        setTimeout(() => {
            if (icon && icon.parentNode) {
                icon.remove();
            }
        }, 10000);
    }, 4000);
}

// Simulador de preço Bitcoin (apenas visual)
function updateBitcoinTicker() {
    const ticker = document.querySelector('.bitcoin-ticker');
    if (!ticker) return;
    
    const prices = ['$45,123', '$46,789', '$44,567', '$47,234', '$45,890', '$48,156', '$43,967'];
    const messages = [
        'HODL strong, pai! To the moon!',
        'Diamond hands forever!',
        'Bitcoin é o futuro!',
        'Criptos subindo!',
        'Estratégia HODL ativa!'
    ];
    
    setInterval(() => {
        const randomPrice = prices[Math.floor(Math.random() * prices.length)];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        ticker.innerHTML = `₿ Bitcoin: ${randomPrice} | "${randomMessage}" 🚀`;
        
        // Adiciona efeito visual
        ticker.style.transform = 'scale(1.05)';
        setTimeout(() => {
            ticker.style.transform = 'scale(1)';
        }, 200);
    }, 6000);
}

// Animação das memórias com delay
function setupMemoryAnimations() {
    const memoryItems = document.querySelectorAll('.memories-list li');
    memoryItems.forEach((item, index) => {
        item.style.setProperty('--delay', index + 1);
        
        // Adiciona efeito hover
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02) translateX(5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) translateX(0)';
        });
    });
}

// Efeito de parallax suave
function setupParallax() {
    const optimizedParallax = debounce(() => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.03}px)`;
        }
        
        // Parallax para ícones flutuantes
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            const speed = (index % 3 + 1) * 0.01;
            icon.style.transform += ` translateY(${scrolled * speed}px)`;
        });
    }, 10);
    
    window.addEventListener('scroll', optimizedParallax);
}

// Easter eggs e interações especiais
function setupEasterEggs() {
    let clickCount = 0;
    
    // Clique múltiplo no ticker do Bitcoin
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('bitcoin-ticker') || e.target.textContent.includes('₿')) {
            clickCount++;
            
            if (clickCount === 1) {
                showAudioMessage('🚀 To the moon, pai! 🚀');
            } else if (clickCount === 3) {
                showAudioMessage('💎 Diamond hands! HODL forever! 💎');
            } else if (clickCount === 5) {
                showAudioMessage('⚡ Bitcoin Lightning Network! ⚡');
                clickCount = 0; // Reset
            }
            
            // Reset após 3 segundos
            setTimeout(() => {
                clickCount = 0;
            }, 3000);
        }
    });
    
    // Easter egg para o coração
    const heart = document.querySelector('.heart');
    if (heart) {
        heart.addEventListener('click', () => {
            showAudioMessage('❤️ Te amo muito, pai! ❤️');
            
            // Cria corações flutuantes
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createFloatingHeart();
                }, i * 200);
            }
        });
    }
}

// Função para criar corações flutuantes
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        top: 100%;
        font-size: 2rem;
        pointer-events: none;
        z-index: 1000;
        animation: floatHeart 3s ease-out forwards;
    `;
    
    // Adiciona animação para o coração
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatHeart {
            to {
                transform: translateY(-100vh) scale(0.5);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('#heart-animation')) {
        style.id = 'heart-animation';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart && heart.parentNode) {
            heart.remove();
        }
    }, 3000);
}

// Função para configurar o vídeo
function setupVideo() {
    const video = document.querySelector('.special-video');
    if (video) {
        video.addEventListener('loadedmetadata', () => {
            console.log('Vídeo carregado com sucesso!');
        });
        
        video.addEventListener('error', (e) => {
            console.log('Erro ao carregar vídeo:', e);
            // Fallback: mostra mensagem
            const videoContainer = video.parentElement;
            videoContainer.innerHTML = `
                <h2>Uma mensagem especial para você! 🎥</h2>
                <p style="font-size: 1.2rem; color: #666; padding: 20px;">
                    🎬 O vídeo está sendo preparado com muito carinho! 
                    <br><br>
                    Em breve você poderá assistir a essa mensagem especial! ❤️
                </p>
            `;
        });
        
        // Adiciona controles personalizados
        video.addEventListener('play', () => {
            console.log('Vídeo iniciado!');
            showAudioMessage('🎬 Aproveitando o vídeo especial! 🎥');
        });
    }
}

// Função utilitária para debounce (otimização de performance)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para adicionar efeitos visuais nos cards
function setupCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Efeito de brilho ao passar o mouse
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 25px 50px rgba(255, 255, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 15px 35px rgba(255, 255, 255, 0.1)';
        });
        
        // Adiciona clique nos stats
        const statItems = card.querySelectorAll('.stat-item');
        statItems.forEach(stat => {
            stat.addEventListener('click', () => {
                stat.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    stat.style.transform = 'scale(1)';
                }, 200);
            });
        });
    });
}

// Função para gerenciar o estado dos áudios
function manageAudioStates() {
    const allAudios = document.querySelectorAll('audio');
    
    allAudios.forEach(audio => {
        audio.addEventListener('ended', () => {
            console.log(`Áudio ${audio.id} terminou de tocar`);
        });
        
        audio.addEventListener('canplaythrough', () => {
            console.log(`Áudio ${audio.id} está pronto para tocar`);
        });
        
        // Adiciona volume padrão
        audio.volume = 0.7;
    });
}

// Função para criar indicadores visuais de carregamento
function showLoadingIndicators() {
    const carousels = document.querySelectorAll('.photo-carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        let loadedImages = 0;
        
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        console.log('Todas as imagens do carrossel carregadas!');
                    }
                });
            }
        });
    });
}

// Função para otimizar performance em dispositivos móveis
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduz frequência de animações flutuantes
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            icon.style.animationDuration = '12s'; // Mais lento em mobile
        });
        
        // Reduz qualidade de algumas animações
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.transform = 'translateY(0)'; // Remove parallax em mobile
        });
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🖤🤍 Iniciando site do Pai Corinthiano! ₿🏓');
    
    // Inicia todas as funcionalidades
    startPhotoCarousels();
    setupAudioInteractions();
    createFloatingIcons();
    updateBitcoinTicker();
    setupMemoryAnimations();
    setupParallax();
    setupEasterEggs();
    setupVideo();
    setupCardEffects();
    manageAudioStates();
    showLoadingIndicators();
    optimizeForMobile();
    
    // Mensagem de boas-vindas no console
    console.log(`
    🖤🤍 SITE CARREGADO COM SUCESSO! 🖤🤍
    ₿ Bitcoin to the moon! ₿
    🏓 Pickleball champion! 🏓
    ⚽ Vai Corinthians! ⚽
    
    Funcionalidades ativas:
    ✅ Carrossel de fotos (4s)
    ✅ Áudios interativos
    ✅ Ícones flutuantes
    ✅ Ticker Bitcoin dinâmico
    ✅ Animações de memórias
    ✅ Efeitos parallax
    ✅ Easter eggs
    ✅ Player de vídeo
    ✅ Efeitos visuais
    `);
    
    // Adiciona um delay para garantir que tudo esteja carregado
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Força primeira troca de ticker do Bitcoin após 2 segundos
        setTimeout(() => {
            const ticker = document.querySelector('.bitcoin-ticker');
            if (ticker) {
                ticker.innerHTML = `₿ Bitcoin: $46,234 | "HODL strong, pai!" 🚀`;
            }
        }, 2000);
    }, 100);
});

// Event listener adicional para garantir que os áudios funcionem
window.addEventListener('load', function() {
    console.log('Página totalmente carregada!');
    
    // Tenta pré-carregar os áudios
    const hinoAudio = document.getElementById('hino-corinthians');
    const bitcoinAudio = document.getElementById('bitcoin-cash');
    
    if (hinoAudio) {
        hinoAudio.load();
        console.log('Áudio do hino pré-carregado');
    }
    
    if (bitcoinAudio) {
        bitcoinAudio.load();
        console.log('Áudio do bitcoin pré-carregado');
    }
    
    // Força início do primeiro carrossel após carregamento completo
    setTimeout(() => {
        console.log('Iniciando carrosséis forçadamente...');
        startPhotoCarousels();
    }, 1000);
});

// Event listener para redimensionamento da janela
window.addEventListener('resize', debounce(() => {
    optimizeForMobile();
    console.log('Layout otimizado para nova resolução');
}, 250));

// Event listener para detectar quando usuário volta para a aba
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Usuário voltou para a página!');
        // Reinicia animações se necessário
        const ticker = document.querySelector('.bitcoin-ticker');
        if (ticker) {
            ticker.style.animation = 'none';
            setTimeout(() => {
                ticker.style.animation = 'pulse 3s ease-in-out infinite';
            }, 10);
        }
    }
});
```