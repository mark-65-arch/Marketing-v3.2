import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = process.env.SITE || 'https://marketingaihouston.com';
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/' : '/Marketing-v3.2/';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

/**
 * Get the last modified date of a file
 */
function getFileLastModified(filePath: string): string {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Generate sitemap entries for all pages
 */
function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const pagesDir = path.join(process.cwd(), 'src/pages');

  // Define static pages with their priorities
  const staticPages = [
    { path: 'index.astro', url: '', priority: '1.0', changefreq: 'weekly' },
    { path: 'about.astro', url: 'about', priority: '0.8', changefreq: 'monthly' },
    { path: 'contact.astro', url: 'contact', priority: '0.9', changefreq: 'monthly' },
    { path: 'pricing.astro', url: 'pricing', priority: '0.9', changefreq: 'weekly' },
    { path: 'business-profile-optimization.astro', url: 'business-profile-optimization', priority: '0.9', changefreq: 'monthly' },
    { path: 'website-design-that-converts.astro', url: 'website-design-that-converts', priority: '0.9', changefreq: 'monthly' },
    { path: 'pro-website-growth-plan.astro', url: 'pro-website-growth-plan', priority: '0.9', changefreq: 'monthly' },
    { path: 'seo-growth-strategy.astro', url: 'seo-growth-strategy', priority: '0.9', changefreq: 'monthly' },
  ];

  // Legal pages
  const legalPages = [
    { path: 'legal/privacy-policy.astro', url: 'legal/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: 'legal/terms-of-service.astro', url: 'legal/terms-of-service', priority: '0.3', changefreq: 'yearly' },
    { path: 'legal/cookie-policy.astro', url: 'legal/cookie-policy', priority: '0.3', changefreq: 'yearly' },
    { path: 'legal/accessibility-statement.astro', url: 'legal/accessibility-statement', priority: '0.3', changefreq: 'yearly' },
    { path: 'legal/copyright-notice.astro', url: 'legal/copyright-notice', priority: '0.3', changefreq: 'yearly' },
  ];

  // Add English pages
  [...staticPages, ...legalPages].forEach(page => {
    const filePath = path.join(pagesDir, page.path);
    const lastmod = getFileLastModified(filePath);

    entries.push({
      url: `${SITE_URL}${BASE_PATH}${page.url}`,
      lastmod,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Add Spanish pages
  [...staticPages, ...legalPages].forEach(page => {
    const filePath = path.join(pagesDir, 'es', page.path);
    const lastmod = getFileLastModified(filePath);

    entries.push({
      url: `${SITE_URL}${BASE_PATH}es/${page.url}`,
      lastmod,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  return entries;
}

/**
 * Generate XML sitemap
 */
function generateSitemapXML(entries: SitemapEntry[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

export const GET: APIRoute = () => {
  const entries = generateSitemapEntries();
  const sitemap = generateSitemapXML(entries);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
