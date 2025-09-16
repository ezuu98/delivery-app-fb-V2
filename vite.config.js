import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  build: {
    outDir: 'dist',          // ✅ output goes to dist instead of public/assets
    emptyOutDir: true,       // ✅ clean dist on each build
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
  publicDir: 'public',       // ✅ keep static assets separate
})
