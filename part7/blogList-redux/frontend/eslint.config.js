import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Apply base configurations first
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Then override with your custom rules
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      eqeqeq: 'error',
      'no-console': 'off',
    },
  },

  // Prettier config must be last to override formatting rules
  eslintConfigPrettier,
])
