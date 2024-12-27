import globals from 'globals'
import pluginJs from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  jsdoc.configs['flat/recommended'],
  includeIgnoreFile(gitignorePath),
  {
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    ignores: ['site/*'],
  },
]
