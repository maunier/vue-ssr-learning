import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'views/Home.vue';
import List from 'views/List.vue';
import Movie from 'views/Movie.vue';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    routes: [{
      name: 'homepage',
      path: '/download',
      component: Home
    }, {
      name: 'list',
      path: '/movie2017',
      component: Movie,
    }, {
      name: 'detail',
      path: '/articles/:articleId'
    }],
    mode: 'history',
  });
}