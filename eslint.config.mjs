import globals from 'globals'
import pluginJs from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  jsdoc.configs['flat/recommended'],
  {
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    ignores: ['site/*'],
  },
]
