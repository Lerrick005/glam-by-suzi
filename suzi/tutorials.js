// tutorials.js - Glam-by Suzii Tutorials Functionality
// Handles tutorial filtering, thumbnail display, video modal, and form submission

// ============================================================================
// Tutorial Data
// ============================================================================

/**
 * Array of tutorials with details for display and video playback.
 * Each tutorial includes id, name, category, duration, description, and video URL.
 */
const TUTORIALS = [
    {
        id: 1,
        name: "Flawless Base Routine",
        category: "face",
        duration: "15 min",
        description: "Learn how to create the perfect base for any makeup look.",
        videoUrl: "https://www.youtube.com/embed/MJGllhZNx5o"
    },
    {
        id: 2,
        name: "Smokey Eye Masterclass",
        category: "eyes",
        duration: "22 min",
        description: "Create the perfect smokey eye for any occasion.",
        videoUrl: "https://www.youtube.com/embed/DjLbcB7J4w4" // Replace with real URL
    },
    {
        id: 3,
        name: "Perfect Lip Application",
        category: "lips",
        duration: "10 min",
        description: "Get perfectly defined lips that last all day.",
        videoUrl: "https://www.youtube.com/embed/bmygzxaV7Hc?t=12" // Replace with real URL
    },
    {
        id: 4,
        name: "Bridal Makeup Guide",
        category: "bridal",
        duration: "30 min",
        description: "Complete bridal makeup that lasts all day and photographs beautifully.",
        videoUrl: "https://www.youtube.com/embed/rmOBMRPGYKo?t=41" // Replace with real URL
    },
    {
        id: 5,
        name: "Contouring 101",
        category: "face",
        duration: "18 min",
        description: "Learn how to sculpt and define your facial features.",
        videoUrl: "https://www.youtube.com/embed/-O2ePgFMgyQ?t=11" // Replace with real URL
    },
    {
        id: 6,
        name: "Natural Eye Makeup",
        category: "eyes",
        duration: "12 min",
        description: "Subtle eye makeup that enhances your natural beauty.",
        videoUrl: "https://www.youtube.com/embed/IJDQ8-zCdYU" // Replace with real URL
    }
];

// ============================================================================
// DOM Elements
// ============================================================================

const DOM = {
    categoryTabs: document.querySelectorAll('.category-tabs .tab-btn'),
    tutorialCards: document.querySelectorAll('.tutorial-card'),
    videoModal: document.querySelector('.video-modal'),
    videoIframe: document.getElementById('tutorial-video'),
    closeModalBtn: document.querySelector('.close-modal'),
    playButtons: document.querySelectorAll('.play-btn'),
    watchButtons: document.querySelectorAll('.watch-btn'),
    newsletterForm: document.querySelector('.newsletter-form')
};

// ============================================================================
// Rendering Functions
// ============================================================================

/**
 * Sets YouTube thumbnails for each tutorial card using the video ID.
 */
function initializeThumbnails() {
    console.log('Initializing thumbnails');
    DOM.tutorialCards.forEach(card => {
        const tutorialId = parseInt(card.getAttribute('data-id'));
        const tutorial = TUTORIALS.find(t => t.id === tutorialId);
        if (tutorial) {
            const thumbnail = card.querySelector('.tutorial-thumbnail');
            if (thumbnail) {
                const videoId = extractVideoId(tutorial.videoUrl);
                if (videoId) {
                    thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    thumbnail.alt = `${tutorial.name} Thumbnail`;
                    console.log(`Thumbnail set for tutorial ID: ${tutorialId}`);
                } else {
                    console.warn(`Invalid video URL for tutorial ID: ${tutorialId}`);
                    thumbnail.src = 'placeholder.jpg'; // Fallback image
                }
            } else {
                console.warn(`Thumbnail element not found for tutorial ID: ${tutorialId}`);
            }
        } else {
            console.warn(`Tutorial not found for ID: ${tutorialId}`);
        }
    });
}

/**
 * Extracts YouTube video ID from a URL.
 * @param {string} url - YouTube video URL.
 * @returns {string|null} Video ID or null if invalid.
 */
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

/**
 * Filters tutorial cards by category, toggling display.
 * @param {string} category - Category to filter ('eyes', 'face', 'lips', 'bridal').
 */
