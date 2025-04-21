import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { vuestic } from '@vuestic/compiler/vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    vuestic({
      // 修正 vuestic 插件配置
      devtools: true, // 移除非法的 options 层级
      cssLayers: true,
    }),
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8585',
        changeOrigin: true, // 修正拼写错误的 changeover => changeOrigin
        rewrite: (path) => path.replace(/^\/api/, ''), // 更规范的 rewrite 配置
      },
    },
  },
})
