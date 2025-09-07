#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import puppeteer from 'puppeteer';

const BASE_ORIGIN = 'https://casamisueno.nl';
const START_PATH = '/';
const MAX_DEPTH = 2; // starting at '/'

/**
 * Normalize a URL to same-origin absolute URL without hash
 */
function normalizeToSameOrigin(href, base = BASE_ORIGIN) {
  if (!href) return null;
  try {
    const u = new URL(href, base);
    if (u.origin !== new URL(base).origin) return null;
    u.hash = '';
    return u;
  } catch {
    return null;
  }
}

/**
 * Extract same-origin links from the rendered page
 */
async function extractLinks(page) {
  const hrefs = await page.$$eval('a[href]', (as) => as.map(a => a.getAttribute('href')));
  const links = [];
  for (const href of hrefs) {
    const u = normalizeToSameOrigin(href);
    if (!u) continue;
    if (u.protocol !== 'https:') continue; // enforce https in audit
    // Keep only path+search for uniqueness
    links.push(u.pathname + (u.search || ''));
  }
  return Array.from(new Set(links));
}

function toCsvValue(value) {
  if (value == null) return '';
  const s = String(value);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function writeCsv(rows, outfile) {
  const header = ['finalUrl', 'status', 'title', 'description', 'descriptionLength', 'canonicalHref', 'hasGA'];
  const lines = [header.join(',')];
  for (const r of rows) {
    lines.push([
      toCsvValue(r.finalUrl),
      toCsvValue(r.status),
      toCsvValue(r.title),
      toCsvValue(r.description),
      toCsvValue(r.descriptionLength),
      toCsvValue(r.canonicalHref),
      toCsvValue(r.hasGA)
    ].join(','));
  }
  fs.writeFileSync(outfile, lines.join('\n'), 'utf8');
}

function summarizeAndValidate(results) {
  const totals = {
    pages: results.length,
    titlesMissing: 0,
    descriptionsMissing: 0,
    canonicalsMissing: 0,
    gaMissing: 0
  };

  const failures = [];

  // Duplicate titles
  const titleToUrls = new Map();
  for (const r of results) {
    if (!r.title) totals.titlesMissing++;
    if (!r.description) totals.descriptionsMissing++;
    if (!r.hasGA) totals.gaMissing++;

    const u = new URL(r.finalUrl);
    const isHome = u.pathname === '/' || u.pathname === '';
    if (!isHome && !r.canonicalHref) totals.canonicalsMissing++;

    const t = (r.title || '').trim();
    if (!titleToUrls.has(t)) titleToUrls.set(t, []);
    titleToUrls.get(t).push(r.finalUrl);
  }

  for (const [title, urls] of titleToUrls.entries()) {
    if (title && urls.length > 1) {
      failures.push({ type: 'duplicate_title', title, urls });
    }
  }

  // Canonical must not point to root for non-home pages
  for (const r of results) {
    if (!r.canonicalHref) continue;
    try {
      const pageUrl = new URL(r.finalUrl);
      const canonUrl = new URL(r.canonicalHref, BASE_ORIGIN);
      const isHome = pageUrl.pathname === '/' || pageUrl.pathname === '';
      const canonIsRoot = canonUrl.origin === BASE_ORIGIN && (canonUrl.pathname === '/' || canonUrl.pathname === '');
      if (!isHome && canonIsRoot) {
        failures.push({ type: 'canonical_points_home', url: r.finalUrl, canonical: r.canonicalHref });
      }
    } catch {
      failures.push({ type: 'canonical_invalid', url: r.finalUrl, canonical: r.canonicalHref });
    }
  }

  // Missing fields
  for (const r of results) {
    const pageUrl = new URL(r.finalUrl);
    const isHome = pageUrl.pathname === '/' || pageUrl.pathname === '';
    if (!r.title) failures.push({ type: 'missing_title', url: r.finalUrl });
    if (!r.description) failures.push({ type: 'missing_description', url: r.finalUrl });
    if (!isHome && !r.canonicalHref) failures.push({ type: 'missing_canonical', url: r.finalUrl });
  }

  return { totals, failures };
}

async function crawl() {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  try {
    const startUrl = new URL(START_PATH, BASE_ORIGIN).toString();
    const queue = [{ url: startUrl, depth: 0 }];
    const visited = new Set();
    const results = [];

    while (queue.length) {
      const { url: nextUrl, depth } = queue.shift();
      const key = nextUrl;
      if (visited.has(key)) continue;
      visited.add(key);

      const page = await browser.newPage();
      let response;
      try {
        response = await page.goto(nextUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      } catch (e) {
        results.push({ finalUrl: nextUrl, status: 'ERR', title: '', description: '', descriptionLength: 0, canonicalHref: '', hasGA: false });
        await page.close();
        continue;
      }

      await page.waitForTimeout(300); // allow client-side meta updates

      const status = response ? response.status() : 0;
      const finalUrl = response ? response.url() : nextUrl;

      const data = await page.evaluate(() => {
        const title = document.title || '';
        const descEl = document.querySelector('meta[name="description"]');
        const description = descEl ? descEl.getAttribute('content') || '' : '';
        const canonicalEl = document.querySelector('link[rel="canonical"]');
        const canonicalHref = canonicalEl ? canonicalEl.getAttribute('href') || '' : '';
        const hasGA = !!(window.gtag || document.querySelector('script[src*="googletagmanager.com/gtag/js"]'));
        return { title, description, canonicalHref, hasGA };
      });

      results.push({
        finalUrl,
        status,
        title: data.title.trim(),
        description: data.description.trim(),
        descriptionLength: (data.description || '').trim().length,
        canonicalHref: data.canonicalHref ? new URL(data.canonicalHref, finalUrl).toString() : '',
        hasGA: !!data.hasGA
      });

      if (depth < MAX_DEPTH) {
        const links = await extractLinks(page);
        for (const p of links) {
          const abs = new URL(p, BASE_ORIGIN).toString();
          if (!visited.has(abs)) queue.push({ url: abs, depth: depth + 1 });
        }
      }

      await page.close();
    }

    // Write CSV
    const outfile = path.resolve(process.cwd(), 'seo-audit.csv');
    writeCsv(results, outfile);

    // Summary + validations
    const { totals, failures } = summarizeAndValidate(results);
    const summary = [
      `SEO Audit Summary`,
      `Pages crawled: ${totals.pages}`,
      `Missing titles: ${totals.titlesMissing}`,
      `Missing descriptions: ${totals.descriptionsMissing}`,
      `Missing canonicals (non-home): ${totals.canonicalsMissing}`,
      `Pages without GA: ${totals.gaMissing}`,
      failures.length ? `Failures (${failures.length}):` : 'Failures: 0'
    ];
    if (failures.length) {
      for (const f of failures) {
        if (f.type === 'duplicate_title') {
          summary.push(`- duplicate_title: "${f.title}" -> ${f.urls.join(', ')}`);
        } else if (f.type === 'canonical_points_home') {
          summary.push(`- canonical_points_home: ${f.url} -> ${f.canonical}`);
        } else if (f.type === 'canonical_invalid') {
          summary.push(`- canonical_invalid: ${f.url} -> ${f.canonical}`);
        } else {
          summary.push(`- ${f.type}: ${f.url}`);
        }
      }
    }

    const summaryText = summary.join('\n');
    console.log(summaryText);

    if (failures.length) {
      process.exitCode = 1;
    }

    return summaryText;
  } finally {
    await browser.close();
  }
}

// Main
crawl().catch((err) => {
  console.error('SEO audit failed with error:', err);
  process.exitCode = 1;
});


