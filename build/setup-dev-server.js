'use strict';
/*
  dev-server

  注册webpack-dev-middleware中间件
  webpack打包完毕之后将生成的manifest文件传递给回调函数
*/
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import clientConfig from './webpack.client.config';

export function setupDevServer(server) {
  let resolve, clientManifest;
  const clientManifestPromise = new Promise(r => { resolve = r; })
  const clientCompiler = webpack(clientConfig);
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath || '',
    noInfo: true, // 不要输出打包信息
  });

  clientCompiler.plugin('done', stats => {
    // devMiddleware.fileSystem 可以获取到dev插件生成在内存中的文件系统？
    clientManifest = JSON.parse(devMiddleware.fileSystem.readFileSync(path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json'), 'utf-8'));
    resolve(clientManifest);
  });

  server.use(devMiddleware);

  return clientManifestPromise;
}

// 这个方法有毛病。因为等到调用的时候done早就被触发了。
// export function getClientManifest () {
//   let resolve;
//   const clientManifestPromise = new Promise(r => { resolve = r });

//   // https://doc.webpack-china.org/api/plugins/compiler/
//   // compiler的事件钩子函数 —— 完成编译
//   clientCompiler.plugin('done', stats => {
//     console.log('done');
//     try {
//       // devMiddleware.fileSystem 可以获取到dev插件生成在内存中的文件系统？
//       clientManifest = JSON.parse(devMiddleware.fileSystem.readFileSync(path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json'), 'utf-8'));
//       resolve(clientManifest);
//       // callback(clientManifest);
//     } catch (e) {}
//   });

//   return clientManifestPromise;
// }