<template>
  <div
    class="analysisArea text-center"
  >
    <div ref="heatMap">
      <HeatMap
        :data="(this.getData) ? this.getData: []"
        :options="options"
      />
    </div>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <VueSlider v-model="value" :process="processOptions" @drag-end="onChangeSlider" />
      </v-col>
    </v-row>
    <ScatterChart />
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
        <v-btn
          class="ml-5 white--text"
          color="grey darken-1"
          depressed
          large
          @click="onImgDownButtonClick"
        >
        <v-icon left>mdi-download</v-icon>
        분석결과 이미지 다운로드
        </v-btn>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeatMap from '../components/HeatMap';
import ScatterChart from '../components/ScatterChart';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

export default {
  components: {
    HeatMap,
    VueSlider,
    ScatterChart
  },
  props: {
    data: Array,
  },
  data: () => ({
    options: {
      backgroundColor: "#FBFBEF"
    },
    processOptions: dotsPos => [
      [dotsPos[0], dotsPos[1], { backgroundColor: '#00FF70' }],
    ],
    value: [0, 100]
  }),
  computed: {
    ...mapGetters(['getData', 'getTsRangeData', 'get16DivideData'])
  },
  created() {
    console.log(this.getTsRangeData(0, 0, data => ([data.x, data.y])));
    console.log(this.get16DivideData(0, 0));
    console.log(this.getTsRangeData(1, 1, data => ([data.x, data.y])));
    console.log(this.get16DivideData(1, 1));
  },
  methods: {
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
      console.log(this.value);
    }
  }
}
</script>

<style>
div.analysisArea {
  margin-top: 7.5%;
}
</style>