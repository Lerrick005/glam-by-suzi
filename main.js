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

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Theme Toggle
    const themeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Sticky Header
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
            updateHeaderHeight(); // Update height on scroll for .scrolled changes
        });
    }

    // Hero Slider (Home page)
    const slides = document.querySelectorAll('.hero .slide');
    const dots = document.querySelectorAll('.hero .slider-nav .dot');
    let currentSlide = 0;

    if (slides.length && dots.length) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        let slideInterval = setInterval(nextSlide, 5000);

        const slider = document.querySelector('.hero');
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonials-slider .dot');
    let currentTestimonial = 0;

    if (testimonials.length && testimonialDots.length) {
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            currentTestimonial = index;
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        setInterval(nextTestimonial, 6000);

        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Appointment Form (Services or Contact page)
    const bookingForm = document.getElementById('booking-form');
    const appointmentModal = document.getElementById('appointment-modal');
    const closeModal = document.querySelector('.close-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const modalAppointmentDetails = document.getElementById('modal-appointment-details');

    if (bookingForm && appointmentModal && closeModal && closeModalBtn && modalAppointmentDetails) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            
            modalAppointmentDetails.innerHTML = `
                <strong>Name:</strong> ${name}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Phone:</strong> ${phone}<br>
                <strong>Service:</strong> ${service}<br>
                <strong>Date:</strong> ${formattedDate}<br>
                <strong>Time:</strong> ${formattedTime}
            `;
            
            appointmentModal.classList.add('active');
            
            bookingForm.reset();
        });

        closeModal.addEventListener('click', () => {
            appointmentModal.classList.remove('active');
        });

        closeModalBtn.addEventListener('click', () => {
            appointmentModal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === appointmentModal) {
                appointmentModal.classList.remove('active');
            }
        });

        const appointmentInputs = bookingForm.querySelectorAll('input, select');
        
        appointmentInputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    input.classList.remove('invalid');
                }
            });
            
            input.addEventListener('blur', () => {
                if (!input.checkValidity()) {
                    input.classList.add('invalid');
                }
            });
        });

        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').setAttribute('min', today);
    }

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .testimonial-card, .social-card, .philosophy-card, .team-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});