// ==========================================================================
// 1. MOBILE SLIDER FUNCTIONALITY
// ==========================================================================
const mobileSlides = document.querySelectorAll('.mobile-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlideIndex = 0;

function showSlide(index) {
  // Remove the active class from the current slide
  mobileSlides[currentSlideIndex].classList.remove('active');
  
  // Update the index, looping around if it goes out of bounds
  if (index >= mobileSlides.length) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = mobileSlides.length - 1;
  } else {
    currentSlideIndex = index;
  }
  
  // Add the active class to the new slide
  mobileSlides[currentSlideIndex].classList.add('active');
}

// Arrow Event Listeners
nextBtn.addEventListener('click', () => {
  showSlide(currentSlideIndex + 1);
});

prevBtn.addEventListener('click', () => {
  showSlide(currentSlideIndex - 1);
});


// ==========================================================================
// 2. DESKTOP THUMBNAIL CLICK FUNCTIONALITY
// ==========================================================================
const mainProductImage = document.getElementById('main-product-image');
const thumbnails = document.querySelectorAll('.thumbnail');

// Array mapping each thumbnail index to its corresponding image URL
const largeImages = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg"
];

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    // 1. Remove the active border state from all thumbnails
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // 2. Add the active border state to the clicked thumbnail
    thumbnail.classList.add('active');
    
    // 3. Swap the main image source with the corresponding high-res URL
    mainProductImage.src = largeImages[index];
  });
});


// ==========================================================================
// 3. QUANTITY SELECTOR & SHOPPING CART CONTROLLER
// ==========================================================================
const minusBtn = document.querySelector('#minus-btn');
const plusBtn = document.querySelector('#plus-btn');
const quantityValue = document.querySelector('.quantity-value');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const cartBadge = document.querySelector('.cart-badge');
const productPriceDisplay = document.querySelector('#product-price'); // New selector

let currentCount = 0; 
const BASE_PRICE = 125; // The price for a single pair of sneakers

// Helper function to update the price layout display
function updatePriceDisplay() {
  if (currentCount > 0) {
    const totalPrice = BASE_PRICE * currentCount;
    productPriceDisplay.textContent = `$${totalPrice}`;
  } else {
    // Fallback to default price if quantity selection is 0
    productPriceDisplay.textContent = `$${BASE_PRICE}`;
  }
}

// 1. Plus Button logic
plusBtn.addEventListener('click', () => {
  currentCount++;
  quantityValue.textContent = currentCount;
  updatePriceDisplay(); // Recalculate price
});

// 2. Minus Button logic
minusBtn.addEventListener('click', () => {
  if (currentCount > 0) {
    currentCount--;
    quantityValue.textContent = currentCount;
    updatePriceDisplay(); // Recalculate price
  }
});

// 3. Add to Cart Badge logic
addToCartBtn.addEventListener('click', () => {
  if (currentCount > 0) {
    cartBadge.textContent = currentCount;
    cartBadge.classList.add('visible'); 
  } else {
    cartBadge.classList.remove('visible'); 
  }
});

// ==========================================================================
// 4. LIGHTBOX MODAL MANAGEMENT SYSTEM
// ==========================================================================
const desktopMainImgBtn = document.querySelector('.main-image-btn');
const lightboxModal = document.getElementById('lightbox-modal');
const closeModalBtn = document.getElementById('close-modal');

const lightboxMainImage = document.getElementById('lightbox-main-image');
const lightboxThumbs = document.querySelectorAll('.lightbox-thumb');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let lightboxIndex = 0;

// Open modal upon desktop large image click
desktopMainImgBtn.addEventListener('click', () => {
  lightboxModal.showModal();
  lightboxModal.focus(); // Prevents browser from auto-focusing the close button
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  lightboxModal.close();
});

// Synchronize state tracker
function updateLightboxView(index) {
  // Loop bounds checks
  if (index >= largeImages.length) lightboxIndex = 0;
  else if (index < 0) lightboxIndex = largeImages.length - 1;
  else lightboxIndex = index;

  // Swap active thumbnails states 
  lightboxThumbs.forEach(thumb => thumb.classList.remove('active'));
  lightboxThumbs[lightboxIndex].classList.add('active');

  // Update image window path asset
  lightboxMainImage.src = largeImages[lightboxIndex];
}

// Click thumbnail triggers
lightboxThumbs.forEach((thumb, idx) => {
  thumb.addEventListener('click', () => {
    updateLightboxView(idx);
  });
});

// Next and Previous arrows controllers 
lightboxNext.addEventListener('click', () => updateLightboxView(lightboxIndex + 1));
lightboxPrev.addEventListener('click', () => updateLightboxView(lightboxIndex - 1));
