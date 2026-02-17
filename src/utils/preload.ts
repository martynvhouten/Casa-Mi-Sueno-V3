interface PreloadConfig {
  images: string[];
}

const CRITICAL_RESOURCES: PreloadConfig = {
  images: [
    '/images/Tuin_zwembad.webp',
    '/images/Woonkamer_zithoek.webp',
    '/images/Tuin_mediterraans.webp'
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
    link.type = 'image/webp';
    document.head.appendChild(link);
  });
}; 