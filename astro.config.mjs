// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mark-65-arch.github.io',
  base: process.env.NODE_ENV === 'production' ? '/Marketing-v3.2/' : '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});