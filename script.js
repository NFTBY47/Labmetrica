document.addEventListener('DOMContentLoaded', function() {
    const heroNav = document.querySelector('.hero-nav');
    const heroNavButtons = Array.from(document.querySelectorAll('.hero-nav-btn'));

    // Reveal Animation with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Smooth Scroll for All Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = heroNav?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 40;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Hero Nav Active State (Lab / Doctor / Patient)
    // "Лаборатория" охватывает сразу несколько секций (Почему + Преимущества)
    const navGroups = [
        { navId: 'lab-intro', sectionIds: ['lab-intro', 'lab-benefits'] },
        { navId: 'lab-doc-link', sectionIds: ['lab-doc-link'] },
        { navId: 'lab-pat-link', sectionIds: ['lab-pat-link'] }
    ];

    const heroNavTargets = navGroups
        .flatMap(group => group.sectionIds.map(id => ({ navId: group.navId, el: document.getElementById(id) })))
        .filter(item => Boolean(item.el));

    const clearHeroNavActive = () => {
        heroNavButtons.forEach(btn => btn.classList.remove('active'));
    };

    const setHeroNavActive = (navId) => {
        if (!navId) {
            clearHeroNavActive();
            return;
        }
        heroNavButtons.forEach(btn => {
            const href = btn.getAttribute('href');
            btn.classList.toggle('active', href === `#${navId}`);
        });
    };

    // Hero Nav Transparency Control
    const heroSection = document.querySelector('.hero');
    
    const updateHeroNavStyle = (isInHero) => {
        if (isInHero) {
            heroNav.style.background = 'rgba(255, 255, 255, 0.9)';
            heroNav.style.backdropFilter = 'blur(20px) saturate(180%)';
            heroNav.style.webkitBackdropFilter = 'blur(20px) saturate(180%)';
            heroNav.style.border = '1px solid rgba(37, 99, 235, 0.12)';
        } else {
            heroNav.style.background = 'rgba(255, 255, 255, 0.95)';
            heroNav.style.backdropFilter = 'blur(16px) saturate(120%)';
            heroNav.style.webkitBackdropFilter = 'blur(16px) saturate(120%)';
            heroNav.style.border = '1px solid rgba(37, 99, 235, 0.15)';
        }
    };

    if (heroNavTargets.length && heroNavButtons.length) {
        const computeActiveSectionId = () => {
            const navHeight = heroNav?.offsetHeight || 0;
            const activationOffset = navHeight + 140;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            const activationPoint = scrollTop + activationOffset;

            // In hero (above the first tracked section) -> no active state
            const firstTop = heroNavTargets[0].el.getBoundingClientRect().top + scrollTop;
            if (activationPoint < firstTop) {
                setHeroNavActive(null);
                return;
            }

            let activeNavId = heroNavTargets[0]?.navId;
            for (const item of heroNavTargets) {
                const top = item.el.getBoundingClientRect().top + scrollTop;
                if (top <= activationPoint) {
                    activeNavId = item.navId;
                } else {
                    break;
                }
            }

            const scrolledToBottom = (window.innerHeight + scrollTop) >= (document.documentElement.scrollHeight - 2);
            if (scrolledToBottom) {
                activeNavId = heroNavTargets[heroNavTargets.length - 1]?.navId;
            }

            if (activeNavId) setHeroNavActive(activeNavId);
        };

        let scrollTicking = false;
        const onScroll = () => {
            if (scrollTicking) return;
            scrollTicking = true;
            window.requestAnimationFrame(() => {
                computeActiveSectionId();
                scrollTicking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        computeActiveSectionId();

        // Hero section observer for transparency
        if (heroSection) {
            const heroObserver = new IntersectionObserver((entries) => {
                const isHeroVisible = entries[0].isIntersecting && entries[0].intersectionRatio > 0.1;
                updateHeroNavStyle(isHeroVisible);
            }, {
                threshold: [0.1, 0]
            });
            
            heroObserver.observe(heroSection);
        }
    }
    
    // Form Handler
    const demoForm = document.getElementById('demo-form');
    
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = demoForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Отправка...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                const formData = new FormData(demoForm);
                console.log('Form submitted:', Object.fromEntries(formData));
                
                btn.textContent = 'Отправлено ✓';
                btn.style.background = '#10B981';
                
                setTimeout(() => {
                    demoForm.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.background = '';
                }, 2000);
            }, 1000);
        });
    }
});
 
