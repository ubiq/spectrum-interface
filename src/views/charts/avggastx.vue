<template>
  <BarChart :chart-data="chartData" :options="chartOptions" :height="600" :width="1200"/>
</template>
<script>
import BarChart from '../../components/charts/Bar'
import common from '../../scripts/common'

export default {
  name: 'Avggasprice',
  components: {
    BarChart
  },
  data () {
    return {
      chartOptions: {
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [
            {
              id: 'avggas',
              position: 'left',
              fontColor: 'rgba(255,255,255,0.5)',
              ticks: {
                suggestedMax: 385,
                // beginAtZero: true
                callback: function (val) {
                  return common.fromWeiToGwei(val)
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Average daily gas price'
              }
            },
            {
              id: 'txns',
              position: 'top',
              fontColor: 'rgba(255,255,255,0.5)',
              ticks: {
                beginAtZero: true,
                max: 50000
              },
              scaleLabel: {
                display: true,
                labelString: 'Transactions'
              }
            },
            {
              id: 'gaslimit',
              position: 'right',
              fontColor: 'rgba(255,255,255,0.5)',
              ticks: {
                beginAtZero: true,
                max: 10000000
              },
              scaleLabel: {
                display: true,
                labelString: 'Gaslimit'
              }
            }
          ]
        },
        legend: {
          display: true
        },
        tooltips: {
          mode: 'x',
          multiKeyBackground: '#00000000',
          callbacks: {
            label: function (tooltipItem, data) {
              if (data.datasets[tooltipItem.datasetIndex].label === 'Avg. gasprice') {
                return data.datasets[tooltipItem.datasetIndex].label + ': ' + (Math.round(common.fromWeiToGwei(tooltipItem.yLabel) * 100) / 100).toFixed(2) + ' gwei'
              } else {
                return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel
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
        labels: this.$store.state.avgGasPrice.labels,
        datasets: [
          {
            yAxisID: 'avggas',
            type: 'line',
            label: 'Avg. gasprice',
            borderWidth: 1,
            cubicInterpolationMode: 'monotone',
            borderColor: '#eb9b00',
            pointRadius: '0px',
            data: this.$store.state.avgGasPrice.values
          },
          {
            yAxisID: 'txns',
            type: 'bar',
            label: 'Transactions',
            cubicInterpolationMode: 'default',
            borderWidth: 1,
            borderColor: '#242222',
            data: this.$store.state.txnsCounts.values
          },
          {
            yAxisID: 'gaslimit',
            type: 'line',
            label: 'Gaslimit',
            cubicInterpolationMode: 'monotone',
            borderWidth: 1,
            borderColor: '#00b2eb',
            pointRadius: '0px',
            data: this.$store.state.gasLimit.values
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
