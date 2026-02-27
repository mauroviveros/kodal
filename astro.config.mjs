// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kodal.pet',
  security: {
    allowedDomains: [
      { hostname: 'www.kodal.pet' },
    ]
  },
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [icon(), react()],
  adapter: vercel(),
});
