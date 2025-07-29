// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Your Express server's address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Ensure the /api prefix is kept
      },
    },
  },
  // TEMPORARY: Explicitly define the environment variable for the client-side bundle
  // This is for diagnostic purposes to see if the variable is picked up.
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('https://khandelwal-matrimony.onrender.com'),
  },
});
