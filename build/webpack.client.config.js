import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack.base.config.js';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import webpack from 'webpack';

const config = merge(baseConfig, {
  entry: {
    // to work with hot middleware
    app: ['webpack-hot-middleware/client', path.resolve(__dirname, '../src/client-entry.js')],
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
    new webpack.HotModuleReplacementPlugin(),
  ],
});

export default config;