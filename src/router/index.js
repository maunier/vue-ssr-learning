import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'views/Home.vue';
import List from 'views/List.vue';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    routes: [{
      name: 'homepage',
      path: '/',
      component: Home
    }, {
      name: 'list',
      path: '/list/:listType',
      component: List,
    }, {
      name: 'detail',
      path: '/articles/:articleId'
    }],
    mode: 'history',
  });
}