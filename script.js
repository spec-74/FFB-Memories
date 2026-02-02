// ===== Configuration =====
// You can easily modify these values to add/remove photos and videos
const CONFIG = {
    // Number of photos (named ffb1.jpg, ffb1.heic, etc.)
    photoCount: 50,
    // Number of videos (named ffbv1.mp4, ffbv1.mov, etc.)
    videoCount: 10,
    // Folder where images and videos are stored
    imageFolder: 'images/',
    // Photo filename base (will try multiple extensions automatically)
    photoBaseName: 'ffb{n}',
    // Video filename base (will try multiple extensions automatically)
    videoBaseName: 'ffbv{n}',
    // Supported photo extensions (will try in this order)
    photoExtensions: ['.jpg', '.jpeg', '.heic', '.png', '.webp', '.gif', '.HEIC', '.JPG', '.JPEG', '.PNG'],
    // Supported video extensions (will try in this order)
    videoExtensions: ['.mp4', '.mov', '.MP4', '.MOV', '.webm', '.avi']
};

// ===== Global Variables =====
let currentFilter = 'all';
let currentLightboxIndex = 0;
let allItems = [];
let filteredItems = [];
let touchStartX = 0;
let touchEndX = 0;

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    initializeFloatingHearts();
    initializeEventListeners();
});

// ===== Gallery Initialization =====
async function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    allItems = [];
    
    // Generate photo items - try all extensions
    for (let i = 1; i <= CONFIG.photoCount; i++) {
        const baseName = CONFIG.photoBaseName.replace('{n}', i);
        const photoPath = await findFile(baseName, CONFIG.photoExtensions);
        
        if (photoPath) {
            allItems.push({
                type: 'photo',
                src: photoPath,
                alt: `Memory ${i}`,
                index: allItems.length
            });
        }
    }
    
    // Generate video items - try all extensions
    for (let i = 1; i <= CONFIG.videoCount; i++) {
        const baseName = CONFIG.videoBaseName.replace('{n}', i);
        const videoPath = await findFile(baseName, CONFIG.videoExtensions);
        
        if (videoPath) {
            allItems.push({
                type: 'video',
                src: videoPath,
                alt: `Video Memory ${i}`,
                index: allItems.length
            });
        }
    }
    
    // Shuffle items for a mixed gallery (optional - remove if you want photos first, then videos)
    shuffleArray(allItems);
    
    // Re-index after shuffle
    allItems.forEach((item, index) => {
        item.index = index;
    });
    
    filteredItems = [...allItems];
    
    // Render gallery items
    renderGallery(allItems, galleryGrid);
    
    // Hide loading spinner after a short delay
    setTimeout(() => {
        const spinner = document.getElementById('loadingSpinner');
        spinner.classList.add('hidden');
    }, 800);
}

// ===== Helper function to find file with any extension =====
async function findFile(baseName, extensions) {
    // Try each extension
    for (const ext of extensions) {
        const path = CONFIG.imageFolder + baseName + ext;
        
        // Check if file exists by trying to load it
        const exists = await checkFileExists(path);
        if (exists) {
            return path;
        }
    }
    
    // If no file found, return null (will be skipped)
    return null;
}

// ===== Check if a file exists =====
function checkFileExists(url) {
    return new Promise((resolve) => {
        // For images
        if (url.match(/\.(jpg|jpeg|png|gif|webp|heic)$/i)) {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        }
        // For videos
        else if (url.match(/\.(mp4|mov|webm|avi)$/i)) {
            const video = document.createElement('video');
            video.onloadedmetadata = () => resolve(true);
            video.onerror = () => resolve(false);
            video.src = url;
        }
        else {
            resolve(false);
        }
    });
}

// ===== Render Gallery =====
function renderGallery(items, container) {
    container.innerHTML = '';
    
    items.forEach((item, displayIndex) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.type = item.type;
        galleryItem.dataset.index = item.index;
        
        // Add staggered animation delay
        galleryItem.style.animationDelay = `${displayIndex * 0.05}s`;
        
        if (item.type === 'photo') {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            img.loading = 'lazy'; // Lazy loading for performance
            galleryItem.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.muted = true;
            video.loop = true;
            video.preload = 'metadata';
            
            // Add multiple source formats for better compatibility
            const source = document.createElement('source');
            source.src = item.src;
            
            // Detect video type
            if (item.src.match(/\.mp4$/i)) {
                source.type = 'video/mp4';
            } else if (item.src.match(/\.mov$/i)) {
                source.type = 'video/quicktime';
            } else if (item.src.match(/\.webm$/i)) {
                source.type = 'video/webm';
            } else if (item.src.match(/\.avi$/i)) {
                source.type = 'video/x-msvideo';
            }
            
            video.appendChild(source);
            
            const overlay = document.createElement('div');
            overlay.className = 'video-overlay';
            overlay.innerHTML = '<div class="play-icon">▶</div>';
            
            galleryItem.appendChild(video);
            galleryItem.appendChild(overlay);
            
            // Play video on hover (desktop only)
            if (window.matchMedia('(min-width: 769px)').matches) {
                galleryItem.addEventListener('mouseenter', () => {
                    video.play();
                });
                galleryItem.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        }
        
        // Click to open lightbox
        galleryItem.addEventListener('click', () => {
            openLightbox(item.index);
        });
        
        container.appendChild(galleryItem);
    });
}

