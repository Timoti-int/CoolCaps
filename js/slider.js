document.addEventListener('DOMContentLoaded', function() {
    function initMobileSlider() {
        if (window.innerWidth <= 768) {
            const container = document.querySelector('.hero-container');
            const slides = document.querySelectorAll('.hero-image');
            let currentSlide = 0;
            
            // Dodaj navigacione dugmiće samo ako već ne postoje
            if (!document.querySelector('.hero-nav')) {
                const nav = document.createElement('div');
                nav.className = 'hero-nav';
                slides.forEach((_, i) => {
                    const button = document.createElement('button');
                    button.onclick = () => goToSlide(i);
                    nav.appendChild(button);
                });
                document.querySelector('.hero').appendChild(nav);
            }
            
            function goToSlide(n) {
                currentSlide = n;
                container.style.transform = `translateX(-${currentSlide * 33.333}%)`;
                
                document.querySelectorAll('.hero-nav button').forEach((btn, i) => {
                    btn.classList.toggle('active', i === currentSlide);
                });
            }
            
            // Auto-play
            const interval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                goToSlide(currentSlide);
            }, 5000);
            
            goToSlide(0);
            
            return interval;
        }
        return null;
    }

    let sliderInterval = initMobileSlider();

    // Prati promene veličine ekrana
    window.addEventListener('resize', function() {
        if (sliderInterval) {
            clearInterval(sliderInterval);
        }
        sliderInterval = initMobileSlider();
    });
}); 