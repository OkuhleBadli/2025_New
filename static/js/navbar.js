// Example JavaScript (Optional)
document.querySelectorAll('.navbar-item').forEach(item => {
    item.addEventListener('click', () => {
        console.log('Navbar item clicked!');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set colors for light and dark mode
    const setThemeColors = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
    };

    // Check the saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setThemeColors(savedTheme);
    } else {
        // Default theme if no preference is saved
        setThemeColors('light');
    }

    // Toggle theme on button click
    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';
        setThemeColors(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});
