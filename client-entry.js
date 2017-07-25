

// 只会在入口页加载进来后执行一次
import Vue from 'vue';
import createApp from 'app';

Vue.mixin({
  beforeMount () {
    console.log('beforeMount');
    const { asyncData } = this.$options;

    if (asyncData) {
      asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
  }
});

const { app, router, store } = createApp();

console.log('window.__INITIAL_STATE__:', window.__INITIAL_STATE__);
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount('#app');
});

