<template>
  <apexchart type=line height="100%" width="100%" :options="chartOptions" :series="chartData" />
</template>
<script>
import LineChart from '../../components/charts/Line'
import common from '../../scripts/common'

export default {
  name: 'Difficulty',
  components: {
    LineChart
  },
  props: {
    dates: {
      type: Array
    }
  },
  watch: {
    dates: {
      handler: function (val, old) {
        let self = this
        let dates = this.$store.state.difficulty.labels.map(val => self.$moment(val, 'D/MM/YY'))

        let left = dates.findIndex(function (el) {
          return el.isSame(self.$moment(val[0], 'D/MM/YY'), 'day')
        })
        let right = dates.length - dates.reverse().findIndex(function (el) {
          return el.isSame(self.$moment(val[1], 'D/MM/YY'), 'day')
        })

        if (left === -1) {
          left = 0
        }
        if (right === -1) {
          right = dates.length
        }

        this.indexToSlice.left = left
        this.indexToSlice.right = right
      },
      immediate: true
    }
  },
  data () {
    return {
      indexToSlice: {
        left: null,
        right: null
      },
      chartOptions: {
        chart: {
          foreColor: '#ffffff80',
          fontFamily: '"Courier New", Helvetica, Arial, sans-serif',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#00ebeb', '#00ea90'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          lineCap: 'round',
          width: 1,
          colors: ['#00ebeb', '#00ea90']
        },
        markers: {
          size: 0
        },
        tooltip: {
          enabled: true,
          y: {
            show: false
          },
          fixed: {
            enabled: true,
            position: 'bottomLeft',
            offsetY: -25,
            offsetX: 10
          },
          fillSeriesColors: true,
          theme: 'dark'
        },
        title: {
          text: ''
        },
        grid: {
          show: true,
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        yaxis: [
          {
            name: 'difficulty',
            show: false,
            min: 10000000000000, // 10 TH
            labels: {
              show: true,
              offsetX: 35,
              formatter: val => common.toTH(val, 2) + ' TH'
            },
            axisBorder: {
              show: true,
              height: 0.75
            },
            tooltip: {
              enabled: false
            },
            crosshairs: {
              show: true
            },
            axisTicks: {
              show: true
            }
          },
          {
            name: 'hashrate',
            show: false,
            min: 100000000000, // 100 GH
            opposite: true,
            labels: {
              show: true,
              formatter: val => common.toGH(val, 2) + ' GH'
            },
            axisBorder: {
              show: true,
              height: 0.75
            },
            tooltip: {
              enabled: false
            },
            crosshairs: {
              show: true
            },
            axisTicks: {
              show: false
            }
          }
        ],
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: true,
            color: '#ffffff80',
            height: 0.75
          },
          tooltip: {
            enabled: false
          },
          crosshairs: {
            show: false
          },

          axisTicks: {
            show: false
          }
        }
      }
    }
  },
  computed: {
    chartData () {
      let dates = this.$store.state.difficulty.labels.slice(this.indexToSlice.left, this.indexToSlice.right)
      let arr = [
        {
          name: 'difficulty',
          type: 'line',
          data: this.$store.state.difficulty.values.slice(this.indexToSlice.left, this.indexToSlice.right).map((val, idx) => { return {x: dates[idx], y: Number(val)} })
        },
        {
          name: 'hashrate',
          type: 'line',
          data: this.$store.state.hashrate.values.slice(this.indexToSlice.left, this.indexToSlice.right).map((val, idx) => { return {x: dates[idx], y: Number(val)} })
        }
      ]
      return arr
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
