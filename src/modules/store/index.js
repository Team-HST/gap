import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    data: [] // 분석결과 데이터
  },
  getters: {
    getData: (state) => {
      return state.data;
    }
  },
  mutations: {
    setData: (state, data) => {
      state.data = data;
    }
  }
})