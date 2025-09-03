import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public/assets',
    emptyOutDir: false,
    lib: {
      entry: 'client/main.jsx',
      name: 'App',
      formats: ['es'],
      fileName: () => 'app.js',
    },
    rollupOptions: {
      external: [],
    },
  },
});
