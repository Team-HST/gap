<template>
    <apexchart width="550" height="500" type="scatter" :options="options" :series="getSeries"></apexchart>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts
  },
  name: 'ScatterChart',
  props: {
    data: Array
  },
  data: function () {
    return {
      options: {  
        title: {
          text: 'Scatter Chart'
        },
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
          },
        },
        markers: {
          size: 4
        },
        xaxis: {
          tickAmount: 4,
          max: 1,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(2);
            }
          }
        },
        yaxis: {
          tickAmount: 4,
          max: 1,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(2);
            }
          }
        },
        chart: {
          type: 'scatter',
          zoom: {
            enabled: false
          },
          animations: {
            enabled: false,
          },
          toolbar: {
            export: {
              csv: {
                filename: `scatter_${this.$moment().format('YYYY-MM-DD hh:mm:ss')}`
              }
            }
          }
        }
      }
    }
  },
  computed: {
    getSeries() {
      return [{
        name: 'scatter',
        data: this.data
      }];
    }
  }
}
</script>