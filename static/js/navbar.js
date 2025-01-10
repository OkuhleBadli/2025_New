document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    // Hamburger menu toggle
    menuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('show');
    });
});
