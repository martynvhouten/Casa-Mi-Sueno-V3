// Define static routes for sitemap generation
const staticRoutes = [
  { path: '/', images: ['/images/Tuin_zwembad.jpg'] },
  { path: '/over-ons', images: [] },
  { path: '/het-huis', images: ['/images/Woonkamer_zithoek.jpg', '/images/Woonkamer_tafel_stoelen.jpg'] },
  { path: '/buiten', images: ['/images/Tuin_mediterraans.jpg', '/images/Tuin_zwembad.jpg'] },
  { path: '/omgeving', images: ['/images/Omgeving/Albir_panorama.jpg'] },
  { path: '/fotos', images: [] },
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
  
  // Add static routes
  staticRoutes.forEach((route) => {
    urls.push({
      loc: `${BASE_URL}${route.path}`,
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
      return 'daily';
    default:
      return 'monthly';
  }
};

const getPriority = (path: string): string => {
  switch (path) {
    case '/':
      return '1.0';
    case '/reserveren':
    case '/het-huis':
    case '/fotos':
      return '0.8';
    case '/contact':
    case '/omgeving':
      return '0.7';
    default:
      return '0.5';
  }
};

const generateXml = (urls: SitemapUrl[]): string => {
  const urlElements = urls.map(url => `
    <url>
      <loc>${url.loc}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
      ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
      ${url.priority ? `<priority>${url.priority}</priority>` : ''}
      ${url.images?.map(image => `
        <image:image>
          <image:loc>${BASE_URL}${image}</image:loc>
        </image:image>
      `).join('') || ''}
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urlElements}
</urlset>`;
}; 