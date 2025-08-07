// CARROSSEL DE FOTOS - COMPLETAMENTE REESCRITO PARA FUNCIONAR
function startPhotoCarousels() {
    console.log('🎯 Iniciando carrossel de fotos...');
    
    const carousels = document.querySelectorAll('.photo-carousel');
    
    if (carousels.length === 0) {
        console.log('❌ Nenhum carrossel encontrado!');
        return;
    }
    
    carousels.forEach((carousel, carouselIndex) => {
        const photos = carousel.querySelectorAll('.carousel-photo');
        let currentIndex = 0;
        
        console.log(`📷 Carrossel ${carouselIndex + 1}: ${photos.length} fotos encontradas`);
        
        if (photos.length === 0) {
            console.log(`❌ Carrossel ${carouselIndex + 1}: Nenhuma foto encontrada!`);
            return;
        }
        
        // FORÇA todas as fotos para opacidade 0 primeiro
        photos.forEach((photo, index) => {
            photo.style.opacity = '0';
            photo.classList.remove('active');
        });
        
        // Mostra apenas a primeira foto
        if (photos[0]) {
            photos[0].style.opacity = '1';
            photos[0].classList.add('active');
            console.log(`✅ Carrossel ${carouselIndex + 1}: Primeira foto ativada`);
        }
        
        // Função para trocar foto
        const changePhoto = () => {
            console.log(`🔄 Carrossel ${carouselIndex + 1}: Trocando da foto ${currentIndex + 1} para ${((currentIndex + 1) % photos.length) + 1}`);
            
            // Remove ativa atual
            photos[currentIndex].style.opacity = '0';
            photos[currentIndex].classList.remove('active');
            
            // Próxima foto
            currentIndex = (currentIndex + 1) % photos.length;
            
            // Ativa próxima foto
            setTimeout(() => {
                photos[currentIndex].style.opacity = '1';
                photos[currentIndex].classList.add('active');
            }, 100);
        };
        
        // Inicia o intervalo para troca automática a cada 4 segundos
        const intervalId = setInterval(changePhoto, 4000);
        
        console.log(`✅ Carrossel ${carouselIndex + 1}: Intervalo configurado (ID: ${intervalId})`);
        
        // Salva o ID do intervalo no elemento para possível cleanup
        carousel.setAttribute('data-interval-id', intervalId);
    });
    
    console.log('🎯 Todos os carrosséis iniciados!');
}

