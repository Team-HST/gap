import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    data: [], // 분석결과 데이터,
    heatMapData: []
  },
  getters: {
    getData: (state) => {
      return state.data;
    },
    getHeatMapData: (state) => {
      return state.heatMapData;
    },
    getTsRangeData: (state) => (min, max, mapper) => {
      const result = [];
      for (let row of state.data) {
        if (row.ts >= min && row.ts <= max) {
          result.push(mapper ? mapper(row) : row);
        }
      } 
      return result;
    },
    get16DivideData: (state, getters) => (min, max) => {
      const result = [
        [0, 0, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ];
      for (let row of getters.getTsRangeData(min, max)) {
        let xIdx = Math.max(0, Math.ceil(row.x / 0.25) - 1); 
        let yIdx = Math.max(0, Math.ceil(row.y / 0.25) - 1);
        // result[xIdx][yIdx] = result[xIdx][yIdx] + 1;
        result[yIdx][xIdx] = result[yIdx][xIdx] + 1;
      }
      return result;
    }
  },
  mutations: {
    setData: (state, data) => {
      state.data = data;
    },
    setHeatMapData: (state, heatMapData) => {
      state.heatMapData = heatMapData;
    }
  }
})