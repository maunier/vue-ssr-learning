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
import clientConfig from './webpack.config.client.babel';
import serverConfig from './webpack.config.server.babel';

export function setupDevServer(server, cb) {
  let resolve;
  const promise = new Promise(r => { resolve = r; });

  // 客户端打包
  let clientResolve, clientManifest;
  const clientManifestPromise = new Promise(r => { clientResolve = r; })
  const clientCompiler = webpack(clientConfig);
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath || '',
    // noInfo: true, // 不要输出打包信息
  });

  clientCompiler.plugin('done', stats => {
    // devMiddleware.fileSystem 可以获取到dev插件生成在内存中的文件系统？
    clientManifest = JSON.parse(devMiddleware.fileSystem.readFileSync(path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json'), 'utf-8'));
    clientResolve(clientManifest);
    if (bundle) {
      cb(clientManifest, bundle);
    }
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
    console.log('serverCompiler watched');
    serverResolve(bundle);
    if (clientManifest) {
      cb(clientManifest, bundle);
    }
  });

  // 虽然这里resolve了值，但是并不可以用这个值,因为一个promise只能被resolve一次。
  // 应该使用回调函数来获取每次更新的clienManifest和bundle
  Promise.all([clientManifestPromise, bundlePromise]).then(resolve);
  return promise;
}