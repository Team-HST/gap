<template>
    <apexchart type="heatmap" width="550" height="520" :options="heatMapOptions" :series="getSeries"></apexchart>
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
                                filename: `heatMap_${this.$moment().format('YYYY-MM-DD hh:mm:ss')}`
                            }                            
                        }
                    }
                },
                dataLabels: {
                    // textAnchor: 'middle',
                    formatter: function(val) {
                        return val + "%";
                    },
                    style: {
                        fontSize: '20px',
                        fontFamily: 'Kopub 돋움체 medium',
                        colors: ['#000000']
                    }
                },
                colors: ['#1DDB16'],
                title: {
                    text: 'HeatMap Chart'
                },
                xaxis: {
                    labels: {
                        // offsetX: 21,
                        // offsetY: 0
                        style: {
                            fontSize: '20px',
                            fontFamily: 'Kopub 돋움체 medium',
                            fontWeight: 700
                        }
                    },
                },
                yaxis: {
                    tickAmount: 20,
                    labels: {
                        show: true,
                        align: 'right',
                        minHeight: 550,
                        maxHeight: 550,
                        maxWidth: 160,
                        style: {
                            fontSize: '20px',
                            fontFamily: 'Kopub 돋움체 medium',
                            fontWeight: 700
                        }
                    },
                    /*
                    axisBorder: {
                        show: true,
                        color: '#78909C',
                        offsetX: 0,
                        offsetY: 0
                    },
                    axisTicks: {
                        show: true,
                        borderType: 'solid',
                        color: '#78909C',
                        width: 500,
                        offsetX: 500,
                        offsetY: 0
                    },
                    */
                }
            }
        }
    },
    computed: {
        getSeries() {
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