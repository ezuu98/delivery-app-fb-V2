import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  envPrefix: ['VITE_', 'FIREBASE_'],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
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
  publicDir: 'public',
})
