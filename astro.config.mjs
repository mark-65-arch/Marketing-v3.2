// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE || 'https://marketingaihouston.com',
  base: process.env.NODE_ENV === 'production' ? '/Marketing-v3.2/' : '/',
  output: 'static',
  integrations: [sitemap()],

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