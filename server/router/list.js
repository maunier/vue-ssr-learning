import Router from 'koa-router';
import ListController from '../controller/List';

const router = new Router();

router.get('/lists/:type', ListController.getList);

export default router;