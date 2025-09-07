#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://casamisueno.nl';

// Keep in sync with app routes
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

function getChangeFreq(p) {
  switch (p) {
    case '/':
    case '/reserveren':
    case '/fotos':
      return 'weekly';
    case '/privacy':
    case '/voorwaarden':
      return 'yearly';
    default:
      return 'monthly';
  }
}

function getPriority(p) {
  switch (p) {
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
}

function generateXml(urls) {
  const urlElements = urls.map((u) => {
    const imageElements = (u.images || []).map((img) => `
      <image:image>
        <image:loc>${BASE_URL}${img}</image:loc>
        <image:caption>Casa Mi Sueño - Luxe vakantiewoning Costa Blanca</image:caption>
      </image:image>`).join('');

    return `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${imageElements}
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlElements}
</urlset>`;
}

function run() {
  const currentDate = new Date().toISOString().split('T')[0];
  const urls = staticRoutes.map((r) => ({
    loc: r.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${r.path}`,
    lastmod: currentDate,
    changefreq: getChangeFreq(r.path),
    priority: getPriority(r.path),
    images: r.images
  }));

  const xml = generateXml(urls);
  const outDir = path.resolve(process.cwd(), 'public');
  const outFile = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, xml, 'utf8');

  // Ensure robots.txt has correct Sitemap line
  const robotsPath = path.join(outDir, 'robots.txt');
  let robots = '';
  if (fs.existsSync(robotsPath)) {
    robots = fs.readFileSync(robotsPath, 'utf8');
  } else {
    robots = 'User-agent: *\nAllow: /\n';
  }
  const sitemapLine = 'Sitemap: https://casamisueno.nl/sitemap.xml';
  if (!robots.includes(sitemapLine)) {
    // Remove old Sitemap lines and append correct one
    robots = robots.replace(/^Sitemap:.*$/gim, '').trim();
    robots += (robots.endsWith('\n') ? '' : '\n') + sitemapLine + '\n';
    fs.writeFileSync(robotsPath, robots, 'utf8');
  }

  // Log minimal summary
  console.log(`Generated ${outFile} with ${urls.length} URLs.`);
  console.log(`Updated ${robotsPath} with sitemap reference.`);
}

run();


