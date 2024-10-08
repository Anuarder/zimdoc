import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '~shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '~img': fileURLToPath(new URL('./src/shared/images', import.meta.url)),
    },
  },
});
