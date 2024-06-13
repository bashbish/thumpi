import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default mergeConfig(
  viteConfig,

  defineConfig({
    plugins: [viteSingleFile()],
    test: {
        globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
        setupFiles: './tests/setup.js',
        deps: {
            inline: ['@vue', 'vue-router']
        }
    }
  })
)
