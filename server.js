require("babel-register");

const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const LRU = require('lru-cache')
const cors = require('koa2-cors');
const Router = require('koa-router');
const favicon = require('koa-favicon');
const { apiRouter } = require('./server/router');
const { srcPath, port } = require('./constants');
const { createBundleRenderer } = require('vue-server-renderer');
const { setupDevServer, getClientManifest } = require('./build/setup-dev-server');

let renderer;
const server = new Koa();
const router = new Router();
let readyPromise = setupDevServer(server, updateRenderer);;
const template = fs.readFileSync(path.resolve(srcPath, './index.template.html'), 'utf-8');

const microCache = LRU({
  max: 100,
  maxAge: 1000,
});

function updateRenderer (clientManifest, bundle) {
  /*
    组件实例缓存，缓存15分钟.
    大多数时候不应该也不需要缓存组件实例，
    一般的应用场景是在v-for中重复出现的组件需要缓存一下。
  */
  renderer = createBundleRenderer(bundle, {
    template,
    clientManifest,
    cache: LRU({ 
      max: 10000, 
      maxAge: 1000 * 60 * 15,
    }),
  });
}

function render(url) {
  let resolve;
  const promise = new Promise(r => resolve = r);
  const html = microCache.get(url);
  
  if (html) {
    console.log('catch hit!')
    resolve(html);
  } else {
    const context = {
      title: 'vue ssr',
      url,
    };

    renderer.renderToString(context, (err, html) => {
      resolve(html);
      microCache.set(url, html);
    });  
  }

  return promise;
}

router.use(favicon(`${__dirname}/favicon.ico`));

router.get('*', async ctx => {
  const { url } = ctx.request;
  await readyPromise;
  const res = await render(url); 
  // TODO: 调用乐趣的接口，将这个纯静态的页面写入到乐趣
  fs.writeFile('./dist' + url + '.html', res);
  ctx.status = 200;
  ctx.body = res;
});

server.use(cors());
server.use(apiRouter.routes());
server.use(router.routes());
server.listen(port);

console.log(`start-quick is starting at port ${port}`)