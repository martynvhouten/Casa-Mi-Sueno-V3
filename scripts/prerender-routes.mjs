#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { URL } from 'node:url';
import puppeteer from 'puppeteer';

const DIST_DIR = path.resolve(process.cwd(), 'dist', 'spa');
const ROUTES = [
  '/',
  '/over-ons',
  '/het-huis',
  '/buiten-leven',
  '/omgeving',
  '/fotos',
  '/praktisch',
  '/contact',
  '/reserveren',
  '/privacy',
  '/voorwaarden',
  '/sitemap',
  '/404'
];

const MIME_TYPES = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8']
]);

function ensureDistExists() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Build output directory not found: ${DIST_DIR}`);
  }
}

function safeResolveFile(pathname) {
  const normalized = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  return path.join(DIST_DIR, normalized);
}

function createStaticServer() {
  return http.createServer((req, res) => {
    const requestUrl = new URL(req.url || '/', 'http://localhost');
    let pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname.endsWith('/')) {
      pathname += 'index.html';
    }

    const directFile = safeResolveFile(pathname.slice(1));
    const fallbackFile = path.join(DIST_DIR, 'index.html');

    let fileToServe = directFile;
    if (!fs.existsSync(fileToServe) || fs.statSync(fileToServe).isDirectory()) {
      fileToServe = fallbackFile;
    }

    fs.readFile(fileToServe, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Server error while reading file.');
        return;
      }

      const ext = path.extname(fileToServe).toLowerCase();
      const contentType = MIME_TYPES.get(ext) || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
}

function getOutputPathForRoute(route) {
  if (route === '/') {
    return path.join(DIST_DIR, 'index.html');
  }

  const routeDir = route.replace(/^\/+/, '');
  return path.join(DIST_DIR, routeDir, 'index.html');
}

async function prerenderRoutes(baseUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    for (const route of ROUTES) {
      const url = `${baseUrl}${route}`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      await new Promise((resolve) => setTimeout(resolve, 500));

      const renderedHtml = await page.content();
      const fullHtml = `<!DOCTYPE html>\n${renderedHtml}\n`;
      const outputPath = getOutputPathForRoute(route);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, fullHtml, 'utf8');
      console.log(`Prerendered ${route} -> ${outputPath}`);
    }
  } finally {
    await page.close();
    await browser.close();
  }
}

async function run() {
  ensureDistExists();

  const server = createStaticServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    server.close();
    throw new Error('Unable to determine local prerender server port.');
  }

  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    await prerenderRoutes(baseUrl);
    console.log(`Prerender complete for ${ROUTES.length} routes.`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
