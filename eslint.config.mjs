import { defineConfig, globalIgnores } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import astro_parser from 'astro-eslint-parser';
import prettier from 'eslint-plugin-prettier/recommended';
import ts_parser from '@typescript-eslint/parser';

export default defineConfig([
  astro.configs.recommended,
  astro.configs['jsx-a11y-recommended'],
  prettier,
  globalIgnores(['.astro/', '.husky/', '.vercel/', '.vscode/', 'db/', 'dist/', 'node_modules/']),
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
    rules: { 'prettier/prettier': 'off' },
  },
]);
