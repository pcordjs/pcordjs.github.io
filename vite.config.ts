import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint src'
      }
    })
  ]
});
