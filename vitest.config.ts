import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,playwright}.config.*',
      '**/tests/e2e/**'
    ],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov'],
    }
  }
})
