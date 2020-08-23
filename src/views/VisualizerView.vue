<template>
  <div
    class="mt-16 text-center"
  >
    <HeatMap 
      :data="(data) ? data : []"
      :options="options"
    />
    <v-btn
      color="primary"
      class="text-none"
      @click="onImgDownButtonClick"
    >
      <v-icon left>mdi-download</v-icon>
      분석결과 이미지 다운로드
    </v-btn>
  </div>
</template>

<script>
import HeatMap from '../components/HeatMap';
// import HelloWorld from '../components/HelloWorld';

export default {
  components: {
    HeatMap
    // HelloWorld
  },
  props: {
    data: Array,
  },
  data: () => ({
    options: {
      backgroundColor: "#FBFBEF"
    }
  }),
  methods: {
    onImgDownButtonClick: () => {
      alert('이미지 다운로드');
    }
  }
}
</script>

<style>

</style>