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
  plugins: [vue(), VitePluginExternals()],
});