// ===== Filter Functionality =====
function initializeEventListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Get filter type
            const filter = btn.dataset.filter;
            currentFilter = filter;
            
            // Filter items
            if (filter === 'all') {
                filteredItems = [...allItems];
            } else if (filter === 'photos') {
                filteredItems = allItems.filter(item => item.type === 'photo');
            } else if (filter === 'videos') {
                filteredItems = allItems.filter(item => item.type === 'video');
            }
            
            // Re-render gallery
            const galleryGrid = document.getElementById('galleryGrid');
            renderGallery(filteredItems, galleryGrid);
        });
    });
    
    // Lightbox controls
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', showPrevItem);
    document.getElementById('lightboxNext').addEventListener('click', showNextItem);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Touch gestures for lightbox
    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
    lightbox.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Click outside to close lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ===== Lightbox Functions =====
function openLightbox(itemIndex) {
    currentLightboxIndex = itemIndex;
    const lightbox = document.getElementById('lightbox');
    const item = allItems[itemIndex];
    
    const imageContainer = document.getElementById('lightboxImageContainer');
    const videoContainer = document.getElementById('lightboxVideoContainer');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const counter = document.getElementById('lightboxCounter');
    
    // Update counter
    counter.textContent = `${itemIndex + 1} / ${allItems.length}`;
    
    // Reset containers
    imageContainer.classList.remove('active');
    videoContainer.classList.remove('active');
    
    if (item.type === 'photo') {
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
        imageContainer.classList.add('active');
    } else if (item.type === 'video') {
        const source = lightboxVideo.querySelector('source');
        source.src = item.src;
        
        // Set correct MIME type
        if (item.src.match(/\.mp4$/i)) {
            source.type = 'video/mp4';
        } else if (item.src.match(/\.mov$/i)) {
            source.type = 'video/quicktime';
        } else if (item.src.match(/\.webm$/i)) {
            source.type = 'video/webm';
        } else if (item.src.match(/\.avi$/i)) {
            source.type = 'video/x-msvideo';
        }
        
        lightboxVideo.load();
        videoContainer.classList.add('active');
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightboxVideo');
    
    // Pause video if playing
    lightboxVideo.pause();
    
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function showNextItem() {
    currentLightboxIndex = (currentLightboxIndex + 1) % allItems.length;
    openLightbox(currentLightboxIndex);
}

function showPrevItem() {
    currentLightboxIndex = (currentLightboxIndex - 1 + allItems.length) % allItems.length;
    openLightbox(currentLightboxIndex);
}

// ===== Keyboard Navigation =====
function handleKeyPress(e) {
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowRight':
            showNextItem();
            break;
        case 'ArrowLeft':
            showPrevItem();
            break;
    }
}

// ===== Touch Gestures =====
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - show next
            showNextItem();
        } else {
            // Swiped right - show previous
            showPrevItem();
        }
    }
}

// ===== Floating Hearts Animation =====
function initializeFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        createFloatingHeart(heartsContainer, heartSymbols);
    }
    
    // Continuously create new hearts
    setInterval(() => {
        createFloatingHeart(heartsContainer, heartSymbols);
    }, 3000);
}

function createFloatingHeart(container, symbols) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (10 + Math.random() * 10) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (15 + Math.random() * 15) + 'px';
    
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 20000);
}

// ===== Utility Functions =====
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ===== Lazy Loading Observer =====
// Additional optimization for lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    // Observe images when they're added to the DOM
    const observeImages = () => {
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    };
    
    // Call after gallery renders
    setTimeout(observeImages, 1000);
}

// ===== Performance Monitoring (Optional - for debugging) =====
if (window.performance && console.time) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

/* 
===== HOW TO ADD/REMOVE PHOTOS AND VIDEOS =====

ADDING MORE PHOTOS:
1. Add your new photo files to the 'images' folder
2. Name them following the pattern: ffb51.jpg (or .heic, .png, etc.)
3. Update CONFIG.photoCount at the top of this file to the new total
4. Supported formats: .jpg, .jpeg, .heic, .png, .webp, .gif

ADDING MORE VIDEOS:
1. Add your new video files to the 'images' folder
2. Name them following the pattern: ffbv11.mp4 (or .mov, etc.)
3. Update CONFIG.videoCount at the top of this file to the new total
4. Supported formats: .mp4, .mov, .webm, .avi

MIXED FORMATS:
• You can use different formats for different files!
• Example: ffb1.jpg, ffb2.heic, ffb3.png all work together
• Example: ffbv1.mp4, ffbv2.mov both work
• The system automatically detects the correct format

REMOVING PHOTOS/VIDEOS:
1. Simply decrease CONFIG.photoCount or CONFIG.videoCount
2. The gallery will automatically adjust

CHANGING FILE NAMING PATTERN:
1. Update CONFIG.photoBaseName or CONFIG.videoBaseName
2. Use {n} as the placeholder for the number
3. Example: 'photo_{n}' or 'vid-{n}'

CHANGING IMAGE FOLDER:
1. Update CONFIG.imageFolder to point to your folder
2. Example: 'assets/media/' or '../photos/'

ADDING NEW FILE FORMATS:
1. Add the extension to CONFIG.photoExtensions or CONFIG.videoExtensions
2. Example: photoExtensions: ['.jpg', '.jpeg', '.heic', '.png', '.bmp']

The gallery automatically finds and loads files regardless of their format!
*/