function filterTutorials(category = 'eyes') {
    console.log('Filtering tutorials for category:', category);
    if (!['eyes', 'face', 'lips', 'bridal'].includes(category)) {
        console.error('Invalid category:', category);
        return;
    }
    let visibleCount = 0;
    DOM.tutorialCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (cardCategory === category) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    console.log(`Displayed ${visibleCount} tutorials`);
}

/**
 * Opens the video modal and loads the tutorial video.
 * @param {number} tutorialId - ID of the tutorial to display.
 */
function openVideoModal(tutorialId) {
    console.log('Opening video modal for tutorial ID:', tutorialId);
    const tutorial = TUTORIALS.find(t => t.id === tutorialId);
    if (!tutorial) {
        console.error('Tutorial not found:', tutorialId);
        return;
    }
    if (!extractVideoId(tutorial.videoUrl)) {
        console.error('Invalid video URL for tutorial ID:', tutorialId);
        alert('Sorry, this video is not available.');
        return;
    }
    DOM.videoIframe.src = tutorial.videoUrl + '?autoplay=1';
    DOM.videoModal.style.display = 'block';
    DOM.videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    DOM.videoIframe.focus();
}

/**
 * Closes the video modal and resets the iframe.
 */
function closeVideoModal() {
    console.log('Closing video modal');
    DOM.videoIframe.src = '';
    DOM.videoModal.style.display = 'none';
    DOM.videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

/**
 * Handles newsletter form submission.
 */
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = DOM.newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    if (!email) {
        console.warn('Newsletter form submitted with empty email');
        alert('Please enter a valid email address.');
        return;
    }
    console.log('Newsletter subscription attempt:', email);
    alert('Thank you for subscribing!'); // Placeholder for actual submission logic
    emailInput.value = '';
}

// ============================================================================
// Event Handlers
// ============================================================================

/**
 * Handles category tab clicks for filtering tutorials.
 * @param {Event} e - Click event.
 */
function handleCategoryTabClick(e) {
    const category = e.currentTarget.getAttribute('data-category');
    console.log('Tab clicked:', category);
    if (!['eyes', 'face', 'lips', 'bridal'].includes(category)) {
        console.error('Invalid category:', category);
        return;
    }
    DOM.categoryTabs.forEach(t => t.classList.remove('active'));
    e.currentTarget.classList.add('active');
    filterTutorials(category);
}

/**
 * Handles click events for dynamic buttons (play, watch, close) and modal background.
 * @param {Event} e - Click event.
 */
function handleDynamicClick(e) {
    const target = e.target.closest('.play-btn, .watch-btn, .close-modal');
    if (!target) {
        if (e.target === DOM.videoModal) {
            console.log('Clicked outside modal, closing');
            closeVideoModal();
        }
        return;
    }

    if (target.classList.contains('play-btn') || target.classList.contains('watch-btn')) {
        const tutorialId = parseInt(target.getAttribute('data-id'));
        console.log(`${target.classList.contains('play-btn') ? 'Play' : 'Watch'} button clicked:`, tutorialId);
        if (!tutorialId) {
            console.error('No data-id found on button');
            return;
        }
        openVideoModal(tutorialId);
        return;
    }

    if (target.classList.contains('close-modal')) {
        console.log('Close modal clicked');
        closeVideoModal();
    }
}

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initializes the tutorials page on DOM load.
 */
function initTutorials() {
    console.log('Initializing tutorials');
    if (!DOM.tutorialCards.length || !DOM.categoryTabs.length || !DOM.videoModal || !DOM.videoIframe || !DOM.newsletterForm) {
        console.error('Missing critical DOM elements:', DOM);
        return;
    }

    initializeThumbnails();
    filterTutorials();

    DOM.categoryTabs.forEach(tab => tab.addEventListener('click', handleCategoryTabClick));
    DOM.playButtons.forEach(btn => btn.addEventListener('click', handleDynamicClick));
    DOM.watchButtons.forEach(btn => btn.addEventListener('click', handleDynamicClick));
    DOM.closeModalBtn.addEventListener('click', handleDynamicClick);
    DOM.videoModal.addEventListener('click', handleDynamicClick);
    DOM.videoModal.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            console.log('Escape key pressed, closing modal');
            closeVideoModal();
        }
    });
    DOM.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

document.addEventListener('DOMContentLoaded', initTutorials);