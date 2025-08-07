// Carrossel de fotos
function startPhotoCarousels() {
    const carousels = document.querySelectorAll('.photo-carousel');
    
    carousels.forEach(carousel => {
        const photos = carousel.querySelectorAll('.carousel-photo');
        let currentIndex = 0;
        
        // Função para mudar foto
        const changePhoto = () => {
            photos[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % photos.length;
            photos[currentIndex].classList.add('active');
        };
        
        // Muda foto a cada 4 segundos
        setInterval(changePhoto, 4000);
    });
}

// Áudio interativo
function setupAudioInteractions() {
    const corinthiansIcon = document.querySelector('.corinthians-icon');
    const bitcoinIcon = document.querySelector('.bitcoin-icon');
    const hinoAudio = document.getElementById('hino-corinthians');
    const bitcoinAudio = document.getElementById('bitcoin-cash');
    
    // Clique no ícone do Corinthians
    if (corinthiansIcon && hinoAudio) {
        corinthiansIcon.addEventListener('click', () => {
            // Para outros áudios
            bitcoinAudio?.pause();
            bitcoinAudio?.currentTime = 0;
            
            // Toca hino do Corinthians
            hinoAudio.currentTime = 0;
            hinoAudio.play().catch(e => console.log('Erro ao tocar áudio:', e));
            
            // Feedback visual
            corinthiansIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                corinthiansIcon.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Clique no ícone do Bitcoin
    if (bitcoinIcon && bitcoinAudio) {
        bitcoinIcon.addEventListener('click', () => {
            // Para outros áudios
            hinoAudio?.pause();
            hinoAudio?.currentTime = 0;
            
            // Toca som do Bitcoin
            bitcoinAudio.currentTime = 0;
            bitcoinAudio.play().catch(e => console.log('Erro ao tocar áudio:', e));
            
            // Feedback visual
            bitcoinIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                bitcoinIcon.style.transform = 'scale(1)';
            }, 200);
        });
    }
}
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
            icon.remove();
        }, 10000);
    }, 4000);
}

// Simulador de preço Bitcoin (apenas visual)
function updateBitcoinTicker() {
    const ticker = document.querySelector('.bitcoin-ticker');
    const prices = ['$45,123', '$46,789', '$44,567', '$47,234', '$45,890'];
    
    setInterval(() => {
        const randomPrice = prices[Math.floor(Math.random() * prices.length)];
        ticker.innerHTML = `₿ Bitcoin: ${randomPrice} | "HODL strong, pai! To the moon!" 🚀`;
    }, 5000);
}

// Animação das memórias com delay
function setupMemoryAnimations() {
    const memoryItems = document.querySelectorAll('.memories-list li');
    memoryItems.forEach((item, index) => {
        item.style.setProperty('--delay', index + 1);
    });
}

// Efeito de parallax suave
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
}

// Easter egg: clique no ícone do Bitcoin
function setupEasterEggs() {
    document.addEventListener('click', function(e) {
        if (e.target.textContent === '₿') {
            alert('🚀 To the moon, pai! HODL strong! 🚀');
        }
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicia todas as funcionalidades
    startPhotoCarousels();
    setupAudioInteractions();
    createFloatingIcons();
    updateBitcoinTicker();
    setupMemoryAnimations();
    setupParallax();
    setupEasterEggs();
    
    console.log('🖤🤍 Site do Pai Corinthiano carregado! ₿🏓');
});

// Função adicional para melhorar a performance
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

// Otimiza o evento de scroll
const optimizedParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
}, 10);