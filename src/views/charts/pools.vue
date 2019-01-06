<template>
  <apexchart type=bar height="100%" width="100%" :options="chartOptions" :series="chartData" />
</template>
<script>
import addresses from '../../scripts/addresses'

export default {
  name: 'Difficulty',
  props: {
    dates: {
      type: Array
    }
  },
  watch: {
    dates: {
      handler: function (val, old) {
        let self = this
        let dates = this.$store.state.pools.labels.map(val => self.$moment(val, 'D/MM/YY'))

        this.indexToSlice.left = dates.findIndex(function (el) {
          return el.isSame(self.$moment(val[0], 'D/MM/YY'), 'day')
        })
        this.indexToSlice.right = dates.length - dates.reverse().findIndex(function (el) {
          return el.isSame(self.$moment(val[1], 'D/MM/YY'), 'day')
        })
      },
      immediate: true
    }
  },
  data () {
    let colors = []

    for (const key of Object.keys(this.$store.state.pools.values)) {
      colors.push(this.hexFromAccount(key))
    }
    return {
      indexToSlice: {
        left: null,
        right: null
      },
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%'
          }
        },
        chart: {
          animations: {
            enabled: false,
            easing: 'easinout',
            speed: 400
          },
          stacked: true,
          foreColor: '#ffffff80',
          fontFamily: '"Courier New", Helvetica, Arial, sans-serif',
          zoom: {
            enabled: true
          },
          toolbar: {
            show: false
          }
        },
        colors: colors,
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0
        },
        tooltip: {
          enabled: true,
          shared: true,
          fillSeriesColors: true,
          theme: 'dark',
          x: {
            show: true
          },
          y: {
            title: {
              formatter: miner => addresses.getAddressTag(miner)
            }
          },
          fixed: {
            enabled: true,
            position: 'topLeft'
          }
        },
        title: {
          text: ''
        },
        legend: {
          enabled: true,
          formatter: seriesName => addresses.getAddressTag(seriesName)
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
            labels: {
              show: true
              // formatter: val => (val / 1000000).toFixed(3) + ' M'
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
  methods: {
    hexFromAccount (acc) {
      return '#' + acc.substring(acc.length - 6, acc.length)
    },
    randhexcolor () {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
  },
  computed: {
    // chartOptions () {
    //   let Y_AXES = []
    //   Y_AXES.push({
    //     position: 'right',
    //     fontColor: 'rgba(255,255,255,0.5)',
    //     scaleLabel: {
    //       display: true
    //     },
    //     gridlines: {
    //       display: false
    //     }
    //   })
    //   for (const id of Object.keys(this.$store.state.pools.values)) {
    //     Y_AXES.push({
    //       id: id,
    //       display: false,
    //       gridlines: {
    //         display: false
    //       }
    //     })
    //   }
    //   return {
    //     scales: {
    //       xAxes: [{
    //         display: true,
    //         stacked: true
    //       }],
    //       yAxes: Y_AXES
    //     },
    //     legend: {
    //       display: false
    //     },
    //     tooltips: {
    //       mode: 'index',
    //       multiKeyBackground: '#00000000',
    //       intersect: false,
    //       callbacks: {
    //         label: function (tooltipItem, data) {
    //           if (tooltipItem.yLabel !== 0.00) {
    //             return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel + ' blocks'
    //           }
    //         }
    //       }
    //     },
    //     responsive: true,
    //     maintainAspectRatio: false
    //   }
    // },
    chartData () {
      let dates = this.$store.state.pools.labels.slice(this.indexToSlice.left, this.indexToSlice.right)
      let arr = []

      for (const key of Object.keys(this.$store.state.pools.values)) {
        arr.push({
          name: key,
          type: 'bar',
          data: this.$store.state.pools.values[key].values.slice(this.indexToSlice.left, this.indexToSlice.right).map((val, idx) => { return {x: dates[idx], y: Number(val)} })
        })
      }
      // console.log(arr)
      return arr
    }
  }
}
</script>
<style lang="scss" scoped>
.apexcharts-tooltip {
  font-size: 10px;
}
</style>
