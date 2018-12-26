<template>
  <BarChart :chart-data="chartData" :options="chartOptions" :plugins="plugins" :height="600" :width="1200"/>
</template>
<script>
import BarChart from '../../components/charts/Bar'
import addresses from '../../scripts/addresses'

export default {
  name: 'Difficulty',
  components: {
    BarChart
  },
  data () {
    return {
      plugins: [{
        id: 'stacked-sort',
        beforeInit: function (chart, options) {
        }
      }]
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
    chartOptions () {
      let Y_AXES = []

      Y_AXES.push({
        position: 'right',
        fontColor: 'rgba(255,255,255,0.5)',
        scaleLabel: {
          display: true
        },
        gridlines: {
          display: false
        }
      })

      for (const id of Object.keys(this.$store.state.pools.values)) {
        Y_AXES.push({
          id: id,
          display: false,
          gridlines: {
            display: false
          }
        })
      }
      return {
        scales: {
          xAxes: [{
            display: true,
            stacked: true
          }],
          yAxes: Y_AXES
        },
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          multiKeyBackground: '#00000000',
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              if (tooltipItem.yLabel !== 0.00) {
                return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel + ' blocks'
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    },
    chartData () {
      let arr = []

      for (const key of Object.keys(this.$store.state.pools.values)) {
        let color = this.hexFromAccount(key)
        arr.push({
          yAxisID: key,
          type: 'bar',
          fill: '-1',
          label: addresses.getAddressTag(key) + ' ' + key,
          cubicInterpolationMode: 'monotone',
          borderWidth: 0.6,
          backgroundColor: color,
          hoverBackgroundColor: color,
          borderSkipped: 'top',
          data: this.$store.state.pools.values[key].values.map((val) => {
            return (val === '' ? '0.00' : val)
          })
        })
      }

      return {
        labels: this.$store.state.pools.labels,
        datasets: arr
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
