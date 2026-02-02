# Valentine's Day Photo & Video Gallery 💕

A beautiful, interactive, and responsive photo and video gallery website designed as a romantic Valentine's Day gift.

## 🌟 Features

### Design & User Experience
- ✨ Modern, elegant Valentine's Day themed design
- 💖 Floating heart animations in the background
- 🎨 Smooth transitions and hover effects
- 📱 Fully responsive (works on desktop, tablet, and mobile)
- 🌐 Compatible with all modern browsers
- ♿ Accessible with proper alt texts and keyboard navigation

### Gallery Features
- 🖼️ Displays 50 photos and 10 videos
- 🔍 Filter content by "All", "Photos", or "Videos"
- 🎬 Video preview on hover (desktop)
- 👆 Clickable thumbnails with lightbox view
- 🔄 Lazy loading for optimal performance
- 📏 Scalable - easy to add/remove content

### Lightbox Features
- 🖼️ Full-screen image and video viewing
- ▶️ Built-in video controls (play, pause, volume)
- 🔍 Image zoom capability
- ⬅️➡️ Navigate with arrow buttons or keyboard
- 📱 Swipe support for touch devices
- ✖️ Multiple ways to close (button, ESC key, click outside)
- 🔢 Counter showing current position

### Performance
- ⚡ Fast loading with lazy loading
- 🎯 Optimized animations
- 💾 Efficient resource management
- 📊 Minimal file size

## 📁 File Structure

```
valentine-gallery/
│
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
├── README.md           # This file
│
└── images/             # Your media folder
    ├── ffb1.jpg        # Photo 1
    ├── ffb2.jpg        # Photo 2
    ├── ...             # Photos 3-49
    ├── ffb50.jpg       # Photo 50
    ├── ffbv1.mp4       # Video 1
    ├── ffbv2.mp4       # Video 2
    ├── ...             # Videos 3-9
    └── ffbv10.mp4      # Video 10
```

## 🚀 Setup Instructions

### Step 1: Create the Images Folder
1. Create a folder called `images` in the same directory as `index.html`
2. This folder will contain all your photos and videos

### Step 2: Add Your Photos
1. Add your 50 photos to the `images` folder
2. Name them: `ffb1.jpg`, `ffb2.heic`, `ffb3.png` ... `ffb50.jpg` (any supported format)
3. **Supported formats**: .jpg, .jpeg, .heic, .png, .gif, .webp
4. **You can mix formats!** Example: ffb1.jpg, ffb2.heic, ffb3.png all work together

### Step 3: Add Your Videos
1. Add your 10 videos to the `images` folder
2. Name them: `ffbv1.mp4`, `ffbv2.mov` ... `ffbv10.mp4` (any supported format)
3. **Supported formats**: .mp4, .mov, .webm, .avi
4. **You can mix formats!** Example: ffbv1.mp4, ffbv2.mov both work perfectly

### Step 4: Open the Website
1. Double-click `index.html` to open in your default browser
2. Or right-click → "Open with" → Choose your browser
3. Enjoy your Valentine's Day gallery! 💖

## 🎨 Customization Guide

### Adding More Photos/Videos

Open `script.js` and find the CONFIG section at the top:

```javascript
const CONFIG = {
    photoCount: 50,      // Change this to your new photo count
    videoCount: 10,      // Change this to your new video count
    imageFolder: 'images/',
    photoBaseName: 'ffb{n}',        // Base name (without extension)
    videoBaseName: 'ffbv{n}',       // Base name (without extension)
    // Supported extensions - automatically detected!
    photoExtensions: ['.jpg', '.jpeg', '.heic', '.png', '.webp', '.gif'],
    videoExtensions: ['.mp4', '.mov', '.webm', '.avi']
};
```

**Example:** To add 10 more photos (total 60):
1. Add photos named `ffb51.jpg` (or .heic, .png, etc.) to `ffb60.jpg` in the images folder
2. Change `photoCount: 50` to `photoCount: 60`
3. Files can have different formats - they're automatically detected!

### Changing File Names

If your files have different names, update the base patterns:

```javascript
const CONFIG = {
    photoCount: 50,
    videoCount: 10,
    imageFolder: 'images/',
    photoBaseName: 'photo_{n}',    // Use {n} for the number
    videoBaseName: 'video_{n}',    // Use {n} for the number
    // Extensions are automatically detected
    photoExtensions: ['.jpg', '.jpeg', '.heic', '.png', '.webp', '.gif'],
    videoExtensions: ['.mp4', '.mov', '.webm', '.avi']
};
```

**Note:** The system automatically tries all supported formats, so you can mix .jpg, .heic, .png, etc.

### Changing Colors

Open `styles.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #ff6b9d;      /* Main pink color */
    --secondary-color: #c44569;     /* Darker pink */
    --accent-color: #ffa8d5;        /* Light pink accent */
    --light-pink: #fff0f5;          /* Background pink */
}
```

### Changing Text

