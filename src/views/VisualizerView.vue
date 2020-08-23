<template>
  <div
    class="mt-16 text-center"
  >
    <HeatMap 
      :data="(this.getData) ? this.getData: []"
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

</style>