import { FlatCompat } from '@eslint/eslintrc'
import { defineConfig } from 'eslint'

const compat = new FlatCompat()

export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ]
  },
  ...compat.extends('next/core-web-vitals'),
  {
    plugins: {
      next
    },
    rules: {
      // You can add custom rules here
    }
  }
])