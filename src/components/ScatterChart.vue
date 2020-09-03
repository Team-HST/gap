<template>
    <apexchart width="500" type="scatter" :options="options" :series="series" :zoom="zoom"></apexchart>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts
  },
  name: 'ScatterChart',
  props: {
    // options: Object || null,
    // data: Array
  },
  data: function () {
    return {
      options: {  
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },   
        xaxis: {
          max: 1,
          tickAmount: 8,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(2)
            }
          }
        },
        yaxis: {
          max: 1,
          tickAmount: 8,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(2)
            }
          }
        }},
      series: [{
        name: 'aaa',
        data: [[0.123, 0.7], [0.7112, 0.33], [0.1, 0.5], [0.522222, 0.51111]]
      }],
      zoom: {
        type: "xy"
      }
    }
  }
}
</script>