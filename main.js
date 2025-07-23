const SUPABASE_URL = 'https://lpexqdvdumaugvcmbsvm.supabase.co';
const SUPABASE_KEY = 'https://lpexqdvdumaugvcmbsvm.supabase.co';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Product Data (Would normally come from Supabase in production)
const featuredProducts = [
    {
        id: 1,
        name: "Luxury Matte Lipstick",
        price: "$24.99",
        image: "images/lipstick.jpg",
        category: "Lips"
    },
    {
        id: 2,
        name: "Radiant Foundation",
        price: "$34.99",
        image: "images/foundation.jpg",
        category: "Face"
    },
    {
        id: 3,
        name: "Pro Makeup Brush Set",
        price: "$49.99",
        image: "images/brushes.jpg",
        category: "Tools"
    },
    {
        id: 4,
        name: "Glow Highlighter Palette",
        price: "$29.99",
        image: "images/highlighter.jpg",
        category: "Face"
    }
    {
        id: 5,
        name: "Hydrating Face Primer",
        price: "$19.99",
        image: "images/primer.jpg",
        category: "Face"
    },
    {
        id: 6,
        name: "Velvet Eyeshadow Palette",
        price: "$39.99",
        image: "images/eyeshadow.jpg",
        category: "Eyes"
    },
    {
        id: 7,
        name: "Gentle Makeup Remover Balm",
        price: "$18.99",
        image: "images/remover.jpg",
        category: "Skincare"
    },
    {
        id: 8,
        name: "Glossy Gel Nail Polish Set",
        price: "$27.99",
        image: "images/nailpolish.jpg",
        category: "Nails"
    },
    {
        id: 9,
        name: "Rose Infused Setting Spray",
        price: "$22.99",
        image: "images/settingspray.jpg",
        category: "Face"
    },
    {
        id: 10,
        name: "Luxury Brow Sculpting Pencil",
        price: "$14.99",
        image: "images/browpencil.jpg",
        category: "Eyes"
    },
    {
        id: 11,
        name: "Silk Touch Blush Duo",
        price: "$26.99",
        image: "images/blush.jpg",
        category: "Face"
    },
    {
        id: 12,
        name: "Luminous Body Glow Oil",
        price: "$31.99",
        image: "images/bodyoil.jpg",
        category: "Body"
    },
    {
        id: 13,
        name: "Flawless Finish Compact Powder",
        price: "$28.99",
        image: "images/compact.jpg",
        category: "Face"
    },
    {
        id: 14,
        name: "Classic Red Lip Gloss",
        price: "$16.99",
        image: "images/lipgloss.jpg",
        category: "Lips"
    }
    {
        id: 15,
        name: "Ultra Lengthening Mascara",
        price: "$23.99",
        image: "images/mascara.jpg",
        category: "Eyes"
    },
    {
        id: 16,
        name: "Waterproof Liquid Eyeliner",
        price: "$17.99",
        image: "images/eyeliner.jpg",
        category: "Eyes"
    },
    {
        id: 17,
        name: "Cream Contour Stick",
        price: "$21.99",
        image: "images/contour.jpg",
        category: "Face"
    },
    {
        id: 18,
        name: "Silky Smooth Lip Balm",
        price: "$9.99",
        image: "images/lipbalm.jpg",
        category: "Lips"
    },
    {
        id: 19,
        name: "Exfoliating Face Scrub",
        price: "$19.49",
        image: "images/facescrub.jpg",
        category: "Skincare"
    },
    {
        id: 20,
        name: "Luxury Perfume Mist",
        price: "$32.99",
        image: "images/perfume.jpg",
        category: "Body"
    },
    {
        id: 21,
        name: "Daily Glow Moisturizer",
        price: "$24.49",
        image: "images/moisturizer.jpg",
        category: "Skincare"
    },
    {
        id: 22,
        name: "Silk Satin Hair Wrap",
        price: "$15.99",
        image: "images/hairwrap.jpg",
        category: "Hair"
    },
    {
        id: 23,
        name: "Detangling Hair Brush",
        price: "$12.99",
        image: "images/hairbrush.jpg",
        category: "Tools"
    },
    {
        id: 24,
        name: "Eyelash Extension Kit",
        price: "$36.99",
        image: "images/lashkit.jpg",
        category: "Eyes"
    }
    {
        id: 25,
        name: "Brazilian Body Wave Wig - 22 Inch",
        price: "Ksh 12,500",
        image: "images/bodywave.jpg",
        category: "Hair"
    },
    {
        id: 26,
        name: "Straight Human Hair Wig - 18 Inch",
        price: "Ksh 10,800",
        image: "images/straightwig.jpg",
        category: "Hair"
    },
    {
        id: 27,
        name: "Kinky Curly Lace Front Wig - 20 Inch",
        price: "Ksh 13,200",
        image: "images/kinkycurly.jpg",
        category: "Hair"
    },
    {
        id: 28,
        name: "Bob Cut Wig - Short Natural Look",
        price: "Ksh 6,500",
        image: "images/bobcut.jpg",
        category: "Hair"
    },
    {
        id: 29,
        name: "Blonde Highlight Wig - 24 Inch",
        price: "Ksh 14,000",
        image: "images/blondewig.jpg",
        category: "Hair"
    },
    {
        id: 30,
        name: "Afro Puff Wig - Natural Texture",
        price: "Ksh 5,800",
        image: "images/afropuff.jpg",
        category: "Hair"
    },
    {
        id: 31,
        name: "Deep Wave Wig - 26 Inch",
        price: "Ksh 15,500",
        image: "images/deepwave.jpg",
        category: "Hair"
    },
    {
        id: 32,
        name: "Pixie Cut Synthetic Wig",
        price: "Ksh 3,200",
        image: "images/pixiecut.jpg",
        category: "Hair"
    },
    {
        id: 33,
        name: "Lace Closure Wig - 16 Inch",
        price: "Ksh 9,300",
        image: "images/laceclosure.jpg",
        category: "Hair"
    },
    {
        id: 34,
        name: "Ombre Burgundy Wig - 20 Inch",
        price: "Ksh 11,700",
        image: "images/ombreburgundy.jpg",
        category: "Hair"
    }
    
    
];

