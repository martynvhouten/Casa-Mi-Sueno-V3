export interface MetaInfo {
  title: string;
  description: string;
  image?: string;
  type?: string;
  url?: string;
  keywords?: string;
  author?: string;
  robots?: string;
}

// Base URL for absolute image paths
const BASE_URL = 'https://casamisueno.nl';

export const DEFAULT_META: MetaInfo = {
  title: 'Casa Mi Sueño - Vakantiehuis in L\'Alfàs del Pi, Spanje',
  description: 'Ontdek dit moderne vakantiehuis met privé zwembad en tuin in L\'Alfàs del Pi, Costa Blanca. Ideaal gelegen tussen strand en bergen voor een perfecte Spaanse vakantie. Ook geschikt voor overwinteren (€1200/maand).',
  image: `${BASE_URL}/images/Tuin_zithoek.webp`,
  type: 'website',
  url: BASE_URL,
  keywords: 'vakantiehuis, L\'Alfàs del Pi, Costa Blanca, Spanje, zwembad, vakantie, verhuur, overwinteren, langere termijn',
  author: 'Casa Mi Sueño',
  robots: 'index, follow'
};

// Helper function to ensure absolute URLs for images
const ensureAbsoluteUrl = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${BASE_URL}${url.startsWith('/') ? url : '/' + url}`;
};

export const setMetaTags = (meta: MetaInfo) => {
  // Combine with defaults
  const finalMeta = { ...DEFAULT_META, ...meta };
  
  // Ensure image URLs are absolute for social sharing
  if (finalMeta.image) {
    finalMeta.image = ensureAbsoluteUrl(finalMeta.image);
  }
  
  // Ensure URL is absolute
  if (finalMeta.url) {
    finalMeta.url = ensureAbsoluteUrl(finalMeta.url);
  }
  
  // Basic meta
  document.title = finalMeta.title;
  document.documentElement.setAttribute('lang', 'nl');
  
  // Update meta tags
  updateMetaTag('description', finalMeta.description);
  if (finalMeta.keywords) updateMetaTag('keywords', finalMeta.keywords);
  if (finalMeta.author) updateMetaTag('author', finalMeta.author);
  if (finalMeta.robots) updateMetaTag('robots', finalMeta.robots);
  
  // OpenGraph - using absolute URLs for WhatsApp compatibility
  updateMetaTag('og:title', finalMeta.title);
  updateMetaTag('og:description', finalMeta.description);
  updateMetaTag('og:type', finalMeta.type || 'website');
  updateMetaTag('og:site_name', 'Casa Mi Sueño');
  updateMetaTag('og:locale', 'nl_NL');
  
  if (finalMeta.image) {
    updateMetaTag('og:image', finalMeta.image);
    // Add additional image meta tags for better WhatsApp support
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('og:image:alt', 'Casa Mi Sueño - Vakantiehuis met zwembad in L\'Alfàs del Pi');
  }
  
  if (finalMeta.url) {
    const urlObj = new URL(finalMeta.url);
    urlObj.search = '';
    urlObj.hash = '';
    if (urlObj.pathname !== '/' && urlObj.pathname.endsWith('/')) {
      urlObj.pathname = urlObj.pathname.replace(/\/+$/, '');
    }

    const normalizedUrl = urlObj.toString();
    updateMetaTag('og:url', normalizedUrl);
    updateMetaTag('canonical', normalizedUrl);
  }

  // Twitter Card - using absolute URLs
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', finalMeta.title);
  updateMetaTag('twitter:description', finalMeta.description);
  
  if (finalMeta.image) {
    updateMetaTag('twitter:image', finalMeta.image);
    updateMetaTag('twitter:image:alt', 'Casa Mi Sueño - Vakantiehuis met zwembad in L\'Alfàs del Pi');
  }
};

const updateMetaTag = (name: string, content: string) => {
  // Handle canonical separately: use <link rel="canonical"> and update it if it already exists
  if (name === 'canonical') {
    let linkEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', content);
    return;
  }

  // For all other meta tags (standard, OpenGraph, Twitter)
  let element = document.querySelector(`meta[name="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    if (name.startsWith('og:')) {
      element.setAttribute('property', name);
    } else {
      // Works for both standard and Twitter tags
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};