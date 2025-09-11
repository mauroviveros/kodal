import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  ...eslintPluginAstro.configs.recommended,
  eslintPluginPrettierRecommended,
  globalIgnores(['.vercel/']),
  {
    files: ['*.astro'],
    languageOptions: {
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
