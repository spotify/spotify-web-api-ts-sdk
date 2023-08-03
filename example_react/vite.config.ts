import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 3000,
  },
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
})
