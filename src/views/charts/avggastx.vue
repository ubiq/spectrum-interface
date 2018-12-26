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
  data () {
    return {
      chartOptions: {
        chart: {
          foreColor: '#00ea90',
          fontFamily: '"Courier New", Helvetica, Arial, sans-serif',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#eba900', '#00ebdd', '#00ea90'],
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
      // chartOptions: {
      //   scales: {
      //     xAxes: [{
      //       display: false
      //     }],
      //     yAxes: [
      //       {
      //         id: 'avggas',
      //         position: 'left',
      //         fontColor: 'rgba(255,255,255,0.5)',
      //         ticks: {
      //           suggestedMax: 385,
      //           // beginAtZero: true
      //           callback: function (val) {
      //             return common.fromWeiToGwei(val)
      //           }
      //         },
      //         scaleLabel: {
      //           display: true,
      //           labelString: 'Average daily gas price'
      //         }
      //       },
      //       {
      //         id: 'txns',
      //         position: 'top',
      //         fontColor: 'rgba(255,255,255,0.5)',
      //         ticks: {
      //           beginAtZero: true,
      //           max: 50000
      //         },
      //         scaleLabel: {
      //           display: true,
      //           labelString: 'Transactions'
      //         }
      //       },
      //       {
      //         id: 'gaslimit',
      //         position: 'right',
      //         fontColor: 'rgba(255,255,255,0.5)',
      //         ticks: {
      //           beginAtZero: true,
      //           max: 10000000
      //         },
      //         scaleLabel: {
      //           display: true,
      //           labelString: 'Gaslimit'
      //         }
      //       }
      //     ]
      //   },
      //   legend: {
      //     display: true
      //   },
      //   tooltips: {
      //     mode: 'x',
      //     multiKeyBackground: '#00000000',
      //     callbacks: {
      //       label: function (tooltipItem, data) {
      //         if (data.datasets[tooltipItem.datasetIndex].label === 'Avg. gasprice') {
      //           return data.datasets[tooltipItem.datasetIndex].label + ': ' + (Math.round(common.fromWeiToGwei(tooltipItem.yLabel) * 100) / 100).toFixed(2) + ' gwei'
      //         } else {
      //           return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel
      //         }
      //       }
      //     }
      //   },
      //   responsive: true,
      //   maintainAspectRatio: false
      // }
    }
  },
  computed: {
    chartData () {
      let dates = this.$store.state.txnsCounts.labels
      let arr = [
        {
          name: 'avggas',
          type: 'line',
          data: this.$store.state.avgGasPrice.values.map((val, idx) => { return {x: dates[idx], y: Number(val)} })
        },
        {
          name: 'gaslimit',
          type: 'line',
          data: this.$store.state.gasLimit.values.map((val, idx) => { return {x: dates[idx], y: Number(val)} })
        },
        {
          name: 'txns',
          type: 'column',
          data: this.$store.state.txnsCounts.values.map((val, idx) => { return {x: dates[idx], y: Number(val)} })
        }
      ]
      return arr
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
