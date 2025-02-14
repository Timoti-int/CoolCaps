document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const hamburger = document.getElementById('hamburger');
        const mobileNav = document.getElementById('mobile-menu');
        
        console.log('hamburger:', hamburger); // debug
        console.log('mobileNav:', mobileNav); // debug
        
        if (hamburger && mobileNav) {
            hamburger.addEventListener('click', function() {
                console.log('hamburger clicked!'); // debug
                mobileNav.classList.toggle('active');
                console.log('active class toggled'); // debug
            });

            // Zatvori meni kada se klikne na link
            document.querySelectorAll('.mobile-nav a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileNav.classList.remove('active');
                });
            });
        }
    }, 100); // malo sačekaj da se DOM učita
}); 