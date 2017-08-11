'use strict';

import createApp from './src/app';

export default context => {
  let resolve;
  const { url } = context;
  const { app, router, store } = createApp();
  const promise = new Promise(r => { resolve = r; });

  router.push(url);
  router.onReady(() => {
    /*
      获取路由所匹配的组件
      获取组件所需要的数据
      store初始化完毕后resolve app
    */
    try {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) return;
      
      const allPromise = matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store, 
            route: router.currentRoute
          });
        }
      });

      Promise.all(allPromise).then(res => {
        context.state = store.state;
        resolve(app);
      });

    } catch (e) {
      console.log('router.onReady error:', e);
    }
  });

  return promise;
}