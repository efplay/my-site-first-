document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы кнопки переключения темы и настройки
    const themeToggleButton = document.getElementById('theme-toggle');
    const settingsButton = document.getElementById('settings-button');
    let settingsPanel = document.querySelector('.settings-panel');

    // Таймер для задержки скрытия панели настроек
    let hideTimeout;

    // Создаем панель настроек и добавляем в DOM, если её нет
    if (!settingsPanel) {
        const newSettingsPanel = document.createElement('div');
        newSettingsPanel.className = 'settings-panel';
        newSettingsPanel.innerHTML = `
            <div>
                <label for="light-theme">Light Theme</label>
                <input type="radio" name="theme" value="light" id="light-theme" checked>
                <label for="dark-theme">Dark Theme</label>
                <input type="radio" name="theme" value="dark" id="dark-theme">
            </div>
        `;
        document.body.appendChild(newSettingsPanel);
        settingsPanel = newSettingsPanel; // Обновляем ссылку на панель
    }

    // Показ панели настроек при наведении
    if (settingsButton && settingsPanel) {
        settingsButton.addEventListener('mouseover', function() {
            clearTimeout(hideTimeout); // Останавливаем таймер скрытия, если мышь снова наведена
            settingsPanel.style.display = 'block';
        });

        settingsButton.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(function() {
                settingsPanel.style.display = 'none';
            }, 500); // Задержка перед скрытием (500 мс)
        });

        settingsPanel.addEventListener('mouseover', function() {
            clearTimeout(hideTimeout); // Останавливаем таймер скрытия, если мышь над панелью
        });

        settingsPanel.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(function() {
                settingsPanel.style.display = 'none';
            }, 500); // Задержка перед скрытием (500 мс)
        });
    }

    // Теперь, когда панель добавлена в DOM, мы можем добавлять обработчики событий для радиокнопок
    const themeRadioButtons = document.querySelectorAll('input[name="theme"]');
    themeRadioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            document.documentElement.setAttribute('data-theme', this.value);
        });
    });

    // Переключение темы при нажатии на кнопку Toggle
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                document.getElementById('light-theme').checked = true; // Синхронизация с радиокнопкой
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.getElementById('dark-theme').checked = true;
            }
        });
    }

    // Плавный скролл при нажатии на стрелку
    const scrollArrow = document.getElementById('scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            document.querySelector('#links-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Прокрутка страницы вверх при перезагрузке
    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });

    // Подсветка активной секции в меню
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Плавный скролл при клике на ссылки меню
    const navLink = document.querySelectorAll('.nav-link');
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Анимация для блока портфолио при скролле
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (portfolioItems) {
        window.addEventListener('scroll', () => {
            portfolioItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                if (itemTop < window.innerHeight - 100) {
                    item.classList.add('visible');
                }
            });
        });
    }
});

// проверка через дом explore more
document.addEventListener('DOMContentLoaded', function() {
    const exploreSection = document.querySelector('.explore-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });
    observer.observe(exploreSection);
});