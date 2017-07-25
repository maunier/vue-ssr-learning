import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base.babel.js';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import webpack from 'webpack';

const config = merge(baseConfig, {
  entry: {
    app: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', path.resolve(__dirname, '../client-entry.js')],
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js',
    }
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    // 可以取代 html-webpack-plugin 来注入正确的资源 URL
    new VueSSRClientPlugin(),
    new webpack.HotModuleReplacementPlugin() // 开启HMR
  ],
});

export default config;