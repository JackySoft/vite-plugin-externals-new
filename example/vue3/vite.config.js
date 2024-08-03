import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePluginExternals } from '../../src/index';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': './src',
    },
  },
  plugins: [
    vue(),
    VitePluginExternals({
      vue: {
        src: 'https://static.huolala.cn/npm/vue@3.3.4/dist/vue.runtime.global.prod.js',
        varName: 'Vue',
        /**
         * 加载位置，默认追加到头部
         * 1. head：加载到头部最后
         * 2. body：加载到body最后
         */
        inject: 'head',
        defer: true,
      },
      'vue-router': {
        src: 'https://static.huolala.cn/npm/vue-router@4.2.4/dist/vue-router.global.prod.js',
        varName: 'VueRouter',
        defer: true,
        async: false,
      },
    }),
  ],
});
