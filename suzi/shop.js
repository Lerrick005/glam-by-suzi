// shop.js - Glam-by Suzii Shop Functionality
// Handles product rendering, image loading, filtering, modal display, and cart operations

// ============================================================================
// Product Data
// ============================================================================

/**
 * Array of products with details for display and cart management.
 * Each product includes id, name, price, category, description, and images.
 */
const PRODUCTS = [
    // Lips (6)
    { id: 1, name: "Red Lipstick", price: 15.00, category: "lips", description: "Long-lasting red lipstick for vibrant color.", images: ["red lipstick.jpg"] },
    { id: 2, name: "Pink Lip Gloss", price: 12.00, category: "lips", description: "Shiny pink gloss with a non-sticky formula.", images: ["pink lip gloss.jpg"] },
    { id: 3, name: "Nude Lipstick", price: 15.00, category: "lips", description: "Natural nude shade for everyday wear.", images: ["nude lipstick.jpg"] },
    { id: 4, name: "Berry Lipstick", price: 15.00, category: "lips", description: "Rich berry color for a bold look.", images: ["berry lipstick.jpg"] },
    { id: 5, name: "Matte Coral Lipstick", price: 18.00, category: "lips", description: "Vibrant matte coral for a modern finish.", images: ["matte.jpg"] },
    { id: 6, name: "Lip Liner", price: 10.00, category: "lips", description: "Precision lip liner for defined lips.", images: ["lip liner.jpg"] },
    // Eyes (6)
    { id: 7, name: "Eyeshadow Palette", price: 25.00, category: "eyes", description: "12-shade palette for versatile looks.", images: ["eyeshadow pallete.png"] },
    { id: 8, name: "Volumizing Mascara", price: 12.00, category: "eyes", description: "Lengthening and volumizing mascara.", images: ["volume mascara.jpg"] },
    { id: 9, name: "Liquid Eyeliner", price: 10.00, category: "eyes", description: "Waterproof liquid liner for precise lines.", images: ["liquid eye liner.jpg"] },
    { id: 10, name: "Eyebrow Gel", price: 8.00, category: "eyes", description: "Tinted brow gel for shaping.", images: ["eyebrow gel.jpg"] },
    { id: 11, name: "Glitter Eyeshadow", price: 14.00, category: "eyes", description: "Sparkling eyeshadow for glamour.", images: ["glitter eyeshadow.jpg"] },
    { id: 12, name: "False Eyelashes", price: 10.00, category: "eyes", description: "Reusable lashes for dramatic effect.", images: ["false eyelashes.jpg"] },
    // Face (5)
    { id: 13, name: "Liquid Foundation", price: 20.00, category: "face", description: "Buildable coverage foundation.", images: ["images/products/foundation.jpg"] },
    { id: 14, name: "Concealer", price: 12.00, category: "face", description: "Full coverage concealer for flawless skin.", images: ["images/products/concealer.jpg"] },
    { id: 15, name: "Powder Blush", price: 10.00, category: "face", description: "Silky powder blush for a natural flush.", images: ["images/products/blush.jpg"] },
    { id: 16, name: "Highlighter", price: 15.00, category: "face", description: "Dewy highlighter for radiant glow.", images: ["images/products/highlighter.jpg"] },
    { id: 17, name: "Contour Palette", price: 18.00, category: "face", description: "Cream contour palette for sculpting.", images: ["images/products/contour.jpg"] },
    // Tools (5)
    { id: 18, name: "Makeup Brush Set", price: 30.00, category: "tools", description: "10-piece professional brush set.", images: ["images/products/brush-set.jpg"] },
    { id: 19, name: "Beauty Sponge", price: 8.00, category: "tools", description: "Soft sponge for seamless blending.", images: ["images/products/sponge.jpg"] },
    { id: 20, name: "Eyelash Curler", price: 6.00, category: "tools", description: "Precision tool for curled lashes.", images: ["images/products/curler.jpg"] },
    { id: 21, name: "Blending Brush", price: 10.00, category: "tools", description: "Soft brush for blending makeup.", images: ["images/products/blending-brush.jpg"] },
    { id: 22, name: "Powder Brush", price: 12.00, category: "tools", description: "Large brush for powder application.", images: ["images/products/powder-brush.jpg"] }
];

