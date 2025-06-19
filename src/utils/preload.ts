interface PreloadConfig {
  images: string[];
  fonts: string[];
}

const CRITICAL_RESOURCES: PreloadConfig = {
  images: [
    '/images/Tuin_zwembad.jpg',
    '/images/Woonkamer_zithoek.jpg',
    '/images/Tuin_mediterraans.jpg'
  ],
  fonts: [
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap'
  ]
};

export const preloadCriticalResources = () => {
  // Preload critical images
  CRITICAL_RESOURCES.images.forEach(imagePath => {
    // Use prefetch instead of preload for images that are not immediately visible
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = imagePath;
    document.head.appendChild(link);

    // Also prefetch WebP version if available
    const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const webpLink = document.createElement('link');
    webpLink.rel = 'prefetch';
    webpLink.as = 'image';
    webpLink.href = webpPath;
    webpLink.type = 'image/webp';
    document.head.appendChild(webpLink);
  });

  // Load fonts directly instead of preloading
  CRITICAL_RESOURCES.fonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);
  });
}; 