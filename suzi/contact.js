// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // In a real app, you would send this to your backend (Supabase)
        console.log('Contact form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // WhatsApp button functionality
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, this would open WhatsApp with a pre-filled message
        window.open('https://wa.me/15551234567?text=Hello%20Glam-by%20Suzii,%20I%20have%20a%20question', '_blank');
    });
    
    // Directions button functionality
    const directionsBtn = document.querySelector('.directions-btn');
    directionsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, this would open Google Maps with directions
        window.open('https://www.google.com/maps/dir//Empire+State+Building,+350+5th+Ave,+New+York,+NY+10118', '_blank');
    });
});