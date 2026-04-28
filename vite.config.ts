import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Build outputs to .build/ then the npm script copies the result to repo root
 * (overwriting index.html + assets/) so GitHub Pages "main / root" serves it
 * directly. The dev server uses dev.html as the source HTML.
 */
export default defineConfig({
  base: '/modules-dashboard/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: '/dev.html',
  },
  build: {
    outDir: '.build',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: path.resolve(__dirname, 'dev.html'),
    },
  },
});
