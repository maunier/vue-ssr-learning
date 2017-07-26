import merge from 'webpack-merge';
import path from 'path';
import baseConfig from './webpack.config.base.babel.js';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin'
import nodeExternals from 'webpack-node-externals';

const config = merge(baseConfig, {
  target: 'node',
  entry: path.resolve(__dirname, '../server-entry.js'),
  output: {
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js',
    }
  },
  externals: nodeExternals(),
  plugins: [
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    new VueSSRServerPlugin()
  ]
});

export default config;