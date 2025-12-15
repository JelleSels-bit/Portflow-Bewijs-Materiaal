// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  base: '/astro-build',
  site: 'https://meetjelle.be/astro-build',
  vite: {
    plugins: [tailwindcss()]
  }
});