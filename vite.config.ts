import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://bezliki7.github.io/stocks/',
  plugins: [react()],

  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
