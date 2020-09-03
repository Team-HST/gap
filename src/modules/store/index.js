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
    },
    getDataWithTimeRange: (state) => (min, max, mapper) => {
      const result = [];
      for (let row of state.data) {
        if (row.ts >= min && row.ts <= max) {
          result.push(mapper ? mapper(row) : row);
        }
      } 
      return result;
    }
  },
  mutations: {
    setData: (state, data) => {
      state.data = data;
    }
  }
})