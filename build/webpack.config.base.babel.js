import { srcPath } from '../constants';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js', // you should not use [chunkhash] or [hash] for development. This will cause many other issues, like a memory leak, because the dev server does not know when to clean up the old files.
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
      filename: '[name].style.css'
    })
  ]
};