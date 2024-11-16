document.addEventListener('DOMContentLoaded', function() {
  
    const themeToggleButton = document.getElementById('theme-toggle');
    const settingsButton = document.getElementById('settings-button');
    const settingsPanel = document.querySelector('.settings-panel');

    
    const themeRadioButtons = document.querySelectorAll('input[name="theme"]');
    themeRadioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            document.documentElement.setAttribute('data-theme', this.value);
        });
    });

    
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
    }


    settingsButton.addEventListener('mouseover', function() {
        settingsPanel.style.display = 'block';
    });

    settingsButton.addEventListener('mouseleave', function() {
        settingsPanel.style.display = 'none';
    });


    themeToggleButton.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.getElementById('light-theme').checked = true; // Синхронизация с радиокнопкой
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('dark-theme').checked = true;
        }
    });


    const scrollArrow = document.getElementById('scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            document.querySelector('#links-section').scrollIntoView({ behavior: 'smooth' });
        });
    }


    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });


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

  
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });


    const portfolioItems = document.querySelectorAll('.portfolio-item');
    window.addEventListener('scroll', () => {
        portfolioItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight - 100) {
                item.classList.add('visible');
            }
        });
    });
});
