import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      react,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'react/jsx-pascal-case': 'error',
      'react/no-array-index-key': 'warn',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],

      'no-var': 'error',
      'prefer-const': 'error',

      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports
            ['^\\u0000'],

            // Node.js builtins, external packages
            [
              '^node:',
              '^(?!@(?:app|domains|lib|shared|types)(?:/|$))(?!@/)@?\\w',
            ],

            // Path aliases
            [
              '^@app(?:/|$)',
              '^@domains(?:/|$)',
              '^@lib(?:/|$)',
              '^@shared(?:/|$)',
              '^@types(?:/|$)',
              '^@/',
            ],

            // Relative imports
            ['^\\.'],

            // Style imports
            ['^.+\\.s?css$'],
          ],
        },
      ],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  prettierConfig,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
