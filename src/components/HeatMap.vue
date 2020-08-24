<template>
  <div class="heat-map">
    <v-card
      class="mt-n12 mx-auto"
      elevation="12"
      width="800"
    >
      <heatmapjsVue
        id="heatmapContainer"
        class="heatmapjs-container"
        :min=0
        :max="data.length"
        :options="options"
        :data="data"
      />
    
      <v-card
        id="desc"
        :class="`d-flex justify-space-between mb-6`"
        color="grey lighten-2"
        flat
        tile
      >
        <span>min</span>
        <span>max</span>
      </v-card>
    </v-card>
  </div>


</template>

<script>
export default {
  name: 'HeatMap',
  props: {
    options: Object || null,
    data: Array
  },
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>
  .heat-map {
    margin-top: 150px;
  }

  .heatmapjs-container {
    width: 800px;
    height: 600px;
  }

  #desc {
    width: 100%;
    height: 20px;
    background-image:linear-gradient(50deg,#A9A9F5, lightgreen,yellow, red);
    white-space: pre;
  }
</style>