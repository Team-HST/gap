<template>
  <div
    class="analysisArea text-center"
  >
    <div ref="heatMap">
      <v-row>
        <v-col cols="6" align="right">
          <ScatterChart 
              :data="scatter.data"
          />
        </v-col>
        <v-col cols="6" align="left">
          <HeatMapChart
              :data="heatMapData.data"
          />
        </v-col>
      </v-row>
      <!-- <HeatMap
        :data="(this.getData) ? this.getData: []"
        :options="options"
      /> -->
    </div>
    <v-row class="mt-5">
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <VueSlider v-model="value" :process="processOptions" :min="min" :max="max" @drag-end="onChangeSlider" :tooltip="'always'" />
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-btn
          class="text-none ml-10"
          color="white"
          rounded
          large
          to="/" 
        >
        <v-icon left>mdi-backspace</v-icon>
          뒤로가기
        </v-btn>
        <!-- <v-btn
          class="ml-5 white--text"
          color="grey darken-1"
          depressed
          large
          @click="onImgDownButtonClick"
        >
        <v-icon left>mdi-download</v-icon>
        분석결과 이미지 다운로드
        </v-btn> -->
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ScatterChart from '../components/ScatterChart';
import HeatMapChart from '../components/HeatMapChart';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
import { mapMutations } from 'vuex';

export default {
  components: {
    VueSlider,
    ScatterChart,
    HeatMapChart
  },
  data: () => ({
    processOptions: dotsPos => [
      [dotsPos[0], dotsPos[1], { backgroundColor: '#00FF70' }],
    ],
    value: [],
    min: 0,
    max: 0,
    totLength: 0,
    scatter: {
      data: []
    },
    heatMapData: {
      data: []
    }
  }),
  computed: {
    ...mapGetters(['getData', 'getTsRangeData', 'get16DivideData'])
  },
  created() {
    this.totLength = this.getData.length;
    this.value = [0, this.getData[this.getData.length-1].ts]
    this.max = this.getData[this.getData.length-1].ts;
    this.setScatterData();
    this.setMapData();
  },
  methods: {
    ...mapMutations(['setHeatMapData']),
    async onImgDownButtonClick() {
      const el = this.$refs['heatMap'];
      const options = {
        type: 'dataURL'
      }
      // VueHtml2Canvas를 이용한 base64생성
      const output = await this.$html2canvas(el, options);
      const byteString = atob(output.split(',')[1]);

      // Bolb 타입 데이터를 만들이기위한 데이터생성
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      // 파일저장이름
      // let filename = `${this.getAnalysisData[0].fileName.replace(/:/g, '')} 외 ${this.getAnalysisData.length-1}_(${this.getAnalysisData[0].indicatorName}_`+
      //                `${this.getAnalysisData[0].crossRoadNumber}).png`;


      let filename = `heatMap_${this.$moment().format('YYYY-MM-DD hh:mm:ss')}.png`;

      // Blob 생성
      let bolb = new Blob([ab], { type: 'image/png' });
              
      // ie
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(bolb, filename);
      } else { // chrome
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(bolb);
        link.download = filename;
        link.click();
      }
    },

  /**
   * @todo 변경 판단 후 차트 렌더링
   */
    onChangeSlider() {
      this.setScatterData();
      this.setMapData();
    },
    setScatterData() {
      this.scatter.data = this.getTsRangeData(this.value[0], this.value[1], data => ([data.x, data.y]));
    },
    setMapData() {
      this.heatMapData.data = []; // 초기화
      let totalLength = this.get16DivideData(this.value[0], this.value[1], data => ([data.x, data.y])).total;
      for (let i=1; i<=4; i++) {
        let yaxis = i;
        const arrayTemplate = [];

        for (let j=1; j<=4; j++) {
          let xaxis = j;
          const row = this.get16DivideData(this.value[0], this.value[1], data => ([data.x, data.y])).data[i-1][j-1];
          const dataTemplate = {
            x: xaxis + '',
            y: row > 0 ? Math.round(row/totalLength * 100) : 0
          };
          arrayTemplate.push(dataTemplate);
        }
        this.heatMapData.data.push({name: yaxis, data: arrayTemplate});
      }
    }
  }
}
</script>

<style>
div.analysisArea {
  margin-top: 7.5%;
}
</style>