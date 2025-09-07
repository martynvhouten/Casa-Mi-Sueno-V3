// Define static routes for sitemap generation
const staticRoutes = [
  { path: '/', images: ['/images/Tuin_zithoek.webp'] },
  { path: '/over-ons', images: [] },
  { path: '/het-huis', images: ['/images/Woonkamer_zithoek.webp'] },
  { path: '/buiten-leven', images: ['/images/Tuin_zwembad.webp'] },
  { path: '/omgeving', images: [] },
  { path: '/fotos', images: ['/images/Keuken_deuraanzicht.webp'] },
  { path: '/praktisch', images: [] },
  { path: '/contact', images: [] },
  { path: '/reserveren', images: [] },
  { path: '/privacy', images: [] },
  { path: '/voorwaarden', images: [] },
  { path: '/sitemap', images: [] }
];

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
  images?: string[];
}

const BASE_URL = 'https://casamisueno.nl';

export const generateSitemap = (): string => {
  const urls: SitemapUrl[] = [];
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Add static routes, normalize to no trailing slash (except root)
  staticRoutes.forEach((route) => {
    const loc = route.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${route.path}`;
    urls.push({
      loc,
      lastmod: currentDate,
      changefreq: getChangeFreq(route.path),
      priority: getPriority(route.path),
      images: route.images
    });
  });

  return generateXml(urls);
};

const getChangeFreq = (path: string): string => {
  switch (path) {
    case '/':
      return 'weekly';
    case '/reserveren':
      return 'weekly';
    case '/fotos':
      return 'weekly';
    case '/privacy':
    case '/voorwaarden':
      return 'yearly';
    default:
      return 'monthly';
  }
};

const getPriority = (path: string): string => {
  switch (path) {
    case '/':
      return '1.0';
    case '/reserveren':
      return '0.95';
    case '/het-huis':
    case '/buiten-leven':
      return '0.9';
    case '/fotos':
    case '/over-ons':
    case '/contact':
      return '0.8';
    case '/omgeving':
    case '/praktisch':
      return '0.7';
    case '/privacy':
    case '/voorwaarden':
      return '0.3';
    case '/sitemap':
      return '0.2';
    default:
      return '0.5';
  }
};

const generateXml = (urls: SitemapUrl[]): string => {
  const urlElements = urls.map(url => {
    const imageElements = url.images?.map(image => `
      <image:image>
        <image:loc>${BASE_URL}${image}</image:loc>
        <image:caption>Casa Mi Sueño - Luxe vakantiewoning Costa Blanca</image:caption>
      </image:image>
    `).join('') || '';

    return `
  <url>
    <loc>${url.loc}</loc>${url.lastmod ? `
    <lastmod>${url.lastmod}</lastmod>` : ''}${url.changefreq ? `
    <changefreq>${url.changefreq}</changefreq>` : ''}${url.priority ? `
    <priority>${url.priority}</priority>` : ''}${imageElements}
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlElements}
</urlset>`;
}; 