// gallery.js - Glam-by Suzii Gallery Functionality
// Handles gallery item rendering, filtering, and lightbox modal display

// ============================================================================
// Gallery Data
// ============================================================================

/**
 * Array of gallery images with details for display and lightbox.
 * Each image includes id, image (src), category, and caption.
 */
const galleryItems = [
    // Bridal Category
    {
        id: 1,
        image: "soft romantic look.png",
        category: "bridal",
        caption: "Bridal Makeup - Soft Romantic Look"
    },
    {
        id: 2,
        image: "classic elegance.jpg",
        category: "bridal",
        caption: "Bridal Makeup - Classic Elegance"
    },
    {
        id: 3,
        image: "bold and beautiful.jpg",
        category: "bridal",
        caption: "Bridal Makeup - Bold and Beautiful"
    },
    {
        id: 4,
        image: "natural radiance.jpg",
        category: "bridal",
        caption: "Bridal Makeup - Natural Radiance"
    },
    {
        id: 5,
        image: "golden hour glow.jpg",
        category: "bridal",
        caption: "Bridal Makeup - Golden Hour Glow"
    },
    {
        id: 6,
        image: "timeless glam.jpg",
        category: "bridal",
        caption: "Bridal Makeup - Timeless Glam"
    },
    // Editorial Category
    {
        id: 7,
        image: "high fashion.jpg",
        category: "editorial",
        caption: "Editorial Makeup - High Fashion"
    },
    {
        id: 8,
        image: "avant garde.jpg",
        category: "editorial",
        caption: "Editorial Makeup - Avant Garde"
    },
    {
        id: 9,
        image: "futuristic vibes.jpg",
        category: "editorial",
        caption: "Editorial Makeup - Futuristic Vibes"
    },
    // Natural Category
    {
        id: 10,
        image: "everyday glow.jpg",
        category: "natural",
        caption: "Natural Makeup - Everyday Glow"
    },
    {
        id: 11,
        image: "freshed faced.jpg",
        category: "natural",
        caption: "Natural Makeup - Fresh Faced"
    },
    {
        id: 12,
        image: "dewy skin.jpg",
        category: "natural",
        caption: "Natural Makeup - Dewy Skin"
    },
    // Special FX Category
    {
        id: 13,
        image: "fantasy creature.jpg",
        category: "specialfx",
        caption: "Special FX - Fantasy Creature"
    },
    {
        id: 14,
        image: "aging effect.jpg",
        category: "specialfx",
        caption: "Special FX - Aging Effect"
    },
    {
        id: 15,
        image: "alien.jpg",
        category: "specialfx",
        caption: "Special FX - Sci-Fi Alien"
    },
    // Hair Category
    {
        id: 16,
        image: "brazillian.jpg",
        category: "hair",
        caption: "Brazilian Body Wave Wig - 22 Inch"
    },
    {
        id: 17,
        image: "straight.jpg",
        category: "hair",
        caption: "Straight Human Hair Wig - 18 Inch"
    },
    {
        id: 18,
        image: "kinky.jpg",
        category: "hair",
        caption: "Kinky Curly Lace Front Wig - 20 Inch"
    },
    {
        id: 19,
        image: "bob.jpg",
        category: "hair",
        caption: "Bob Cut Wig - Short Natural Look"
    },
    {
        id: 20,
        image: "blonde.jpg",
        category: "hair",
        caption: "Blonde Highlight Wig - 24 Inch"
    },
    {
        id: 21,
        image: "afro.jpg",
        category: "hair",
        caption: "Afro Puff Wig - Natural Texture"
    },
    {
        id: 22,
        image: "wave.jpg",
        category: "hair",
        caption: "Deep Wave Wig - 26 Inch"
    },
    {
        id: 23,
        image: "pixie.jpg",
        category: "hair",
        caption: "Pixie Cut Synthetic Wig"
    },
    {
        id: 24,
        image: "lace.jpg",
        category: "hair",
        caption: "Lace Closure Wig - 16 Inch"
    },
    {
        id: 25,
        image: "ombre.jpg",
        category: "hair",
        caption: "Ombre Burgundy Wig - 20 Inch"
    },
    {
        id: 26,
        image: "long.jpg",
        category: "hair",
        caption: "Long Layered Wig - 28 Inch"
    }
];

// ============================================================================
// DOM Elements
// ============================================================================

const DOM = {
    filterTabs: document.querySelectorAll('.filter-tabs .filter-btn'),
    galleryGrid: document.querySelector('.gallery-grid'),
    lightboxModal: document.querySelector('.lightbox-modal'),
    lightboxImage: document.getElementById('lightbox-image'),
    lightboxCaption: document.querySelector('.lightbox-caption'),
    closeLightbox: document.querySelector('.close-lightbox'),
    prevBtn: document.querySelector('.prev'),
    nextBtn: document.querySelector('.next')
};

// ============================================================================
// State Management
// ============================================================================

let currentItemIndex = 0;
let currentFilteredItems = [];
let currentCategory = 'bridal';

// ============================================================================
// Rendering Functions
// ============================================================================

/**
 * Loads and renders gallery items based on the filter category.
 * @param {string} filter - Category to filter ('bridal', 'editorial', 'specialfx', 'natural', 'hair').
 */
