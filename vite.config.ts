import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { vuestic } from '@vuestic/compiler/vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    vuestic({
      options: {
        devtools: true,
        cssLayers: true,
      },
    }),
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
    }),
  ],
  // 添加以下server字段用于代理配置
  server: {
    proxy: {
      // 这里以'/api'为例，你可以根据实际后端接口的路径前缀来设置
      '/api': {
        target: 'http://localhost:8585',
        changeover: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
})
