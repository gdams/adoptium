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
    optimizer: {
      web: {
        include: ['vitest-canvas-mock'],
      }
    },
    setupFiles: './vitest-setup.ts',
    coverage: {
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/types/**', 'src/**/__tests__/**', 'src/**/__mocks__/**'],
      reporter: ['text', 'json', 'html']
    }
  }
})
