require("babel-register"); // just used for develop 

const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const { createBundleRenderer } = require('vue-server-renderer');
const { srcPath } = require('../constants');
const { setupDevServer, getClientManifest } = require('../build/setup-dev-server');

const server = new Koa();
const router = new Router();
const template = fs.readFileSync(path.resolve(srcPath, './index.template.html'), 'utf-8');


// clientManifest是webpack的VueSSRClientPlugin插件生成的vue-ssr-client-manifest.json文件，这个文件需要异步获取，当webpack打包完成后通过promise回调的方式传递回来
// clientManifest会自动将webpack打包生成的bundle注入到template当中，取代htmlwebpackplugin
// 由于clientManifest是通过回调函数异步获取，在webpack compiler编译完成后会resolve该值
async function getRender() {
  const [ clientManifest, bundle ] = await setupDevServer(server);
  const renderer = createBundleRenderer(bundle, {
    template,
    clientManifest,
  });

  return renderer;
}

const rendererPromise = getRender();
let renderer;

router.get('*',  async ctx => {
  const context = {
    title: 'vue ssr'
  };

  /*
    利用vue的服务端渲染器将vue实例渲染成浏览器/爬虫识别的html
    并且插入到入口页模板的<!--vue-ssr-outlet-->注释的位置

    访问localhost:3000查看源码：
      <div data-server-rendered="true">hello zhaorui2, this is a page rendered at server!</div>
  */
  renderer = await rendererPromise;
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err)
      ctx.response.status(500).end('Internet server error');
      return;
    }
    ctx.body = html;
  });
  
});

server.use(router.routes());
server.listen(3000);

console.log('start-quick is starting at port 3000')