// ============================================================================
// DOM Elements
// ============================================================================

const DOM = {
    productGrid: document.querySelector('.shop-products .product-grid'),
    productModal: document.querySelector('.product-modal'),
    modalMainImage: document.getElementById('modal-main-image'),
    modalProductName: document.getElementById('modal-product-name'),
    modalProductPrice: document.getElementById('modal-product-price'),
    modalProductDescription: document.getElementById('modal-product-description'),
    thumbnailContainer: document.querySelector('.thumbnail-images'),
    productOptionsContainer: document.querySelector('.product-options'),
    cartCount: document.querySelector('.cart-count'),
    categoryTabs: document.querySelectorAll('.category-tabs .tab-btn')
};

// ============================================================================
// State Management
// ============================================================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProduct = null;

// ============================================================================
// Rendering Functions
// ============================================================================

/**
 * Adds images and quick view buttons to static product cards.
 */
function initializeProductCards() {
    console.log('Initializing product cards');
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productId = parseInt(card.getAttribute('data-id'));
        console.log('Processing card with data-id:', productId);
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            // Add image
            const img = document.createElement('img');
            img.src = product.images[0];
            img.alt = product.name;
            img.classList.add('product-image');
            img.setAttribute('loading', 'lazy');
            card.insertBefore(img, card.querySelector('h3'));

            // Add quick view button
            const quickView = document.createElement('div');
            quickView.className = 'quick-view';
            quickView.setAttribute('data-id', productId);
            quickView.setAttribute('role', 'button');
            quickView.setAttribute('aria-label', `Quick View ${product.name}`);
            quickView.innerHTML = '<i class="fas fa-eye"></i>';
            card.insertBefore(quickView, card.querySelector('h3'));
        } else {
            console.warn(`Product not found for ID: ${productId}`);
        }
    });
}

/**
 * Filters product cards by category, toggling display.
 * @param {string} category - Category to filter ('lips', 'eyes', 'face', 'tools').
 */
function filterProducts(category = 'lips') {
    console.log('Filtering products for category:', category);
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (cardCategory === category) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    console.log(`Displayed ${visibleCount} products`);
}

/**
 * Populates the product modal with details and thumbnails.
 * @param {number} productId - ID of the product to display.
 */
function renderProductModal(productId) {
    console.log('Rendering modal for product ID:', productId);
    currentProduct = PRODUCTS.find(p => p.id === productId);
    if (!currentProduct) {
        console.error('Product not found:', productId);
        return;
    }

    DOM.modalProductName.textContent = currentProduct.name;
    DOM.modalProductPrice.textContent = `$${currentProduct.price.toFixed(2)}`;
    DOM.modalProductDescription.textContent = currentProduct.description;
    DOM.modalMainImage.src = currentProduct.images[0];
    DOM.modalMainImage.alt = currentProduct.name;

    // Render thumbnails
    DOM.thumbnailContainer.innerHTML = '';
    currentProduct.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1} for ${currentProduct.name}" loading="lazy">`;
        thumbnail.addEventListener('click', () => {
            DOM.modalMainImage.src = image;
            DOM.thumbnailContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        DOM.thumbnailContainer.appendChild(thumbnail);
    });

    // No color/shade options for these products
    DOM.productOptionsContainer.innerHTML = '';

    DOM.productModal.style.display = 'block';
    DOM.productModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    DOM.productModal.focus();
}

/**
 * Closes the product modal and resets state.
 */
function closeProductModal() {
    console.log('Closing modal');
    DOM.productModal.style.display = 'none';
    DOM.productModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    currentProduct = null;
}

// ============================================================================
// Cart Management
// ============================================================================

/**
 * Adds a product to the cart with specified quantity.
 * @param {number} productId - ID of the product.
 * @param {number} [quantity=1] - Quantity to add.
 */
