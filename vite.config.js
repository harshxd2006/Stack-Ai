import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Keep React and framer-motion in the SAME chunk
            // to avoid forwardRef being undefined
            if (id.includes('react') ||
              id.includes('framer-motion') ||
              id.includes('scheduler')) {
              return 'vendor-react'
            }
            if (id.includes('@supabase')) return 'vendor-supabase'
            return 'vendor'
          }
        }
      }
    }
  }
})