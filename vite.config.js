import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/react/',
  root: 'client',
  publicDir: false,
  build: {
    outDir: path.resolve(__dirname, 'public/react'),
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