function addToCart(productId, quantity = 1) {
    console.log('Adding to cart: Product ID:', productId, 'Quantity:', quantity);
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    const cartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0]
    };

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
        console.log('Updated existing cart item:', existingItem);
    } else {
        cart.push(cartItem);
        console.log('Added new cart item:', cartItem);
    }

    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
    } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
    }

    updateCartCount();
    alert(`${product.name} (x${quantity}) added to cart!`); // Temporary feedback
}

/**
 * Adds the current modal product to the cart.
 */
function addToCartFromModal() {
    console.log('Adding to cart from modal');
    if (!currentProduct) {
        console.error('No current product selected');
        return;
    }

    const quantity = parseInt(DOM.productModal.querySelector('.quantity-selector input').value) || 1;
    console.log('Modal quantity:', quantity);
    addToCart(currentProduct.id, quantity);
}

/**
 * Updates the cart count display in the navigation.
 */
function updateCartCount() {
    console.log('Updating cart count');
    if (DOM.cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        DOM.cartCount.textContent = totalItems;
        console.log('Cart count updated to:', totalItems);
    } else {
        console.warn('Cart count element not found');
    }
}

// ============================================================================
// Event Handlers
// ============================================================================

/**
 * Handles category tab clicks for filtering products.
 * @param {Event} e - Click event.
 */
function handleCategoryTabClick(e) {
    const category = e.currentTarget.getAttribute('data-category');
    console.log('Tab clicked:', category);
    if (!['lips', 'eyes', 'face', 'tools'].includes(category)) {
        console.error('Invalid category:', category);
        return;
    }
    DOM.categoryTabs.forEach(t => t.classList.remove('active'));
    e.currentTarget.classList.add('active');
    filterProducts(category);
}

/**
 * Handles click events for dynamic buttons (quick view, add-to-cart, modal controls).
 * @param {Event} e - Click event.
 */
function handleDynamicClick(e) {
    const target = e.target.closest([
        '.quick-view',
        '.add-to-cart',
        '.close-modal',
        '.qty-btn.minus',
        '.qty-btn.plus',
        '.add-to-cart-modal'
    ].join(','));

    if (!target) {
        if (e.target === DOM.productModal) {
            console.log('Clicked outside modal, closing');
            closeProductModal();
        }
        return;
    }

    if (target.classList.contains('quick-view')) {
        const productId = parseInt(target.getAttribute('data-id'));
        console.log('Quick view clicked:', productId);
        renderProductModal(productId);
        return;
    }

    if (target.classList.contains('add-to-cart')) {
        const productId = parseInt(target.closest('.product-card').getAttribute('data-id'));
        console.log('Add to cart clicked:', productId);
        if (!productId) {
            console.error('No data-id found on product card');
            return;
        }
        addToCart(productId);
        return;
    }

    if (target.classList.contains('close-modal')) {
        console.log('Close modal clicked');
        closeProductModal();
        return;
    }

    if (target.classList.contains('minus')) {
        const input = target.nextElementSibling;
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            console.log('Quantity decreased:', input.value);
        }
        return;
    }

    if (target.classList.contains('plus')) {
        const input = target.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        console.log('Quantity increased:', input.value);
        return;
    }

    if (target.classList.contains('add-to-cart-modal')) {
        console.log('Add to cart from modal clicked');
        addToCartFromModal();
    }
}

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initializes the shop functionality on DOM load.
 */
function initShop() {
    console.log('Initializing shop');
    if (!DOM.productGrid || !DOM.productModal || !DOM.categoryTabs.length) {
        console.error('Missing critical DOM elements:', DOM);
        return;
    }

    initializeProductCards();
    filterProducts();
    updateCartCount();

    DOM.categoryTabs.forEach(tab => tab.addEventListener('click', handleCategoryTabClick));
    document.addEventListener('click', handleDynamicClick);
    DOM.productModal.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            console.log('Escape key pressed, closing modal');
            closeProductModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', initShop);