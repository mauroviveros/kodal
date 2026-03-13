// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kodal.pet',
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [icon(), react()],
  adapter: vercel()
});