// ÁUDIO INTERATIVO - COMPLETAMENTE REESCRITO PARA FUNCIONAR
function setupAudioInteractions() {
    console.log('🎵 Configurando áudios...');
    
    // Aguarda um pouco para garantir que o DOM está totalmente carregado
    setTimeout(() => {
        // BUSCA POR MÚLTIPLOS SELETORES PARA GARANTIR QUE ENCONTRE
        const corinthiansIcon = document.querySelector('.corinthians-icon') || 
                              document.querySelector('#corinthians-click') || 
                              document.querySelector('img[src*="corinthians"]');
                              
        const bitcoinIcon = document.querySelector('.bitcoin-icon') || 
                           document.querySelector('#bitcoin-click') || 
                           document.querySelector('img[src*="bitcoin"]');
        
        // BUSCA OS ÁUDIOS
        const hinoAudio = document.getElementById('hino-corinthians');
        const bitcoinAudio = document.getElementById('bitcoin-cash');
        
        console.log('🔍 Elementos encontrados:');
        console.log('Ícone Corinthians:', corinthiansIcon);
        console.log('Ícone Bitcoin:', bitcoinIcon);
        console.log('Áudio Hino:', hinoAudio);
        console.log('Áudio Bitcoin:', bitcoinAudio);
        
        // FUNÇÃO PARA TENTAR TOCAR ÁUDIO
        function tentarTocarAudio(audio, nome) {
            if (!audio) {
                console.log(`❌ Áudio ${nome} não encontrado!`);
                return false;
            }
            
            console.log(`🎵 Tentando tocar ${nome}...`);
            
            // Para e reseta o áudio
            audio.pause();
            audio.currentTime = 0;
            
            // Tenta tocar
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log(`✅ ${nome} tocando com sucesso!`);
                        showAudioMessage(`🎵 ${nome} está tocando! 🎵`);
                    })
                    .catch(error => {
                        console.log(`❌ Erro ao tocar ${nome}:`, error);
                        showAudioMessage(`🎵 ${nome} - Clique para permitir áudio! 🎵`);
                    });
            }
            
            return true;
        }
        
        // CONFIGURAR CLIQUE NO ÍCONE DO CORINTHIANS
        if (corinthiansIcon) {
            console.log('🖤 Configurando clique do Corinthians...');
            
            corinthiansIcon.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🖤 CLICOU NO CORINTHIANS! 🤍');
                
                // Para o bitcoin se estiver tocando
                if (bitcoinAudio) {
                    bitcoinAudio.pause();
                    bitcoinAudio.currentTime = 0;
                }
                
                // Toca o hino
                const sucesso = tentarTocarAudio(hinoAudio, 'Hino do Corinthians');
                
                if (!sucesso) {
                    showAudioMessage('🎵 Vai Corinthians! 🖤🤍');
                }
                
                // Efeito visual
                corinthiansIcon.style.transform = 'scale(1.3) rotate(5deg)';
                corinthiansIcon.style.filter = 'drop-shadow(0 0 20px #000000)';
                setTimeout(() => {
                    corinthiansIcon.style.transform = 'scale(1)';
                    corinthiansIcon.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))';
                }, 300);
            });
            
            // Adiciona cursor pointer
            corinthiansIcon.style.cursor = 'pointer';
            console.log('✅ Clique do Corinthians configurado!');
        } else {
            console.log('❌ Ícone do Corinthians NÃO encontrado!');
        }
        
        // CONFIGURAR CLIQUE NO ÍCONE DO BITCOIN
        if (bitcoinIcon) {
            console.log('₿ Configurando clique do Bitcoin...');
            
            bitcoinIcon.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('₿ CLICOU NO BITCOIN! 🚀');
                
                // Para o hino se estiver tocando
                if (hinoAudio) {
                    hinoAudio.pause();
                    hinoAudio.currentTime = 0;
                }
                
                // Toca o som do bitcoin
                const sucesso = tentarTocarAudio(bitcoinAudio, 'Som do Bitcoin');
                
                if (!sucesso) {
                    showAudioMessage('💰 Cha-ching! To the moon! 🚀');
                }
                
                // Efeito visual
                bitcoinIcon.style.transform = 'scale(1.3) rotate(-5deg)';
                bitcoinIcon.style.filter = 'drop-shadow(0 0 20px #f7931a)';
                setTimeout(() => {
                    bitcoinIcon.style.transform = 'scale(1)';
                    bitcoinIcon.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))';
                }, 300);
            });
            
            // Adiciona cursor pointer
            bitcoinIcon.style.cursor = 'pointer';
            console.log('✅ Clique do Bitcoin configurado!');
        } else {
            console.log('❌ Ícone do Bitcoin NÃO encontrado!');
        }
        
        // PRÉ-CARREGA OS ÁUDIOS
        if (hinoAudio) {
            hinoAudio.load();
            hinoAudio.volume = 0.7;
            console.log('🎵 Hino pré-carregado');
        }
        
        if (bitcoinAudio) {
            bitcoinAudio.load();
            bitcoinAudio.volume = 0.7;
            console.log('💰 Som do Bitcoin pré-carregado');
        }
        
    }, 1000); // Aguarda 1 segundo para garantir que tudo carregou
}

