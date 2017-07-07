const Koa = require('koa');
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();
const Router = require('koa-router');

// const static = require('koa-static');
// const path = require('path');

const app = new Koa();
const router = new Router();

router.get('*', ctx => {
  const app = new Vue({
    data: {
      username: 'zhaorui'
    },
    template: `<div>hello {{username}}, this is a page rendered at server!</div>`
  });

  renderer.renderToString(app, (err, html) => {
    if (err) {
      console.log(err)
      ctx.response.status(500).end('Internet server error');
      return;
    }
    ctx.body = `
      <DOCTYPE html>
      <html>
        <head></head>
        <body>${html}</body>
      </html>

    `;
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