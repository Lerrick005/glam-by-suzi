```javascript
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
    
    // Toast notification function
    function showToast(message, success = true) {
        const toast = document.getElementById('booking-success');
        toast.textContent = message;
        toast.style.background = success ? '#4BB543' : '#e74c3c';
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 4000);
    }
    
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
        
        // Simulate backend response (replace with actual backend call in production)
        // In a real app, you would send formData to your backend (e.g., Supabase)
        const data = { success: true }; // Mock success response
        console.log('Booking submitted:', formData);
        
        if (data.success) {
            showToast(`✅ Thank you, ${formData.name || 'Customer'}! Your booking for "${formData.service}" on ${formData.date} was received. We'll contact you soon.`);
            bookingForm.reset();
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            showToast('❌ Booking failed. Please try again.', false);
        }
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
```