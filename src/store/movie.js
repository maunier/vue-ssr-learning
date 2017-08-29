'use strict';

import Vue from 'vue';
import fetch from 'api';

export default {
  state: {
    hotTagList: null,
  },
  actions: {
    fetchMoviePageData: async ({ commit }) => {
      try {
        const res = await fetch('http://lequ.iqiyi.com/page/view?url=http://tw.iqiyi.com/movie2017&templateId=1010&pageId=1020');
        let moviePageData;

        if (res.json) {
          moviePageData = await res.json();
        } else {
          moviePageData = JSON.parse(res);
        }

        commit('setHotTagList', moviePageData.hotTagList);
        return moviePageData;
      } catch (e) {
        console.error('fetchMoviePageData failed:', e);
      }
    }
  },
  mutations: {
    setHotTagList (state, hotTagList) {
      Vue.set(state, 'hotTagList', hotTagList);
    }
  }
}