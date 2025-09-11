import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  ...eslintPluginAstro.configs.recommended,
  eslintPluginPrettierRecommended,
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
];
