// Define static routes for sitemap generation
const staticRoutes = [
  { path: '/' },
  { path: '/over-ons' },
  { path: '/het-huis' },
  { path: '/buiten' },
  { path: '/omgeving' },
  { path: '/fotos' },
  { path: '/praktisch' },
  { path: '/contact' },
  { path: '/reserveren' },
  { path: '/privacy' },
  { path: '/voorwaarden' },
  { path: '/sitemap' }
];

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const BASE_URL = 'https://casamisueno.es';

export const generateSitemap = (): string => {
  const urls: SitemapUrl[] = [];
  
  // Add static routes
  staticRoutes.forEach((route) => {
    urls.push({
      loc: `${BASE_URL}${route.path}`,
      changefreq: getChangeFreq(route.path),
      priority: getPriority(route.path)
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
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlElements}
</urlset>`;
}; 