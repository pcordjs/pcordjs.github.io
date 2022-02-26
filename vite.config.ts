import preact from '@preact/preset-vite';
import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    checker({
      typescript: true
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
});
