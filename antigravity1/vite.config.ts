import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3333'
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: { comments: false }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react')) return 'react';
          if (id.includes('node_modules')) return 'vendor';
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    target: ['es2020'],
    chunkSizeWarningLimit: 500
  }
});
