import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Base URL for GitHub Pages
  base: '/portfolio-react/',
  
  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': resolve(process.cwd(), './src'),
      '@context': resolve(process.cwd(), './context'),
      '@components': resolve(process.cwd(), './src/components'),
      '@pages': resolve(process.cwd(), './src/pages'),
      '@hooks': resolve(process.cwd(), './src/hooks'),
      '@types': resolve(process.cwd(), './src/types'),
      '@styles': resolve(process.cwd(), './src/styles'),
    },
  },
  
  // Development server settings
  server: {
    port: 3000,
    host: true,
    fs: {
      allow: ['..', './context'],
    },
  },
  
  // Build optimization
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  
  // CSS optimization
  css: {
    devSourcemap: true,
  },
  
  // Environment variables
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
});
