import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
  css: {
    preprocessorOptions: {
      css: {
        modules: {
          // By default, CSS modules are enabled.
          // If you want to disable CSS modules, set this to false
          localsConvention: 'camelCase', // Optionally, you can specify the naming convention for the generated class names
        }
      }
    }
  }
});
