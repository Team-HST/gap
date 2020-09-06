<template>
    <apexchart type="heatmap" width="550" height="500" :options="heatMapOptions" :series="getSeries"></apexchart>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
    components: {
        apexchart: VueApexCharts
    },
    name: 'HeatMapChart',
    props: {
        data: Array
    },
    data: function () {
        return {
            heatMapOptions: {
                chart: {
                    height: 500,
                    type: 'heatmap',
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
                },
                dataLabels: {
                    textAnchor: 'middle',
                    formatter: function(val) {
                        return val + "%";
                    }
                },
                colors: ["#008FFB"],
                title: {
                    text: 'HeatMap Chart'
                },
                yaxis: {
                    labels: {
                        align: 'left'
                    }
                }
            }
        }
    },
    computed: {
        getSeries() {
            console.log(this.data);
            return [
                {
                    name: this.data[0].name,
                    data: this.data[0].data
                },
                {
                    name: this.data[1].name,
                    data: this.data[1].data
                },
                {
                    name: this.data[2].name,
                    data: this.data[2].data
                },
                {
                    name: this.data[3].name,
                    data: this.data[3].data
                }
            ];
        }
    }
}
</script>