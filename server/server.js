require("babel-register"); // just used for develop 

const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const Vue = require('vue');
const { createRenderer } = require('vue-server-renderer');

// const renderer = require('vue-server-renderer').createRenderer();
// const static = require('koa-static');

const app = new Koa();
const router = new Router();

router.get('*', ctx => {
  const app = new Vue({
    data: {
      username: 'zhaorui2'
    },
    template: `<div>hello {{username}}, this is a page rendered at server!</div>`
  });
  
  const renderer = createRenderer({
    // 入口页的模板
    template: fs.readFileSync(path.resolve(__dirname, '../web/index.template.html'), 'utf-8'),
  });

  const context = {
    title: 'vue ssr'
  }

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      console.log(err)
      ctx.response.status(500).end('Internet server error');
      return;
    }
    ctx.body = html;
    // ctx.body = `
    //   <DOCTYPE html>
    //   <html>
    //     <head></head>
    //     <body>${html}</body>
    //   </html>

    // `;
  });
});

app.use(router.routes());
// const staticPath = path.resolve(__dirname, '../web');

// app.use(static(staticPath));

// app.use(ctx => {
//   ctx.body = 'hello koa2';
// });


app.listen(3000);
console.log('start-quick is starting at port 3000')