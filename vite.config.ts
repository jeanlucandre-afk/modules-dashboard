import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages serves the repo at /modules-dashboard/, so we set base accordingly.
// Build output goes to /docs so Pages can serve from main branch /docs.
export default defineConfig({
  base: '/modules-dashboard/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'docs',
    // emptyOutDir disabled so we can keep /docs/deliverables/ and /docs/.nojekyll across builds.
    // The build step in package.json clears /docs/assets and the index.html before rebuild.
    emptyOutDir: false,
    assetsDir: 'assets',
  },
});
