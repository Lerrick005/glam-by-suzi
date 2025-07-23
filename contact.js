document.addEventListener('DOMContentLoaded', function() {
    // Initialize booking modal
    const bookingModal = document.querySelector('.booking-modal');
    const bookButtons = document.querySelectorAll('.book-btn');
    const closeModal = document.querySelector('.booking-modal .close-modal');
    const serviceNameInput = document.getElementById('service-name');
    
    // Open modal when book button is clicked
    if (bookButtons && bookingModal && closeModal && serviceNameInput) {
        bookButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.getAttribute('data-service');
                serviceNameInput.value = serviceName;
                
                // Set modal title
                document.querySelector('.booking-modal h2').textContent = `Book ${serviceName}`;
                
                // Show modal
                bookingModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close when clicking outside modal
        bookingModal.addEventListener('click', function(e) {
            if (e.target === this) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Toast notification function
    function showToast(message, success = true) {
        const toast = document.getElementById('booking-success');
        const responseMessage = document.getElementById('responseMessage');
        if (toast) {
            toast.textContent = message;
            toast.style.background = success ? '#4BB543' : '#e74c3c';
            toast.style.display = 'block';
            setTimeout(() => toast.style.display = 'none', 4000);
        }
        if (responseMessage) {
            responseMessage.textContent = message;
            responseMessage.style.color = success ? '#4BB543' : '#e74c3c';
        } else if (!toast) {
            // Fallback to alert if neither toast nor responseMessage is found
            alert(message);
        }
    }
    
    // Booking form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                service: serviceNameInput.value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                notes: document.getElementById('notes').value
            };
            
            // Client-side email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                showToast('❌ Invalid email format.', false);
                return;
            }
            
            try {
                const res = await fetch('http://localhost:3000/api/book', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                const data = await res.json();
                
                if (data.success) {
                    showToast(`✅ Thank you, ${formData.name || 'Customer'}! Your booking for "${formData.service}" on ${formData.date} was received. We'll contact you soon.`);
                    bookingForm.reset();
                    bookingModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else {
                    showToast('❌ Booking failed. Please try again.', false);
                }
            } catch (error) {
                showToast('❌ Something went wrong. Please try again later.', false);
                console.error('Booking error:', error);
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form') || document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = Object.fromEntries(new FormData(this));
            formData.phone = formData.phone || '';
            formData.subject = formData.subject || '';
            
            // Client-side email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                showToast('❌ Invalid email format.', false);
                return;
            }
            
            try {
                const res = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                const data = await res.json();
                
                if (data.success) {
                    showToast(`✅ Thank you, ${formData.name || 'Customer'}! Your message was received. We'll be in touch soon.`);
                    contactForm.reset();
                } else {
                    showToast('❌ Message failed. Please try again.', false);
                }
            } catch (error) {
                showToast('❌ Something went wrong. Please try again later.', false);
                console.error('Contact error:', error);
            }
        });
    }
    
    // WhatsApp button functionality
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://wa.me/0705627672?text=Hello%20Glam-by%20Suzi,%20I%20have%20a%20question', '_blank');
        });
    }
    
    // Directions button functionality
    const directionsBtn = document.querySelector('.directions-btn');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://www.google.com/maps/place/Saka,+Kangundo+Rd,+Nairobi/@-1.3089242,36.9872094,15z/data=!4m6!3m5!1s0x182f47d54a9f6ed3:0xa06c6cbd8ff5a92c!8m2!3d-1.3089245!4d36.9972094!16s%2f3%2f0a06c6cbd8ff5a92c', '_blank');
        });
    }
    
    // Initialize testimonial slider if on page
    if (document.querySelector('.testimonial-slider')) {
        initTestimonialSlider();
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('❌ Invalid email format.', false);
                return;
            }
            showToast('✅ Thank you for subscribing!', true);
            this.reset();
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

// Testimonial Slider
function initTestimonialSlider() {
    // Testimonial data
    const testimonials = [
        {
            quote: "Suzi did my wedding makeup and I couldn't have been happier. She listened to exactly what I wanted and made me feel so beautiful on my special day.",
            author: "Emily R.",
            service: "Bridal Makeup"
        },
        {
            quote: "The makeup lesson was worth every penny. I learned so many techniques that work with my face shape and skin type. My everyday makeup has improved dramatically!",
            author: "Sophia K.",
            service: "Makeup Lesson"
        },
        {
            quote: "I booked the Evening Glam for a gala event and received so many compliments. The makeup lasted all night and photographed beautifully.",
            author: "Jessica T.",
            service: "Evening Glam"
        }
    ];
    
    // Load testimonials into slider
    const slider = document.querySelector('.testimonial-slider');
    
    testimonials.forEach(testimonial => {
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        slide.innerHTML = `
            <p>"${testimonial.quote}"</p>
            <div class="testimonial-author">${testimonial.author}</div>
            <div class="testimonial-service">${testimonial.service}</div>
        `;
        slider.appendChild(slide);
    });
    
    // Initialize Slick slider if loaded
    if (typeof $ !== 'undefined' && $.fn.slick) {
        $(document).ready(function(){
            $('.testimonial-slider').slick({
                dots: true,
                arrows: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true
            });
        });
    } else {
        // Fallback if Slick isn't loaded
        console.warn('Slick slider not loaded - using simple display');
        const slides = document.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }
        
        // Show first slide initially
        showSlide(0);
        
        // Auto-rotate slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
}