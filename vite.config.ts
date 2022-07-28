/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        splash: resolve(__dirname, 'splashscreen.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          let ext = assetInfo.name.split('.').at(1);
          if (/^(?:png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(ext)) {
            ext = 'images';
          } else if (/^(?:woff|woff2)$/i.test(ext)) {
            ext = 'fonts';
          }
          return `assets/${ext}/[name].[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
      },
    },
    target: ['edge89', 'safari15'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/src/assets/styles/variables.scss";
          @import "/node_modules/bulma/sass/utilities/mixins.sass";
        `,
      },
    },
  },
});
