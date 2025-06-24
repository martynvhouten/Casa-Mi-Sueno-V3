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

export const DEFAULT_META: MetaInfo = {
  title: 'Casa Mi Sueño - Vakantiehuis in L\'Alfàs del Pi, Spanje',
  description: 'Geniet van een ontspannen vakantie in ons comfortabele vakantiehuis met zwembad in L\'Alfàs del Pi, Costa Blanca. Perfect gelegen tussen bergen en zee.',
  image: '/images/Tuin_zwembad.jpg',
  type: 'website',
  keywords: 'vakantiehuis, L\'Alfàs del Pi, Costa Blanca, Spanje, zwembad, vakantie, verhuur',
  author: 'Casa Mi Sueño',
  robots: 'index, follow'
};

export const setMetaTags = (meta: MetaInfo) => {
  // Combine with defaults
  const finalMeta = { ...DEFAULT_META, ...meta };
  
  // Basic meta
  document.title = finalMeta.title;
  document.documentElement.setAttribute('lang', 'nl');
  
  // Update meta tags
  updateMetaTag('description', finalMeta.description);
  if (finalMeta.keywords) updateMetaTag('keywords', finalMeta.keywords);
  if (finalMeta.author) updateMetaTag('author', finalMeta.author);
  if (finalMeta.robots) updateMetaTag('robots', finalMeta.robots);
  
  // OpenGraph
  updateMetaTag('og:title', finalMeta.title);
  updateMetaTag('og:description', finalMeta.description);
  updateMetaTag('og:type', finalMeta.type || 'website');
  if (finalMeta.image) {
    updateMetaTag('og:image', finalMeta.image);
  }
  if (finalMeta.url) {
    updateMetaTag('og:url', finalMeta.url);
    updateMetaTag('canonical', finalMeta.url);
  }

  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', finalMeta.title);
  updateMetaTag('twitter:description', finalMeta.description);
  if (finalMeta.image) {
    updateMetaTag('twitter:image', finalMeta.image);
  }
};

const updateMetaTag = (name: string, content: string) => {
  let element = document.querySelector(`meta[name="${name}"]`) || 
                document.querySelector(`meta[property="${name}"]`);
                
  if (!element) {
    element = document.createElement('meta');
    if (name.startsWith('og:')) {
      element.setAttribute('property', name);
    } else if (name.startsWith('twitter:')) {
      element.setAttribute('name', name);
    } else if (name === 'canonical') {
      element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      element.setAttribute('href', content);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }
  
  if (name === 'canonical') {
    (element as HTMLLinkElement).href = content;
  } else {
    element.setAttribute('content', content);
  }
}; 