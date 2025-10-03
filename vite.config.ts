import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Custom plugin to inject meta tags based on environment
const metaInjectionPlugin = (env: Record<string, string>) => {
  return {
    name: 'meta-injection',
    transformIndexHtml(html: string) {
      let transformedHtml = html;

      // Add canonical URL for Cloudflare (production)
      if (env.VITE_DEPLOY_TARGET === 'cloudflare' && env.VITE_CANONICAL_URL) {
        transformedHtml = transformedHtml.replace(
          '<meta name="viewport"',
          `<link rel="canonical" href="${env.VITE_CANONICAL_URL}/" />
    <meta name="viewport"`
        );
      }

      // Add noindex for GitHub Pages to prevent duplicate content
      if (env.VITE_DEPLOY_TARGET === 'github' || env.VITE_DEPLOY_TARGET === 'development') {
        transformedHtml = transformedHtml.replace(
          '<meta name="viewport"',
          `<meta name="robots" content="noindex, nofollow" />
    <meta name="viewport"`
        );
      }

      // Update base href for GitHub Pages
      if (env.VITE_ROUTER_BASE && env.VITE_ROUTER_BASE !== '/') {
        transformedHtml = transformedHtml.replace(
          '<base href="/" />',
          `<base href="${env.VITE_ROUTER_BASE}/" />`
        );
      }

      return transformedHtml;
    },
  };
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      metaInjectionPlugin(env),
    ],
    
    // Dynamic base URL based on environment
    base: env.VITE_ROUTER_BASE || '/',
    
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
      sourcemap: false, // Disable for production
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
  };
});
