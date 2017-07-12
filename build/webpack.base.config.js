import { srcPath } from '../constants';
import path from 'path';

export default {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js', 
    // publicPath: '/dist/'
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