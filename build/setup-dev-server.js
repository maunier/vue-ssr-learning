'use strict';
/*
  dev-server

  注册webpack-dev-middleware中间件
  webpack打包完毕之后将生成的manifest文件传递给回调函数
*/
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import MFS from 'memory-fs';
import clientConfig from './webpack.client.config';
import serverConfig from './webpack.server.config';

export function setupDevServer(server) {
  let resolve;
  const promise = new Promise(r => { resolve = r; });

  // 客户端打包
  let clientResolve, clientManifest;
  const clientManifestPromise = new Promise(r => { clientResolve = r; })
  const clientCompiler = webpack(clientConfig);
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath || '',
    noInfo: true, // 不要输出打包信息
  });

  clientCompiler.plugin('done', stats => {
    // devMiddleware.fileSystem 可以获取到dev插件生成在内存中的文件系统？
    clientManifest = JSON.parse(devMiddleware.fileSystem.readFileSync(path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json'), 'utf-8'));
    clientResolve(clientManifest);
  });

  server.use(devMiddleware);

  // 服务端打包
  let serverResolve, bundle;
  const bundlePromise = new Promise(r => { serverResolve = r; });
  const serverCompiler = webpack(serverConfig);
  
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    bundle = JSON.parse(mfs.readFileSync(path.join(clientConfig.output.path, 'vue-ssr-server-bundle.json'), 'utf-8'));
    serverResolve(bundle);
  });

  Promise.all([clientManifestPromise, bundlePromise]).then(resolve);
  return promise;
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