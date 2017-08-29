'use strict';

import Vuex from 'vuex';
import Vue from 'vue';
import fetch from 'api';
import { host, port } from '../../constants';

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

export default {
    state: {
      articleLists: null,
    },
    actions: {
      fetchArticleLists: async ({ commit }, type, pageNo = 1, size = 10) => {
        if (!type) return Promise.reject('fetchArticleLists: you need a type');
        
        try {
          const res = await fetch(`http://${host}:${port}/api/lists/${type}?page=${pageNo}&size=${size}`);
          console.log('res:', res);
          const articleLists = await parseRes(res);

          commit('setArticleList', articleLists);

          return articleLists;
        } catch (e) {
          console.error('fetchArticleLists failed:', e);
        }
      }
    },
    mutations: {
      setArticleList (state, articleLists) {
        Vue.set(state, 'articleLists', articleLists);
      }
    }
}