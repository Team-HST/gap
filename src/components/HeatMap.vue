<template>
  <div>
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
        id="test1"
        :class="`d-flex justify-space-between mb-6`"
        color="grey lighten-2"
        flat
        tile
      >
        <span class="min pl-1">min</span>
        <span class="max pr-1">max</span>
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
  .heatmapjs-container {
    width: 800px;
    height: 600px;
  }

  #test1 {
    width: 100%;
    height: 20px;
    background-image:linear-gradient(50deg,#A9A9F5, lightgreen,yellow, red);
    white-space: pre;
  }

  span.min, span.max{
    font-weight: 700;
  }
</style>