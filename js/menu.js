document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        console.log('Elementi su pronađeni'); // debug

        hamburger.addEventListener('click', function() {
            console.log('Hamburger kliknut'); // debug
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Zatvori meni kada se klikne na link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    } else {
        console.log('Hamburger ili navLinks nije pronađen'); // debug
    }
}); 