'use strict';

import Vuex from 'vuex';
import Vue from 'vue';
import fetch from 'api';

Vue.use(Vuex);

export default function createStore () {
  return new Vuex.Store({
    state: {
      articleLists: null,
    },
    actions: {
      fetchArticleLists ({ commit }, type, pageNo = 1, size = 10) {
        if (!type) return Promise.reject('fetchArticleLists: you need a type');

        let resolve;
        const promise = new Promise(r => resolve = r);
        
        fetch(`http://settle.down.com:3000/api/lists/${type}?page=${pageNo}&size=${size}`)
        .then(res => {
          try {
            // TODO: 为什么这里res永远都是string?
            res = JSON.parse(res);
          } catch (e) {
            console.log('fetchArticleLists parse res failed:', e);
          }
          console.log('res:', res)
          console.log(typeof res);

          commit('setArticleList', res);
          resolve(res)
        }, err => {
          console.log('fetchArticleLists error:', err);
        });
        // return fetchRes
        return promise;
      }
    },
    mutations: {
      setArticleList (state, articleLists) {
        console.log('articleLists:', articleLists);
        Vue.set(state, 'articleLists', articleLists);
      }
    }
  });
}