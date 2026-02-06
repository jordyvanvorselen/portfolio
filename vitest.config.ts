import path from 'node:path'
import { defineConfig as defineViteConfig } from 'vitest/config'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig, mergeConfig } from 'vitest/config'
import reactSwc from '@vitejs/plugin-react-swc'

function stubNextAssetImport() {
  return {
    name: 'stub-next-asset-import',
    transform(_code: string, id: string) {
      if (/(jpg|jpeg|png|webp|gif|svg)$/.test(id)) {
        const imgSrc = path.relative(process.cwd(), id)
        return {
          code: `export default { src: '/${imgSrc}', height: 1, width: 1 }`,
        }
      }
      return null
    },
  }
}

// Create a base Vite config with plugins
const viteConfig = defineViteConfig({
  plugins: [reactSwc(), svgr(), tsconfigPaths(), stubNextAssetImport()],
})

// Merge with Vitest config
export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        // Ignore server-only imports
        'server-only': path.resolve(__dirname, 'package.json'),
      },
    },
    test: {
      environment: 'happy-dom',
      globals: true,
      setupFiles: ['./test/vitest.setup.tsx'],
      reporters: process.env['GITHUB_ACTIONS']
        ? ['dot', 'github-actions']
        : ['dot'],

      include: [
        './src/**/*.spec.tsx',
        './src/**/*.spec.ts',
        './test/msw/**/*.spec.tsx',
        './test/msw/**/*.spec.ts',
      ],
      coverage: {
        enabled: true,
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        reporter: ['text', 'lcov'],
        thresholds: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
        exclude: [
          // TS definition
          '**/*.d.ts',

          // Testing
          '**/*.spec.{ts,tsx}',
          'test/**',
          'integration-tests/**',

          // Payload CMS (declarative configs and auto-generated)
          'src/payload.config.ts',
          'src/payload-types.ts',
          'src/collections/**',
          'src/lib/payload/**',

          // Project specific
          'src/app/**',
          'src/i18n/**',
          'src/test/**',
          'src/types/project.ts',
          'src/types/lexical.ts',
          'src/lib/contentful-types.ts',
          'src/lib/constants.ts',
          'src/domains/home/skills/Technology.ts',
          'src/ui/Markdown.tsx', // Will be replaced by PayloadRichText.tsx
        ],
      },
    },
  })
)
