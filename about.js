document.addEventListener('DOMContentLoaded', function() {
    // Update --header-height dynamically
    function updateHeaderHeight() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const height = navbar.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${height}px`);
        }
    }

    // Initial update and listen for resize/scroll
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('scroll', updateHeaderHeight);

    // Check for saved theme in localStorage and apply it
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('i');
            if (savedTheme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                darkModeToggle.setAttribute('aria-label', 'Toggle light mode');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
            }
        }
    }

    // Dark Mode Toggle Functionality
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                this.querySelector('i').classList.remove('fa-sun');
                this.querySelector('i').classList.add('fa-moon');
                this.setAttribute('aria-label', 'Toggle dark mode');
                console.log('Light mode enabled');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                this.querySelector('i').classList.remove('fa-moon');
                this.querySelector('i').classList.add('fa-sun');
                this.setAttribute('aria-label', 'Toggle light mode');
                console.log('Dark mode enabled');
            }
        });
    }

    // Floating Action Button Click Tracking (WhatsApp and Call)
    const fabButtons = document.querySelectorAll('.fab');
    fabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('whatsapp') ? 'whatsapp' : 'phone';
            console.log(`FAB clicked: ${platform}`);
            // Links should work automatically via href (WhatsApp or tel:)
        });
    });

    // Team member modal functionality
    const teamCards = document.querySelectorAll('.team-card');
    const teamModal = document.createElement('div');
    teamModal.className = 'team-modal';
    document.body.appendChild(teamModal);

    // Create modal content structure
    teamModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">×</span>
            <div class="modal-team-member">
                <div class="modal-team-image"></div>
                <div class="modal-team-info">
                    <h2 class="modal-team-name"></h2>
                    <p class="modal-team-position"></p>
                    <div class="modal-team-bio"></div>
                    <div class="modal-team-social"></div>
                </div>
            </div>
        </div>
    `;

    // Add click event to each team card
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const memberImg = this.querySelector('.team-image img').src;
            const memberName = this.querySelector('h3').textContent;
            const memberPosition = this.querySelector('.position').textContent;
            const memberBio = this.querySelector('.bio').textContent;
            const memberSocial = this.querySelector('.social-links').innerHTML;

            // Populate modal with team member data
            teamModal.querySelector('.modal-team-image').innerHTML = `<img src="${memberImg}" alt="${memberName}">`;
            teamModal.querySelector('.modal-team-name').textContent = memberName;
            teamModal.querySelector('.modal-team-position').textContent = memberPosition;
            teamModal.querySelector('.modal-team-bio').textContent = memberBio;
            teamModal.querySelector('.modal-team-social').innerHTML = memberSocial;

            // Show modal
            teamModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functionality
    teamModal.querySelector('.close-modal').addEventListener('click', function() {
        teamModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    teamModal.addEventListener('click', function(e) {
        if (e.target === this) {
            teamModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Press logo animation
    const pressLogos = document.querySelectorAll('.press-logos img');
    pressLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.opacity = '1';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.8';
        });
    });

    // Philosophy card hover effects
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.philosophy-icon');
            icon.style.transform = 'rotate(15deg) scale(1.1)';
            icon.style.color = '#fff';
            this.style.backgroundColor = 'var(--rose-gold)';
            this.style.color = '#fff';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.philosophy-icon');
            icon.style.transform = 'rotate(0) scale(1)';
            icon.style.color = 'var(--rose-gold)';
            this.style.backgroundColor = 'var(--bg-color)';
            this.style.color = 'inherit';
        });
    });

    // Social Media Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    }

    // Initialize counters when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const counterSection = document.querySelector('.social-media-section');
    if (counterSection) {
        observer.observe(counterSection);
    }

    // Add click tracking for social links
    document.querySelectorAll('.social-card').forEach(card => {
        card.addEventListener('click', function() {
            const platform = this.classList[1]; // Gets the platform class (instagram, youtube, etc.)
            console.log(`Social link clicked: ${platform}`);
        });
    });
});