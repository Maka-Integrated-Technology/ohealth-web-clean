import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  // {
  //   rules: {
  //     ...tseslint.configs.recommended.rules,
  //     ...reactHooks.configs.recommended.rules,
  //     ...eslintConfigPrettier.rules, // Disable rules that conflict with Prettier
  //     'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  //     'prettier/prettier': 'error',
  //   },
  // },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']),
]);

export default eslintConfig;
