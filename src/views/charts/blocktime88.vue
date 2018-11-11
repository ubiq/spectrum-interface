<template>
  <BarChart :chart-data="chartData" :options="chartOptions" :height="600" :width="1200"/>
</template>
<script>
import BarChart from '../../components/charts/Bar'
// import common from '../../scripts/common'

export default {
  name: 'Blocktime88',
  components: {
    BarChart
  },
  data () {
    return {
      chartOptions: {
        elements: {
          line: {
            tension: 1
          }
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [
            {
              id: 'blocktime',
              position: 'left',
              fontColor: 'rgba(255,255,255,0.5)',
              ticks: {
                min: -60,
                max: 60,
                callback: function (val) {
                  return Number(val + 88)
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Average blocktime of 88-block intervals / 140 tick moving average'
              },
              gridlines: {
                display: false
              }
            },
            {
              display: false,
              id: 'ma',
              position: 'left',
              fontColor: 'rgba(255,255,255,0.5)',
              ticks: {
                min: -60,
                max: 60
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
              if (data.datasets[tooltipItem.datasetIndex].label === 'Blocktime') {
                return data.datasets[tooltipItem.datasetIndex].label + ': ' + (Number(tooltipItem.yLabel) + 88)
              } else {
                return data.datasets[tooltipItem.datasetIndex].label + ': ' + (Number(tooltipItem.yLabel) + 88)
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
        labels: this.$store.state.blocktime88.labels,
        datasets: [
          {
            yAxisID: 'ma',
            type: 'line',
            label: 'Moving Average',
            lineTension: 1,
            borderWidth: 1,
            borderColor: '#00e4eb',
            pointRadius: '0px',
            data: this.movingAverage(this.$store.state.blocktime88.values)
          },
          {
            yAxisID: 'blocktime',
            type: 'bar',
            label: 'Blocktime',
            cubicInterpolationMode: 'monotone',
            borderWidth: 1,
            borderColor: '#00ebab',
            pointRadius: '0px',
            data: this.btfunc(this.$store.state.blocktime88.values)
          }
        ]
      }
    }
  },
  methods: {
    movingAverage (data) {
      var result = []
      for (var i = 0; i < data.length; i++) {
        if (i < 39) {
          result[i] = 0
        } else {
          let tmp = 0
          for (var e = 40; e !== 0; e--) {
            tmp += Number(data[i - e] - 88)
          }
          result[i] = Math.round((tmp / 40) * 100) / 100
        }
      }
      return result
    },
    btfunc (data) {
      var result = []
      for (var i = 0; i < data.length; i++) {
        switch (true) {
          case Number(data[i]) === 88:
            result[i] = 0
            break
          case data[i] > 88:
            result[i] = Number(data[i]) - 88
            break
          case data[i] < 88:
            result[i] = Number(data[i]) - 88
            break
        }
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
