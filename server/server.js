require("babel-register"); // just used for develop 

const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const Vue = require('vue');
const { createRenderer } = require('vue-server-renderer');

const { createApp } = require('../web/app');

const server = new Koa();
const router = new Router();

router.get('*', ctx => {
  const createAppData = {
    username: 'zhaorui',
  };
  const app = createApp(createAppData);
  
  const renderer = createRenderer({
    // 入口页的模板
    template: fs.readFileSync(path.resolve(__dirname, '../web/index.template.html'), 'utf-8'),
  });

  const context = {
    title: 'vue ssr'
  };

  /*
    利用vue的服务端渲染器将vue实例渲染成浏览器/爬虫识别的html
    并且插入到入口页模板的<!--vue-ssr-outlet-->注释的位置

    访问localhost:3000查看源码：
      <div data-server-rendered="true">hello zhaorui2, this is a page rendered at server!</div>
  */
  renderer.renderToString(app, context, (err, html) => {
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