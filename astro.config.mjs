// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE || 'https://marketingaihouston.com',
  base: '/', // Root path for Hostinger deployment
  output: 'static',
  trailingSlash: 'ignore', // Allow both with/without trailing slashes to avoid redirects
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        // Service pages
        if (
          item.url.includes('/business-profile-optimization/') ||
          item.url.includes('/website-design-that-converts/') ||
          item.url.includes('/pro-website-growth-plan/') ||
          item.url.includes('/seo-growth-strategy/')
        ) {
          item.changefreq = 'monthly';
          item.priority = 0.9;
        }
        // Legal pages
        else if (item.url.includes('/legal/')) {
          item.changefreq = 'yearly';
          item.priority = 0.3;
        }
        // Contact and pricing
        else if (item.url.includes('/contact/') || item.url.includes('/pricing/')) {
          item.changefreq = 'monthly';
          item.priority = 0.9;
        }
        // About page
        else if (item.url.includes('/about/')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        }
        // Homepage (ends with just domain or /es/)
        else if (
          item.url.endsWith('/') &&
          (item.url.split('/').length === 4 || item.url.endsWith('/es/'))
        ) {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        }
        // Default for other pages (success page, etc)
        else {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        }
        return item;
      }
    })
  ],

  // Image optimization configuration
  image: {
    // Enable image optimization with Sharp (default)
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // Build optimization
  build: {
    // Inline small assets
    inlineStylesheets: 'auto',
    // Asset prefix for CDN compatibility
    assets: '_assets',
  },

  // Vite build optimizations
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Target modern browsers for smaller bundles
      target: 'es2020',
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Minify options
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // Chunk optimization
      rollupOptions: {
        output: {
          manualChunks: {
            // Keep vendor code separate for better caching
          },
        },
      },
    },
  },
});