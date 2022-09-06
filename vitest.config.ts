import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'load-svg',
      enforce: 'pre',
      transform (_, id) {
        if (id.endsWith('.svg')) {
          return 'export default \'img\''
        }
      }
    }
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest-setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
})
