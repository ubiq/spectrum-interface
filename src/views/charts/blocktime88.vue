<template>
  <apexchart type=line height="100%" width="100%" :options="chartOptions" :series="chartData" />
  <!-- <BarChart :chart-data="chartData" :options="chartOptions" :height="600" :width="1200"/> -->
</template>
<script>
import BarChart from '../../components/charts/Bar'

export default {
  name: 'Blocktime88',
  components: {
    BarChart
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
        let dates = this.$store.state.blocktime88.labels.map(val => self.$moment(val, 'D/MM/YY'))

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
          animations: {
            enabled: false,
            easing: 'linear',
            speed: 1000,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          foreColor: '#ffffff80',
          fontFamily: '"Courier New", Helvetica, Arial, sans-serif',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#e9f239', '#00ea90'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          lineCap: 'butt',
          width: [1.5, 1],
          colors: ['#e9f239', '#00ea90']
        },
        markers: {
          size: 0
        },
        tooltip: {
          enabled: true,
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
            name: 'ma',
            show: false,
            min: -20,
            max: 20,
            labels: {
              show: true,
              offsetX: 35,
              formatter: val => val + 88
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
              show: true
            }
          },
          {
            name: 'blocktime',
            opposite: true,
            min: -70,
            max: +70,
            decimalsInFloat: 0,
            labels: {
              show: true,
              formatter: val => (val + 88)
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
        ],
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: true,
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
      let dates = this.$store.state.blocktime88.labels.slice(this.indexToSlice.left, this.indexToSlice.right)
      let arr = [
        {
          name: 'ma',
          type: 'line',
          data: this.movingAverage(this.$store.state.blocktime88.values).slice(this.indexToSlice.left, this.indexToSlice.right).map((val, idx) => { return {x: dates[idx], y: val} })
        },
        {
          name: 'blocktime',
          type: 'column',
          data: this.btfunc(this.$store.state.blocktime88.values).slice(this.indexToSlice.left, this.indexToSlice.right).map((val, idx) => { return {x: dates[idx], y: val} })
        }
      ]
      return arr
    }
  },
  methods: {
    movingAverage (data) {
      var result = []
      for (var i = 0; i < data.length; i++) {
        if (i < 39) {
          result[i] = null
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
            result[i] = Math.round((Number(data[i]) - 88) * 100) / 100
            break
          case data[i] < 88:
            result[i] = Math.round((Number(data[i]) - 88) * 100) / 100
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
