<template>
  <apexchart type=line height="100%" width="100%" :options="chartOptions" :series="chartData" />
  <!-- <BarChart :chart-data="chartData" :options="chartOptions" :height="600" :width="1200"/> -->
</template>
<script>
import common from '../../scripts/common'
import BarChart from '../../components/charts/Bar'

export default {
  name: 'Avggasprice',
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
        let dates = this.$store.state.avgGasPrice.labels.map(val => self.$moment(val, 'D/MM/YY'))

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
          // animations: {
          //   enabled: true,
          //   easing: 'easinout',
          //   speed: 350,
          //   animateGradually: {
          //     enabled: true,
          //     delay: 150
          //   },
          //   dynamicAnimation: {
          //     enabled: true,
          //     speed: 350
          //   }
          // },
          foreColor: '#ffffff80',
          fontFamily: '"Courier New", Helvetica, Arial, sans-serif',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#eba900', '#00ebdd', '#636363'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          lineCap: 'round',
          width: 1,
          colors: ['#eba900', '#00ebdd', '#404040']
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
            name: 'avggas',
            labels: {
              show: true,
              offsetX: 35,
              formatter: val => common.fromWeiToGwei(val) + ' gwei'
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
            name: 'gaslimit',
            opposite: true,
            labels: {
              show: true,
              formatter: val => (val / 1000000).toFixed(3) + ' M'
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
          },
          {
            name: 'txns',
            show: false,
            min: 0,
            max: 50000,
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
      let dates = this.$store.state.txnsCounts.labels.slice(this.indexToSlice.left, this.indexToSlice.right)
      let arr = [
        {
          name: 'avggas',
          type: 'line',
          data: this.$store.state.avgGasPrice.values.slice(this.indexToSlice.left, this.indexToSlice.right).map((val, idx) => { return {x: dates[idx], y: Number(val)} })
        },
        {
          name: 'gaslimit',
          type: 'line',
          data: this.$store.state.gasLimit.values.slice(this.indexToSlice.left, this.indexToSlice.right).map((val, idx) => { return {x: dates[idx], y: Number(val)} })
        },
        {
          name: 'txns',
          type: 'column',
          data: this.$store.state.txnsCounts.values.slice(this.indexToSlice.left, this.indexToSlice.right).map((val, idx) => { return {x: dates[idx], y: Number(val)} })
        }
      ]
      return arr
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
