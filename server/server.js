const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
// const Router = require('koa-router');

const app = new Koa();
const staticPath = path.resolve(__dirname, '../web');
// const router = new Router();

app.use(static(staticPath));

// app.use(ctx => {
//   ctx.body = 'hello koa2';
// });


app.listen(3000);
console.log('start-quick is starting at port 3000')