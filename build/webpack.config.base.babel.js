import { srcPath } from '../constants';
import path from 'path';

export default {
  output: {
    path: path.resolve(__dirname, '../dist'), // 构建到/dist目录下。
    filename: '[name].[hash].js', 
    // publicPath: './dist/static', //output中所有的路劲会被替换成
  },
  resolve: {
    modules: ['node_modules', srcPath],
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader',
      // options: vueConfig
    }],
  },
};