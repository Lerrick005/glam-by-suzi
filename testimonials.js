// Testimonials Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Testimonial data (would normally come from Supabase)
    const testimonials = [
        {
            id: 1,
            text: "Suzii did an amazing job on my wedding makeup. I felt so beautiful and the makeup lasted all day and night through tears and dancing! She listened to exactly what I wanted and delivered beyond my expectations.",
            client: {
                name: "Emily R.",
                avatar: "images/clients/emily.jpg",
                service: "Bridal Makeup"
            },
            rating: 5,
            date: "2023-05-15"
        },
        {
            id: 2,
            text: "The makeup lesson was worth every penny. I've always struggled with doing my own makeup, but after just one session with Suzii, I feel so much more confident. She explained everything in a way that made sense for my face shape and skin type.",
            client: {
                name: "Sophia K.",
                avatar: "images/clients/sophia.jpg",
                service: "Makeup Lesson"
            },
            rating: 5,
            date: "2023-04-22"
        },
        {
            id: 3,
            text: "I booked the Evening Glam look for a charity gala and received so many compliments all night. The makeup photographed beautifully and didn't budge even after hours of dancing. Suzii is truly talented!",
            client: {
                name: "Jessica T.",
                avatar: "images/clients/jessica.jpg",
                service: "Evening Glam"
            },
            rating: 4,
            date: "2023-03-10"
        },
        {
            id: 4,
            text: "As a bridesmaid, I had my makeup done by Suzii and it was perfect! She made sure all of us looked cohesive but still like ourselves. The makeup lasted through an emotional ceremony and a hot reception.",
            client: {
                name: "Olivia M.",
                avatar: "images/clients/olivia.jpg",
                service: "Bridal Party"
            },
            rating: 5,
            date: "2023-06-05"
        },
        {
            id: 5,
            text: "I was nervous about getting my makeup done professionally for the first time, but Suzii made me feel so comfortable. She explained each step and checked in to make sure I was happy with everything. The result was stunning!",
            client: {
                name: "Ava S.",
                avatar: "images/clients/ava.jpg",
                service: "Special Occasion"
            },
            rating: 5,
            date: "2023-02-18"
        },
        {
            id: 6,
            text: "Suzii transformed my look completely for my headshots. The makeup was natural enough that it still looked like me, but polished and professional. The photos turned out amazing thanks to her skills!",
            client: {
                name: "Isabella L.",
                avatar: "images/clients/isabella.jpg",
                service: "Professional Makeup"
            },
            rating: 4,
            date: "2023-01-30"
        }
    ];

    // Load testimonials
    function loadTestimonials() {
        const testimonialContainer = document.querySelector('.testimonial-cards');
        testimonialContainer.innerHTML = '';
        
        testimonials.forEach(testimonial => {
            const ratingStars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
            
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            testimonialCard.innerHTML = `
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="client-info">
                    <div class="client-avatar">
                        <img src="${testimonial.client.avatar}" alt="${testimonial.client.name}">
                    </div>
                    <div class="client-details">
                        <div class="client-name">${testimonial.client.name}</div>
                        <div class="client-service">${testimonial.client.service}</div>
                        <div class="testimonial-rating">${ratingStars}</div>
                    </div>
                </div>
            `;
            testimonialContainer.appendChild(testimonialCard);
        });
    }
    
    // Video testimonial functionality
    const videoModal = document.querySelector('.video-modal');
    const playButtons = document.querySelectorAll('.video-card .play-btn');
    const closeModal = document.querySelector('.video-modal .close-modal');
    const videoIframe = document.getElementById('testimonial-video');
    
    // Video data (would normally come from a database)
    const testimonialVideos = [
        'https://www.youtube.com/embed/VIDEO_ID_1',
        'https://www.youtube.com/embed/VIDEO_ID_2',
        'https://www.youtube.com/embed/VIDEO_ID_3'
    ];
    
    // Open modal when play button is clicked
    playButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            videoIframe.src = testimonialVideos[index];
            videoModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        videoIframe.src = ''; // Stop video when closing
    });
    
    // Close when clicking outside modal
    videoModal.addEventListener('click', function(e) {
        if (e.target === this) {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            videoIframe.src = ''; // Stop video when closing
        }
    });
    
    // Load testimonials on page load
    loadTestimonials();
});