function loadGalleryItems(filter = 'bridal') {
    console.log('Loading gallery items for filter:', filter);
    DOM.galleryGrid.innerHTML = '';
    const filteredItems = galleryItems.filter(item => item.category === filter);
    
    filteredItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-id', item.id);
        galleryItem.setAttribute('data-category', item.category);
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.caption}" class="gallery-image" loading="lazy">
            <div class="gallery-overlay">
                <div class="zoom-icon">🔍</div>
            </div>
        `;
        DOM.galleryGrid.appendChild(galleryItem);
    });

    currentFilteredItems = filteredItems;
    console.log(`Displayed ${filteredItems.length} images`);
    addGalleryEventListeners();
}

/**
 * Adds click event listeners to gallery items for lightbox opening.
 */
function addGalleryEventListeners() {
    console.log('Adding gallery event listeners');
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            console.log('Gallery item clicked:', itemId);
            openLightbox(itemId);
        });
    });
}

/**
 * Opens the lightbox modal with the selected image.
 * @param {number} itemId - ID of the image to display.
 */
function openLightbox(itemId) {
    console.log('Opening lightbox for item ID:', itemId);
    currentFilteredItems = galleryItems.filter(item => item.category === currentCategory);
    currentItemIndex = currentFilteredItems.findIndex(item => item.id === itemId);
    
    if (currentItemIndex === -1) {
        console.error('Item not found in current filter:', itemId);
        return;
    }

    updateLightbox();
    DOM.lightboxModal.style.display = 'block';
    DOM.lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    DOM.lightboxModal.focus();
}

/**
 * Updates the lightbox content with the current image and caption.
 */
function updateLightbox() {
    const item = currentFilteredItems[currentItemIndex];
    console.log('Updating lightbox for item ID:', item.id);
    DOM.lightboxImage.src = item.image;
    DOM.lightboxImage.alt = item.caption;
    DOM.lightboxCaption.textContent = item.caption;
}

/**
 * Closes the lightbox modal and resets state.
 */
function closeLightbox() {
    console.log('Closing lightbox');
    DOM.lightboxModal.style.display = 'none';
    DOM.lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

/**
 * Navigates to the previous or next image in the current category.
 * @param {string} direction - 'prev' or 'next'.
 */
function navigate(direction) {
    console.log(`Navigating lightbox: ${direction}`);
    if (direction === 'prev') {
        currentItemIndex = (currentItemIndex - 1 + currentFilteredItems.length) % currentFilteredItems.length;
    } else {
        currentItemIndex = (currentItemIndex + 1) % currentFilteredItems.length;
    }
    updateLightbox();
}

// ============================================================================
// Event Handlers
// ============================================================================

/**
 * Handles filter tab clicks for filtering gallery items.
 * @param {Event} e - Click event.
 */
function handleFilterTabClick(e) {
    const filter = e.currentTarget.getAttribute('data-filter');
    console.log('Filter tab clicked:', filter);
    if (!['bridal', 'editorial', 'specialfx', 'natural', 'hair'].includes(filter)) {
        console.error('Invalid filter:', filter);
        return;
    }
    DOM.filterTabs.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
    currentCategory = filter;
    loadGalleryItems(filter);
}

/**
 * Handles click events for dynamic buttons (gallery items, lightbox controls).
 * @param {Event} e - Click event.
 */
function handleDynamicClick(e) {
    const target = e.target.closest('.gallery-item, .close-lightbox, .prev, .next');
    if (!target) {
        if (e.target === DOM.lightboxModal) {
            console.log('Clicked outside lightbox, closing');
            closeLightbox();
        }
        return;
    }

    if (target.classList.contains('close-lightbox')) {
        console.log('Close lightbox clicked');
        closeLightbox();
        return;
    }

    if (target.classList.contains('prev')) {
        console.log('Previous button clicked');
        navigate('prev');
        return;
    }

    if (target.classList.contains('next')) {
        console.log('Next button clicked');
        navigate('next');
    }
}

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initializes the gallery page on DOM load.
 */
function initGallery() {
    console.log('Initializing gallery');
    if (!DOM.galleryGrid || !DOM.filterTabs.length || !DOM.lightboxModal) {
        console.error('Missing critical DOM elements:', DOM);
        return;
    }

    loadGalleryItems();

    DOM.filterTabs.forEach(button => button.addEventListener('click', handleFilterTabClick));
    document.addEventListener('click', handleDynamicClick);
    DOM.lightboxModal.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            console.log('Escape key pressed, closing lightbox');
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            console.log('Left arrow pressed, navigating to previous');
            navigate('prev');
        } else if (e.key === 'ArrowRight') {
            console.log('Right arrow pressed, navigating to next');
            navigate('next');
        }
    });
}

document.addEventListener('DOMContentLoaded', initGallery);

// // 3D Product Viewer (Commented out as unused in gallery.html)
// function init3DViewer() {
//     const container = document.querySelector('.product-3d-view');
//     if (!container) return;
//     container.innerHTML = `
//         <div class="3d-placeholder">
//             <p>3D Product Viewer Placeholder</p>
//             <p>In a real implementation, this would show an interactive 3D view of a product</p>
//         </div>
//     `;
// }