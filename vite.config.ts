import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

export default () => {
  const isMarkupMode = !!process.env.MARKUP_MODE;
  const isRunDevServer = process.env.NODE_ENV === 'development';
  const vitePlugins: PluginOption = [
    react(),
    ViteEjsPlugin({
      isMarkupMode,
    }),
  ];
  let sourcemap = isRunDevServer;

  if (process.env.VISUALIZER === 'Y') {
    vitePlugins.push(
      visualizer({
        emitFile: true,
        filename: 'stats.html',
      }) as unknown as PluginOption
    );
    sourcemap = false;
  }

  return defineConfig({
    plugins: vitePlugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@markup': path.resolve(__dirname, 'src/markup'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./src/assets/styles/_variables.scss";
            @import "./src/assets/styles/_mixins.scss";
          `,
        },
      },
    },
    build: {
      sourcemap,
      rollupOptions: {
        treeshake: true,
      },
    },
    server: {
      port: isMarkupMode ? 9300 : 9400,
    },
  });
};