// Função para mostrar mensagens visuais
function showAudioMessage(message) {
    console.log('📢 Mostrando mensagem:', message);
    
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.audio-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'audio-message';
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
        pointer-events: none;
        animation: fadeInOut 3s ease-in-out;
        border: 2px solid #f7931a;
        text-align: center;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;
    
    // Adiciona animação CSS se não existir
    if (!document.querySelector('#audio-message-animation')) {
        const style = document.createElement('style');
        style.id = 'audio-message-animation';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv && messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// Criar ícones flutuantes dinamicamente
function createFloatingIcons() {
    const iconsContainer = document.querySelector('.floating-icons');
    if (!iconsContainer) return;
    
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

// Simulador de preço Bitcoin
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
        
        ticker.style.transform = 'scale(1.05)';
        setTimeout(() => {
            ticker.style.transform = 'scale(1)';
        }, 200);
    }, 6000);
}

// Animação das memórias
function setupMemoryAnimations() {
    const memoryItems = document.querySelectorAll('.memories-list li');
    memoryItems.forEach((item, index) => {
        item.style.setProperty('--delay', index + 1);
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02) translateX(5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) translateX(0)';
        });
    });
}

// Easter eggs
function setupEasterEggs() {
    let clickCount = 0;
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('bitcoin-ticker') || e.target.textContent.includes('₿')) {
            clickCount++;
            
            if (clickCount === 1) {
                showAudioMessage('🚀 To the moon, pai! 🚀');
            } else if (clickCount === 3) {
                showAudioMessage('💎 Diamond hands! HODL forever! 💎');
            } else if (clickCount === 5) {
                showAudioMessage('⚡ Bitcoin Lightning Network! ⚡');
                clickCount = 0;
            }
            
            setTimeout(() => { clickCount = 0; }, 3000);
        }
    });
    
    const heart = document.querySelector('.heart');
    if (heart) {
        heart.addEventListener('click', () => {
            showAudioMessage('❤️ Te amo muito, pai! ❤️');
        });
    }
}

// Configurar vídeo
function setupVideo() {
    const video = document.querySelector('.special-video');
    if (video) {
        video.addEventListener('loadedmetadata', () => {
            console.log('🎥 Vídeo carregado com sucesso!');
        });
        
        video.addEventListener('error', (e) => {
            console.log('❌ Erro ao carregar vídeo:', e);
        });
        
        video.addEventListener('play', () => {
            console.log('▶️ Vídeo iniciado!');
        });
    }
}

// Função utilitária debounce
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

// INICIALIZAÇÃO PRINCIPAL
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 INICIANDO SITE DO PAI CORINTHIANO! 🚀');
    console.log('⏰ DOM carregado, iniciando funcionalidades...');
    
    // Aguarda um pouco e inicia tudo
    setTimeout(() => {
        console.log('🎯 Iniciando carrosséis...');
        startPhotoCarousels();
        
        console.log('🎵 Configurando áudios...');
        setupAudioInteractions();
        
        console.log('✨ Outras funcionalidades...');
        createFloatingIcons();
        updateBitcoinTicker();
        setupMemoryAnimations();
        setupEasterEggs();
        setupVideo();
        
        console.log('✅ TUDO CONFIGURADO COM SUCESSO!');
        
    }, 500);
});

// Listener adicional para quando página carregar completamente
window.addEventListener('load', function() {
    console.log('🌟 PÁGINA COMPLETAMENTE CARREGADA!');
    
    // Força reinicialização dos carrosséis após 2 segundos
    setTimeout(() => {
        console.log('🔄 Forçando reinicialização dos carrosséis...');
        startPhotoCarousels();
    }, 2000);
    
    // Força configuração dos áudios novamente
    setTimeout(() => {
        console.log('🔊 Reconfiguração de áudios...');
        setupAudioInteractions();
    }, 3000);
});

// Debug: Adiciona informações no console
console.log(`
🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍
       SITE DO PAI CORINTHIANO
🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍🖤🤍

✅ JavaScript carregado
⚽ Vai Corinthians!
₿ Bitcoin to the moon!
🏓 Pickleball champion!

Funcionalidades:
📷 Carrossel: 4 segundos por foto
🎵 Áudios: Clique nos ícones
🎬 Vídeo: Player integrado
✨ Easter eggs: Clique no ticker
`);