#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

function readPublishDir() {
  const netlifyToml = path.resolve(process.cwd(), 'netlify.toml');
  let publish = '';
  if (fs.existsSync(netlifyToml)) {
    const txt = fs.readFileSync(netlifyToml, 'utf8');
    const m = txt.match(/\[build\][\s\S]*?publish\s*=\s*"([^"]+)"/i);
    if (m) publish = m[1].trim();
  }
  if (!publish) {
    const distSpa = path.resolve(process.cwd(), 'dist', 'spa');
    const dist = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distSpa)) publish = distSpa;
    else if (fs.existsSync(dist)) publish = dist;
    else publish = path.resolve(process.cwd(), 'dist', 'spa');
  }
  return path.isAbsolute(publish) ? publish : path.resolve(process.cwd(), publish);
}

function ensureDirExists(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {}
}

function copyFile(src, dest) {
  ensureDirExists(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function run() {
  const publishDir = readPublishDir();
  if (!fs.existsSync(publishDir)) {
    console.warn(`Publish directory does not exist yet: ${publishDir}`);
    console.warn('Build may not have produced output. Skipping copy.');
    process.exit(0);
  }

  const publicDir = path.resolve(process.cwd(), 'public');
  const sitemapSrc = path.join(publicDir, 'sitemap.xml');
  const robotsSrc = path.join(publicDir, 'robots.txt');
  if (!fs.existsSync(sitemapSrc) || !fs.existsSync(robotsSrc)) {
    console.error('Missing sitemap.xml or robots.txt in public/. Run prebuild first.');
    process.exitCode = 1;
    return;
  }

  const sitemapDest = path.join(publishDir, 'sitemap.xml');
  const robotsDest = path.join(publishDir, 'robots.txt');
  copyFile(sitemapSrc, sitemapDest);
  copyFile(robotsSrc, robotsDest);

  // Create Netlify-compatible 404 page from the prerendered /404 route
  const notFoundSrc = path.join(publishDir, '404', 'index.html');
  const notFoundDest = path.join(publishDir, '404.html');
  if (fs.existsSync(notFoundSrc)) {
    copyFile(notFoundSrc, notFoundDest);
    console.log(`Copied 404 page to: ${notFoundDest}`);
  } else {
    console.warn(`Prerendered 404 source not found: ${notFoundSrc}`);
  }

  console.log(`Copied sitemap to: ${sitemapDest}`);
  console.log(`Copied robots to: ${robotsDest}`);
}

run();


