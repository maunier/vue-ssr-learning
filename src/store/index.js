'use strict';

import Vuex from 'vuex';
import Vue from 'vue';
import fetch from 'api';

Vue.use(Vuex);

async function parseRes(res) {
  if (typeof res === 'string') {
    res = JSON.parse(res);
  } else if (res.json) {
    res = await res.json();
  } else {
    throw new Error('fetchArticleLists failed!');
  }

  return res;
}

export default function createStore () {
  return new Vuex.Store({
    state: {
      articleLists: null,
    },
    actions: {
      fetchArticleLists: async ({ commit }, type, pageNo = 1, size = 10) => {
        if (!type) return Promise.reject('fetchArticleLists: you need a type');
        
        const res = await fetch(`http://settle.down.com:3000/api/lists/${type}?page=${pageNo}&size=${size}`);
        const articleLists = await parseRes(res);

        commit('setArticleList', articleLists);
        
        return articleLists;
      }
    },
    mutations: {
      setArticleList (state, articleLists) {
        Vue.set(state, 'articleLists', articleLists);
      }
    }
  });
}