// Load Featured Products
function loadFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// Cart Functionality
let cart = [];

function addToCart(productId) {
    const product = featuredProducts.find(p => p.id == productId);
    cart.push(product);
    updateCartCount();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${product.name} added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.length;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    
    // Cart count from localStorage if available
    if (localStorage.getItem('glamCart')) {
        cart = JSON.parse(localStorage.getItem('glamCart'));
        updateCartCount();
    }
    
    // Save cart to localStorage before page unload
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('glamCart', JSON.stringify(cart));
    });
});

// Before/After Slider (for Tutorials page)
function initBeforeAfterSlider() {
    const slider = document.querySelector('.before-after-slider');
    if (!slider) return;
    
    slider.innerHTML = `
        <div class="slider-container">
            <div class="before">
                <img src="images/before-makeup.jpg" alt="Before makeup">
                <div class="label">Before</div>
            </div>
            <div class="after">
                <img src="images/after-makeup.jpg" alt="After makeup">
                <div class="label">After</div>
            </div>
            <input type="range" min="0" max="100" value="50" class="slider" id="slider">
        </div>
    `;
    
    const sliderInput = slider.querySelector('#slider');
    const beforeImg = slider.querySelector('.before img');
    const sliderContainer = slider.querySelector('.slider-container');
    
    sliderInput.addEventListener('input', function() {
        let sliderValue = this.value;
        beforeImg.style.width = sliderValue + '%';
        sliderContainer.style.setProperty('--slider-value', sliderValue + '%');
    });
}

// Initialize slider if on homepage
if (document.querySelector('.before-after-slider')) {
    initBeforeAfterSlider();
}