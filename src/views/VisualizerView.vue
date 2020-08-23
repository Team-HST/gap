<template>
  <div
    class="analysisArea text-center"
  >
    <HeatMap 
      :data="(this.getData) ? this.getData: []"
      :options="options"
    />
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-btn
          color="white"
          class="text-none ml-10"
          to="/" large
        >
        <v-icon left>mdi-backspace</v-icon>
        뒤로가기
        </v-btn>
        <v-btn
          color="primary"
          class="text-none ml-5"
          @click="onImgDownButtonClick"
          style="color: white;" large
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

export default {
  components: {
    HeatMap
  },
  props: {
    data: Array,
  },
  data: () => ({
    options: {
      backgroundColor: "#FBFBEF"
    }
  }),
  computed: {
    ...mapGetters(['getData'])
  },
  methods: {
    onImgDownButtonClick: () => {
      alert('이미지 다운로드');
    }
  }
}
</script>

<style>
div.analysisArea {
  margin-top: 7.5%;
}
</style>