import { srcPath } from '../constants';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  output: {
    path: path.resolve(__dirname, '../dist'), // 构建到/dist目录下。
    filename: '[name].[hash].js', 
  },
  resolve: {
    modules: ['node_modules', srcPath],
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          'sass': ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'vue-style-loader'
          })
        },
      }
    }],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].style.[contenthash].css'
    })
  ]
};