import Router from 'koa-router';
import list from './list';

const apiRouter = new Router();

apiRouter.use('/api', list.routes());

// 当commenjs和es6混用的时候，export default貌似是有问题, 只能用export
export { apiRouter }