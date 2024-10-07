document.addEventListener('DOMContentLoaded', () => {
    let visible = false;

    const menuRect = document.querySelector('.anim-rect');
    const menuRectRotation = gsap.from(menuRect, {
        duration: 5,
        rotation: 360,
        ease: 'none',
        repeat: -1
    });

    const navTexts = document.querySelectorAll('.nav-text');
    // Setup initial navText states
    navTexts.forEach(navText => {
        navText.style.opacity = 0;
        navText.hidden = true;
        
        navText.style.transform = "translateY(20px)";
    })

    const navContainer = document.getElementById('nav-container');
    navContainer.addEventListener('mouseenter', () => {
        if (visible) return;
        navTexts.forEach(navText => {
            navText.hidden = false;
        });
        gsap.to(menuRectRotation, {
            timeScale: 2.5
        });

        gsap.to(navTexts, {
            duration: 0.3,
            y: 0,
            opacity: 1,
            onComplete: () => {
                visible = true;
            }
        });
    });

    navContainer.addEventListener('mouseleave', () => {
        if (!visible) return;
        gsap.to(menuRectRotation, {
            timeScale: 1
        });

        gsap.to(navTexts, {
            duration: 0.3,
            y: 20,
            opacity: 0,
            onComplete: () => {
                navTexts.forEach(navText => {
                    navText.hidden = true;
                })
                visible = false;
            }
        });
    });
});