document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const html = document.documentElement;
    
    // Функция для открытия/закрытия меню
    function toggleMenu() {
        const isActive = navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        if (isActive) {
            // Меню открывается
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            body.classList.add('menu-open');
            html.classList.add('menu-open');
            body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
        } else {
            // Меню закрывается
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            body.classList.remove('menu-open');
            html.classList.remove('menu-open');
            body.style.overflow = '';
            html.style.overflow = '';
        }
    }
    
    // Функция для закрытия меню
    function closeMenu() {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        html.classList.remove('menu-open');
        body.style.overflow = '';
        html.style.overflow = '';
        
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Обработчик клика на бургер-меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Закрыть меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Закрыть меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!navLinks || !menuToggle) return;
        
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Закрыть меню при нажатии Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // FAQ аккордеон
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все остальные элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий элемент
            item.classList.toggle('active');
        });
    });
    
    // Форма демонстрации
    const demoForm = document.getElementById('demo-form');
    
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                position: document.getElementById('position').value,
                institution: document.getElementById('institution').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value || 'Не указан',
                employees: document.getElementById('employees').value || 'Не указано',
                specialization: document.getElementById('specialization').value,
                scenario: document.getElementById('scenario').value,
                challenge: document.getElementById('challenge').value
            };
            
            // Форматируем сообщение
            const message = `Запрос на демонстрацию для лаборатории отправлен!\n\n` +
                           `Спасибо, ${formData.name} (${formData.position}).\n` +
                           `Лаборатория: ${formData.institution}\n` +
                           `Сотрудников: ${formData.employees}\n` +
                           `Специализация: ${formData.specialization}\n` +
                           `Цель: ${formData.scenario}\n\n` +
                           `Наш менеджер свяжется с вами на ${formData.email} ` +
                           `(тел: ${formData.phone}) в течение 24 часов для согласования времени демонстрации.`;
            
            alert(message);
            
            // Сброс формы
            demoForm.reset();
            
            // Плавный скролл к верху
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Закрываем меню если оно открыто
                closeMenu();
                
                // Небольшая задержка для полного закрытия меню
                setTimeout(() => {
                    // Плавный скролл
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
    
    // Закрыть меню при изменении размера окна (если перешли на десктоп)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Предотвращаем скролл за меню при открытом меню
    navLinks.addEventListener('wheel', function(e) {
        if (navLinks.classList.contains('active')) {
            e.stopPropagation();
        }
    });
    
    // Анимация при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.benefit-card, .faq-item, .feature-highlight');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Инициализация анимации
    document.querySelectorAll('.benefit-card, .faq-item, .feature-highlight').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запускаем сразу для видимых элементов
});
