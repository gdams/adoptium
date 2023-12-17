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
    deps: {
      // vitest < 0.34
      inline: ['vitest-canvas-mock'],
      // >= 0.34
      optimizer: {
        web: {
          include: ['vitest-canvas-mock']
        }
      }
    },
    setupFiles: './vitest-setup.ts',
    coverage: {
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/types/**', 'src/**/__tests__/**', 'src/**/__mocks__/**'],
      reporter: ['text', 'json', 'html']
    },
    // >= 0.1.0
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },  
  }
})
