// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kodal.pet',
  output: 'server',
  security: {
    actionBodySizeLimit: 6 * 1024 * 1024, // 6MB
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [icon(), react()],
  adapter: vercel(),
  fonts: [{
    provider: fontProviders.npm(),
    name: 'Inter Variable',
    cssVariable: '--font-inter',
    options: {
      package: '@fontsource-variable/inter',
    }
  }]
});
