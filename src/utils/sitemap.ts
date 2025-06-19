import routes from '../router/routes';
import { RouteRecordRaw } from 'vue-router';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const BASE_URL = 'https://casamisueno.es';

export const generateSitemap = (): string => {
  const urls: SitemapUrl[] = [];
  
  // Add static routes from vue-router
  routes.forEach((route: RouteRecordRaw) => {
    if (route.path && !route.path.includes(':') && !route.path.includes('*')) {
      // Handle nested routes
      if (route.children) {
        route.children.forEach((child: RouteRecordRaw) => {
          const fullPath = child.path ? `${route.path}${child.path === '' ? '' : `/${child.path}`}` : route.path;
          if (fullPath && !fullPath.includes(':') && !fullPath.includes('*')) {
            urls.push({
              loc: `${BASE_URL}${fullPath}`,
              changefreq: getChangeFreq(fullPath),
              priority: getPriority(fullPath)
            });
          }
        });
      } else {
        urls.push({
          loc: `${BASE_URL}${route.path}`,
          changefreq: getChangeFreq(route.path),
          priority: getPriority(route.path)
        });
      }
    }
  });

  return generateXml(urls);
};

const getChangeFreq = (path: string): string => {
  switch (path) {
    case '/':
      return 'weekly';
    case '/reserveren':
    case '/beschikbaarheid':
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