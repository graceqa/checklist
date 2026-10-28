/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/checklist/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  test: {
    environment: 'happy-dom'
  }
});
