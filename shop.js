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
    { id: 1, name: "Red Lipstick", price: 15.00, category: "lips", description: "Long-lasting red lipstick for vibrant color.", images: ["red-lipstick.jpg"] },
    { id: 2, name: "Pink Lip Gloss", price: 12.00, category: "lips", description: "Shiny pink gloss with a non-sticky formula.", images: ["pink-lip-gloss.jpg"] },
    { id: 3, name: "Nude Lipstick", price: 15.00, category: "lips", description: "Natural nude shade for everyday wear.", images: ["nude-lipstick.jpg"] },
    { id: 4, name: "Berry Lipstick", price: 15.00, category: "lips", description: "Rich berry color for a bold look.", images: ["berry-lipstick.jpg"] },
    { id: 5, name: "Matte Coral Lipstick", price: 18.00, category: "lips", description: "Vibrant matte coral for a modern finish.", images: ["matte-coral-lipstick.jpg"] },
    { id: 6, name: "Lip Liner", price: 10.00, category: "lips", description: "Precision lip liner for defined lips.", images: ["lip-liner.jpg"] },
    // Eyes (6)
    { id: 7, name: "Eyeshadow Palette", price: 25.00, category: "eyes", description: "12-shade palette for versatile looks.", images: ["eyeshadow-palette.png"] },
    { id: 8, name: "Volumizing Mascara", price: 12.00, category: "eyes", description: "Lengthening and volumizing mascara.", images: ["volumizing-mascara.jpg"] },
    { id: 9, name: "Liquid Eyeliner", price: 10.00, category: "eyes", description: "Waterproof liquid liner for precise lines.", images: ["liquid-eyeliner.jpg"] },
    { id: 10, name: "Eyebrow Gel", price: 8.00, category: "eyes", description: "Tinted brow gel for shaping.", images: ["eyebrow-gel.jpg"] },
    { id: 11, name: "Glitter Eyeshadow", price: 14.00, category: "eyes", description: "Sparkling eyeshadow for glamour.", images: ["glitter-eyeshadow.jpg"] },
    { id: 12, name: "False Eyelashes", price: 10.00, category: "eyes", description: "Reusable lashes for dramatic effect.", images: ["false-eyelashes.jpg"] },
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
    categoryTabs: document.querySelectorAll('.category-tabs .tab-btn'),
    notification: document.querySelector('.notification')
};

// ============================================================================
// State Management
// ============================================================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProduct = null;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Displays a temporary notification to the user.
 * @param {string} message - The message to display.
 */
function showNotification(message) {
    if (!DOM.notification) {
        console.warn('Notification element not found');
        return;
    }
    DOM.notification.textContent = message;
    DOM.notification.classList.add('show');
    setTimeout(() => {
        DOM.notification.classList.remove('show');
    }, 3000);
}

/**
 * Validates image path and returns a fallback if invalid.
 * @param {string} path - The image path.
 * @returns {string} Valid image path or fallback.
 */
function validateImagePath(path) {
    return path && typeof path === 'string' ? path : 'images/products/placeholder.jpg';
}

// ============================================================================
// Rendering Functions
// ============================================================================

/**
 * Dynamically generates product cards from PRODUCTS array.
 */
function initializeProductCards() {
    console.log('Initializing product cards');
    if (!DOM.productGrid) {
        console.error('Product grid element not found');
        return;
    }

    DOM.productGrid.innerHTML = ''; // Clear existing cards
    PRODUCTS.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-id', product.id);
        card.setAttribute('data-category', product.category);
        card.innerHTML = `
            <img src="${validateImagePath(product.images[0])}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="quick-view" data-id="${product.id}" role="button" aria-label="Quick View ${product.name}">
                <i class="fas fa-eye"></i>
            </div>
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" aria-label="Add ${product.name} to cart">Add to Cart</button>
        `;
        DOM.productGrid.appendChild(card);
    });
    console.log(`Generated ${PRODUCTS.length} product cards`);
}

/**
 * Filters product cards by category, toggling display.
 * @param {string} category - Category to filter ('lips', 'eyes', 'face', 'tools').
 */
function filterProducts(category = 'lips') {
    console.log('Filtering products for category:', category);
    const productCards = document.query reconstruir
querySelectorAll('.product-card');
    let visibleCount = 0;
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        card.style.display = cardCategory === category ? 'block' : 'none';
        if (cardCategory === category) visibleCount++;
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
    DOM.modalMainImage.src = validateImagePath(currentProduct.images[0]);
    DOM.modalMainImage.alt = currentProduct.name;

    DOM.thumbnailContainer.innerHTML = '';
    currentProduct.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${validateImagePath(image)}" alt="Thumbnail ${index + 1} for ${currentProduct.name}" loading="lazy">`;
        thumbnail.addEventListener('click', () => {
            DOM.modalMainImage.src = validateImagePath(image);
            DOM.thumbnailContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        DOM.thumbnailContainer.appendChild(thumbnail);
    });

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
        image: validateImagePath(product.images[0])
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
    showNotification(`${product.name} (x${quantity}) added to cart!`);
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

    const quantityInput = DOM.productModal.querySelector('.quantity-selector input');
    const quantity = parseInt(quantityInput.value) || 1;
    console.log('Modal quantity:', quantity);
    addToCart(currentProduct.id, quantity);
    quantityInput.value = 1; // Reset quantity
}

/**
 * Updates the cart count display in the navigation.
 */
function updateCartCount() {
    console.log('Updating cart count');
    if (DOM.cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        DOM.cartCount.textContent = totalItems;
        DOM.cartCount.setAttribute('aria-label', `Cart contains ${totalItems} items`);
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
    e.currentTarget.setAttribute('aria-selected', 'true');
    DOM.categoryTabs.forEach(t => {
        if (t !== e.currentTarget) t.setAttribute('aria-selected', 'false');
    });
    filterProducts(category);
}

/**
 * Handles click events for dynamic buttons (quick view, add-to-cart, modal controls).
 * @param {Event} e - Click event.
 */
function handleDynamicClick(e) {
    const target = e.target.closest('.quick-view, .add-to-cart, .close-modal, .qty-btn.minus, .qty-btn.plus, .add-to-cart-modal');
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
    const requiredElements = [
        { name: 'productGrid', el: DOM.productGrid },
        { name: 'productModal', el: DOM.productModal },
        { name: 'modalMainImage', el: DOM.modalMainImage },
        { name: 'modalProductName', el: DOM.modalProductName },
        { name: 'modalProductPrice', el: DOM.modalProductPrice },
        { name: 'modalProductDescription', el: DOM.modalProductDescription },
        { name: 'thumbnailContainer', el: DOM.thumbnailContainer },
        { name: 'productOptionsContainer', el: DOM.productOptionsContainer },
        { name: 'categoryTabs', el: DOM.categoryTabs.length }
    ];

    const missingElements = requiredElements.filter(item => !item.el);
    if (missingElements.length > 0) {
        console.error('Missing critical DOM elements:', missingElements.map(item => item.name));
        return;
    }

    initializeProductCards();
    filterProducts();
    updateCartCount();

    DOM.categoryTabs.forEach(tab => {
        tab.addEventListener('click', handleCategoryTabClick);
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
    });
    document.addEventListener('click', handleDynamicClick);
    DOM.productModal.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            console.log('Escape key pressed, closing modal');
            closeProductModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', initShop);n