Open `index.html` and modify:

```html
<h1 class="main-title">
    <span class="title-heart">❤️</span>
    Our Beautiful Memories          <!-- Change this -->
    <span class="title-heart">❤️</span>
</h1>
<p class="subtitle">A collection of our special moments together</p>  <!-- And this -->
```

## 🎮 User Controls

### Desktop
- **Click** on any photo/video to view in lightbox
- **Arrow Keys** (←/→) to navigate in lightbox
- **ESC** to close lightbox
- **Click outside** image to close lightbox
- **Hover** over videos to play preview

### Mobile/Touch Devices
- **Tap** on any photo/video to view
- **Swipe left/right** to navigate in lightbox
- **Tap outside** or close button to exit
- **Pinch to zoom** on images (browser default)

### Filtering
- Click **"All"** to show everything (60 items)
- Click **"Photos"** to show only photos (50 items)
- Click **"Videos"** to show only videos (10 items)

## 🔧 Troubleshooting

### Images/Videos Not Showing
1. Check that the `images` folder exists in the same directory as `index.html`
2. Verify file names match exactly: `ffb1.jpg`, `ffb2.jpg`, etc.
3. Check that files are not corrupted
4. Try opening the browser console (F12) to see any errors

### Videos Not Playing
1. Ensure videos are in .mp4 format
2. Check video codec (H.264 is most compatible)
3. Try a different browser
4. Check file size (very large videos may load slowly)

### Layout Issues
1. Clear browser cache (Ctrl+Shift+Delete)
2. Try a different browser
3. Check that all three files (HTML, CSS, JS) are in the same folder

### Slow Loading
1. Reduce image file sizes (recommended: under 2MB each)
2. Compress videos (recommended: under 20MB each)
3. Use fewer items if needed
4. Check internet connection (if hosting online)

## 🌐 Browser Compatibility

Tested and working on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above (4-5 columns)
- **Laptop/Tablet**: 769px - 1199px (3-4 columns)
- **Tablet**: 481px - 768px (2-3 columns)
- **Mobile**: 480px and below (1-2 columns)

## 💡 Tips for Best Results

### Photos
- **Resolution**: 1920x1080 or higher for best quality
- **Formats**: 
  - ✅ .jpg / .jpeg (best compatibility, smaller file size)
  - ✅ .heic (iPhone default, excellent quality)
  - ✅ .png (transparent backgrounds supported)
  - ✅ .webp (modern format, great compression)
  - ✅ .gif (animations supported)
- **Size**: Optimize to 500KB - 2MB per photo
- **Aspect Ratio**: Square (1:1) or landscape (16:9) work best
- **Note**: HEIC files from iPhone work directly - no conversion needed!

### Videos
- **Formats**: 
  - ✅ .mp4 (best compatibility)
  - ✅ .mov (QuickTime, iPhone default)
  - ✅ .webm (modern format)
  - ✅ .avi (older format, larger files)
- **Resolution**: 1080p recommended
- **Length**: Keep under 2 minutes for best performance
- **Size**: Compress to under 20MB per video
- **Audio**: Include if desired (controls available in lightbox)
- **Note**: MOV files from iPhone work directly!

### Organization
- Name files in chronological order for a timeline effect
- Or keep random for a surprise element
- Consider grouping by events or themes

## 🎁 Deployment Options

### Local (Just for You Two)
- Keep files on your computer
- Open directly in browser
- No internet needed!

### Share Online
1. **GitHub Pages** (Free)
   - Create a GitHub repository
   - Upload all files
   - Enable GitHub Pages in settings

2. **Netlify** (Free)
   - Drag and drop your folder
   - Get a custom URL

3. **Google Drive** (Free)
   - Upload as HTML file
   - Share with viewing permissions

## 🛡️ Privacy Notes

- All files are stored locally on your device
- No data is sent to external servers
- No tracking or analytics
- Completely private and secure

## ✨ Special Features Explained

### Heart Animation
- Hearts continuously float upward
- Different sizes and speeds for variety
- Subtle and not distracting

### Video Previews
- Hover to see a preview (desktop)
- Tap to open full player (mobile)
- Muted by default in grid view

### Lazy Loading
- Images load as you scroll
- Faster initial page load
- Better performance on mobile

### Smooth Transitions
- Every interaction has smooth animations
- Hover effects on gallery items
- Fade and zoom effects in lightbox

## 📝 License

This is a personal gift project. Feel free to modify and customize it as you wish!

## 💖 Final Notes

This gallery was created with love to showcase your beautiful memories together. Every detail was designed to create a romantic, smooth, and enjoyable browsing experience.

**Happy Valentine's Day!** 🌹💕

---

*Made with ❤️ for someone special*

## 🆘 Need Help?

If you encounter any issues or need help customizing:
1. Check the code comments in `script.js`
2. Review this README carefully
3. Make sure all file names match exactly
4. Clear your browser cache and refresh

Enjoy reliving your beautiful memories! 💝
