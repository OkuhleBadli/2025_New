document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    // Hamburger menu toggle
    menuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('show');
    });

    // Theme toggle functionality
    const themeToggleButton = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    const setThemeColors = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    };

    // Check the saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setThemeColors(savedTheme);
    } else {
        setThemeColors('light'); // Default theme
    }

    // Toggle theme on button click
    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';
        setThemeColors(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});
