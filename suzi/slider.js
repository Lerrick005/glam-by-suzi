// slider.js - Before/After Comparison Slider
class BeforeAfterSlider {
    constructor(containerSelector) {
      this.container = document.querySelector(containerSelector);
      if (!this.container) return;
  
      this.init();
      this.addEventListeners();
    }
  
    init() {
      // Create slider structure
      this.container.innerHTML = `
        <div class="ba-slider">
          <div class="ba-before">
            <div class="ba-content"></div>
            <span class="ba-label">Before</span>
          </div>
          <div class="ba-after">
            <div class="ba-content"></div>
            <span class="ba-label">After</span>
          </div>
          <div class="ba-handle">
            <span class="ba-arrow ba-arrow-left">←</span>
            <span class="ba-arrow ba-arrow-right">→</span>
          </div>
        </div>
      `;
  
      // Set default position
      this.slider = this.container.querySelector('.ba-slider');
      this.before = this.container.querySelector('.ba-before');
      this.handle = this.container.querySelector('.ba-handle');
      this.isDragging = false;
  
      // Set initial position (50%)
      this.moveSlider(50);
    }
  
    addEventListeners() {
      // Mouse events
      this.slider.addEventListener('mousedown', this.startDrag.bind(this));
      document.addEventListener('mousemove', this.drag.bind(this));
      document.addEventListener('mouseup', this.stopDrag.bind(this));
  
      // Touch events
      this.slider.addEventListener('touchstart', this.startDrag.bind(this));
      document.addEventListener('touchmove', this.drag.bind(this));
      document.addEventListener('touchend', this.stopDrag.bind(this));
  
      // Keyboard accessibility
      this.handle.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          this.moveSlider(this.currentPosition - 5);
        } else if (e.key === 'ArrowRight') {
          this.moveSlider(this.currentPosition + 5);
        }
      });
    }
  
    startDrag(e) {
      e.preventDefault();
      this.isDragging = true;
      this.handle.focus();
    }
  
    drag(e) {
      if (!this.isDragging) return;
      e.preventDefault();
  
      // Get position
      const rect = this.slider.getBoundingClientRect();
      let x;
      
      if (e.type === 'mousemove') {
        x = e.clientX - rect.left;
      } else if (e.type === 'touchmove') {
        x = e.touches[0].clientX - rect.left;
      }
  
      // Calculate percentage (0-100)
      let percent = (x / rect.width) * 100;
      
      // Constrain between 0 and 100
      percent = Math.max(0, Math.min(100, percent));
      
      this.moveSlider(percent);
    }
  
    stopDrag() {
      this.isDragging = false;
    }
  
    moveSlider(percent) {
      this.currentPosition = percent;
      this.before.style.width = `${percent}%`;
      this.handle.style.left = `${percent}%`;
    }
  
    // Public method to set images
    setImages(beforeImgSrc, afterImgSrc) {
      const beforeContent = this.container.querySelector('.ba-before .ba-content');
      const afterContent = this.container.querySelector('.ba-after .ba-content');
  
      beforeContent.style.backgroundImage = `url(${beforeImgSrc})`;
      afterContent.style.backgroundImage = `url(${afterImgSrc})`;
    }
  }
  
  // Initialize all sliders on the page
  document.addEventListener('DOMContentLoaded', () => {
    // Find all slider containers
    const sliders = document.querySelectorAll('.before-after-slider');
    
    // Initialize each one
    sliders.forEach((container, index) => {
      const slider = new BeforeAfterSlider(`.before-after-slider:nth-child(${index + 1})`);
      
      // Example images - in production you would get these from your data source
      slider.setImages(
        'images/before-makeup.jpg',
        'images/after-makeup.jpg'
      );
    });
  });