<template>
  <LineChart :chart-data="chartData" :options="chartOptions" :height="600" :width="1200"/>
</template>
<script>
import LineChart from '../../components/charts/Line'
import common from '../../scripts/common'

export default {
  name: 'Difficulty',
  components: {
    LineChart
  },
  data () {
    return {
      chartOptions: {
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [
            {
              id: 'difficulty',
              position: 'left',
              fontColor: 'rgba(255,255,255,0.5)',
              ticks: {
                min: 10000000000000,
                callback: function (val) {
                  return common.toTH(val, 2) + ' TH'
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Average daily difficulty'
              },
              gridlines: {
                display: false
              }
            },
            {
              id: 'hashrate',
              position: 'right',
              fontColor: 'rgba(255,255,255,0.5)',
              ticks: {
                min: 100000000000,
                callback: function (val) {
                  return common.toGH(val, 2) + ' GH'
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Estimated daily hashrate'
              },
              gridlines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        tooltips: {
          mode: 'index',
          multiKeyBackground: '#00000000',
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              if (data.datasets[tooltipItem.datasetIndex].label === 'Difficulty') {
                return data.datasets[tooltipItem.datasetIndex].label + ': ' + common.toTH(tooltipItem.yLabel, 2) + 'TH'
              } else {
                return data.datasets[tooltipItem.datasetIndex].label + ': ' + common.toGH(tooltipItem.yLabel, 2) + 'GH'
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    chartData () {
      return {
        labels: this.$store.state.difficulty.labels,
        datasets: [
          {
            yAxisID: 'difficulty',
            type: 'line',
            label: 'Difficulty',
            cubicInterpolationMode: 'monotone',
            borderWidth: 1,
            borderColor: '#00ea90',
            pointRadius: '0px',
            data: this.$store.state.difficulty.values
          },
          {
            yAxisID: 'hashrate',
            type: 'line',
            backgroundColor: '#ffffff30',
            fill: '-1',
            label: 'Hashrate',
            cubicInterpolationMode: 'monotone',
            borderWidth: 1,
            borderColor: '#00c7eb',
            pointRadius: '0px',
            data: this.$store.state.hashrate.values
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
