'use strict';

import Vuex from 'vuex';
import Vue from 'vue';
import movie from 'store/movie';
import list from 'store/List';

Vue.use(Vuex);

export default function createStore () {
  return new Vuex.Store({
    modules: {
      movie,
      list
    }
  });
}