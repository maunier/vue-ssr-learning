'use strict';

import Vue from 'vue';
import createApp from 'app';

Vue.mixin({
  beforeMount () {
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

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount('#app');
});

