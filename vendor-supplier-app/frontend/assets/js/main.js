document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
    });
    
    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-x-full');
    });

    // Language dropdown
    const languageButton = document.getElementById('languageButton');
    const languageDropdown = document.getElementById('languageDropdown');
    
    languageButton.addEventListener('click', () => {
        languageDropdown.classList.toggle('hidden');
    });

    // User dropdown
    const userMenuButton = document.getElementById('userMenuButton');
    const userDropdown = document.getElementById('userDropdown');
    
    userMenuButton.addEventListener('click', () => {
        userDropdown.classList.toggle('hidden');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (!languageButton.contains(event.target)) {
            languageDropdown.classList.add('hidden');
        }
        if (!userMenuButton.contains(event.target)) {
            userDropdown.classList.add('hidden');
        }
    });

    // Initialize components
    if (typeof initDashboard === 'function') {
        initDashboard();
    }
    
    if (typeof initProducts === 'function') {
        initProducts();
    }
    
    // Load more functionality
    document.querySelectorAll('.load-more').forEach(button => {
        button.addEventListener('click', function() {
            this.textContent = 'Loading...';
            setTimeout(() => {
                // Simulate loading
                this.textContent = 'Load More';
            }, 1000);
        });
    });
});

