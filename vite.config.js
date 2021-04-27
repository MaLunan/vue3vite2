import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    // 配置路径别名
    '@': path.resolve(__dirname, 'src'),
    'views': path.resolve(__dirname, 'src/views'),
    'com': path.resolve(__dirname, 'src/components'),
    'api': path.resolve(__dirname, 'src/api'),
    'utils': path.resolve(__dirname, 'src/utils'),
  },
  // 引入第三方的配置
  // optimizeDeps: {
  //   include: ["echarts", "axios", ]
  // },
  plugins: [vue()],
  // hostname: '0.0.0.0',
  // port: 8090,
  // 是否自动在浏览器打开
  // open: true,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
   base: './',
   /**
   * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
  outDir: 'dist',
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      },
    },
  }
})

