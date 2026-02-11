import { defineConfig, globalIgnores } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import astro_parser from 'astro-eslint-parser';
import prettier from 'eslint-plugin-prettier/recommended';
import ts_parser from '@typescript-eslint/parser';

export default defineConfig([
  globalIgnores(['.astro/', '.husky/', '.vercel/', 'dist/', 'node_modules/', 'pnpm-lock.yaml']),
  astro.configs.recommended,
  astro.configs['jsx-a11y-recommended'],
  prettier,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astro_parser,
      parserOptions: {
        parser: ts_parser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    files: ['**/*.astro/*.ts', '*.astro/*.ts'],
    languageOptions: {
      globals: { browser: true, es2020: true },
      parserOptions: { parser: ts_parser, sourceType: 'module' },
    },
    rules: { 'prettier/prettier': 'off' },
  },
]);
