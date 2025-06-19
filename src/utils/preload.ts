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
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imagePath;
    document.head.appendChild(link);

    // Also preload WebP version if available
    const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const webpLink = document.createElement('link');
    webpLink.rel = 'preload';
    webpLink.as = 'image';
    webpLink.href = webpPath;
    webpLink.type = 'image/webp';
    document.head.appendChild(webpLink);
  });

  // Preload fonts
  CRITICAL_RESOURCES.fonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = fontUrl;
    document.head.appendChild(link);
  });
}; 