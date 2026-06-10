/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import react from '@vitejs/plugin-react';
import { defineConfig, transformWithEsbuild } from 'vite';
import path from 'path';
import { codeInspectorPlugin } from 'code-inspector-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!/src\/.*\.js$/.test(id)) {
          return null;
        }

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    react(),
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.json': 'json',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 仅对“真正首屏(入口)必加载”的稳定基础库显式分包以获得 immutable 长缓存；
        // 体积大但仅特定页面使用的库（@douyinfe/semi-ui 后台框架、@visactor 图表、
        // @lobehub/icons 厂商图标）刻意不强制分包——一旦强制分包且被众多 lazy 页面
        // 共享，rollup 会把它作为 side-effect import 灌进入口/共享 chunk，导致轻量
        // 公开页(/login 等)也被迫下载它们。交给 rollup 按动态 import 边界自然分包，
        // 它们只会落入真正使用的 lazy 页面 chunk。
        manualChunks: {
          'react-core': [
            'react',
            'react-dom',
            'react-router-dom',
            'react/jsx-runtime',
            'react/jsx-dev-runtime',
          ],
          tools: ['axios', 'history'],
          markdown: ['marked'],
          upload: ['react-dropzone'],
          fireworks: ['react-fireworks'],
          captcha: ['react-turnstile'],
          telegram: ['react-telegram-login'],
          toast: ['react-toastify'],
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
          ],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/mj': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/pg': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
