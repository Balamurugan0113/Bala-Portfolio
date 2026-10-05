import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: 'client',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // NOTE: three/@react-three/drei are intentionally NOT in manualChunks —
        // they must stay inside the lazily-loaded hero chunk so the initial
        // route never fetches ~1MB of WebGL code up front.
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion', 'wouter', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
  server: {
    host: true,
    // Allow sandbox/preview proxies (e.g. *.e2b.app) to reach the dev server
    allowedHosts: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
