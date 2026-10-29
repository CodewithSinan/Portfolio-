import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  root: 'frontend',
  publicDir: false,
  build: {
    outDir: path.resolve(import.meta.dirname, 'backend/public/react'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        assetFileNames: (assetInfo) => assetInfo.name?.endsWith('.css') ? 'style.css' : 'assets/[name]-[hash][extname]'
      }
    }
  },
  server: {
    port: 5173
  }
});
