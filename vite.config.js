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
        manualChunks(id) {
          // Keep ALL react-related packages in one single chunk
          // This prevents forwardRef from being undefined
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/scheduler/') ||
            id.includes('node_modules/framer-motion/') ||
            id.includes('node_modules/@remix-run/')
          ) {
            return 'react-bundle'
          }
          if (id.includes('node_modules/@supabase/')) {
            return 'supabase'
          }
          if (id.includes('node_modules/')) {
            return 'vendors'
          }
        }
      }
    }
  }
})