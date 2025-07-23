// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize booking modal
    const bookingModal = document.querySelector('.booking-modal');
    const bookButtons = document.querySelectorAll('.book-btn');
    const closeModal = document.querySelector('.booking-modal .close-modal');
    const serviceNameInput = document.getElementById('service-name');
    
    // Open modal when book button is clicked
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
    
    // Booking form submission
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', function(e) {
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
        
        // In a real app, you would send this to your backend (Supabase)
        console.log('Booking submitted:', formData);
        
        // Show success message
        alert(`Thank you for booking ${formData.service}! We'll contact you shortly to confirm your appointment.`);
        
        // Reset form and close modal
        bookingForm.reset();
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Initialize testimonial slider if on page
    if (document.querySelector('.testimonial-slider')) {
        initTestimonialSlider();
    }
});

// Testimonial Slider
function initTestimonialSlider() {
    // Testimonial data
    const testimonials = [
        {
            quote: "Suzii did my wedding makeup and I couldn't have been happier. She listened to exactly what I wanted and made me feel so beautiful on my special day.",
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