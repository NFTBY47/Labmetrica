document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Закрыть меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
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
                specialization: document.getElementById('specialization').value,
                scenario: document.getElementById('scenario').value,
                challenge: document.getElementById('challenge').value
            };
            
            // В реальном приложении здесь отправка на сервер
            alert(`Запрос на демонстрацию отправлен!\n\nСпасибо, ${formData.name}.\nМы подготовим демонстрацию для специализации "${formData.specialization}" с фокусом на "${formData.scenario}".\nНаш менеджер свяжется с вами на ${formData.email} в течение 24 часов.`);
            
            // Сброс формы
            demoForm.reset();
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Закрыть мобильное меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!navLinks || !menuToggle) return;
        
        const isClickInsideNav = navLinks.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}); 
