import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { CRX_OUTDIR  } from './globalConfig'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: CRX_OUTDIR,
  },
  plugins: [vue()],
  server: {
    port: 3000,
    open: '/',
    proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
