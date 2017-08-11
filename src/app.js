import Vue from 'vue';
import App from 'views/App.vue';
import createStore from 'store';
import createRouter from 'router';

Vue.config.debug = true;

/*
  避免状态单例
    Node.js 服务器是一个长期运行的进程。
    当我们的代码进入该进程时，它将进行一次取值并留存在内存中。
    这意味着如果创建一个单例对象，它将在每个传入的请求之间共享。
*/
export default function createApp () {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    name: 'rootVue', // 方便调试
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}