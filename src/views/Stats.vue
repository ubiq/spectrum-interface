<template>
<b-card no-body>
  <b-tabs pills card vertical>
    <b-tab title="Tab 1" active>
      <template slot="title">
          <span @click="tab('difficulty')">Difficulty</span>
      </template>
      <div class="chart-container">
        <difficulty v-if="this.tabs.difficulty === true"/>
      </div>
    </b-tab>
    <b-tab title="Tab 2">
      <template slot="title">
          <span @click="tab('avggas')">Avg. gas</span>
      </template>
      <div class="chart-container">
        <avggastx v-if="this.tabs.avggas === true"/>
      </div>
    </b-tab>
    <b-tab title="Tab 3">
      <template slot="title">
          <span @click="tab('blocktime')">Blocktime</span>
      </template>
      <div class="chart-container">
        <blocktime v-if="this.tabs.blocktime === true"/>
      </div>
    </b-tab>
    <b-tab title="Tab 4">
      <template slot="title">
          <span @click="tab('blocktime88')">BT - 88</span>
      </template>
      <div class="chart-container">
        <blocktime88 v-if="this.tabs.blocktime88 === true"/>
      </div>
    </b-tab>
  </b-tabs>
</b-card>
</template>
<script>
import avggastx from './charts/avggastx'
import difficulty from './charts/difficulty'
import blocktime from './charts/blocktime'
import blocktime88 from './charts/blocktime88'

export default {
  name: 'Stats',
  components: {
    avggastx,
    difficulty,
    blocktime,
    blocktime88
  },
  data () {
    return {
      tabs: {
        'difficulty': false,
        'avggas': false,
        'blocktime': false,
        'blocktime88': false
      },
      refresh: false
    }
  },
  created () {
    this.tabs.difficulty = true
    // let self = this;
    // (function loop () {
    //   self.fetch()
    //   setTimeout(loop, 5000)
    // })()
    // console.log(this.chartOptions, this.chartData)
  },
  methods: {
    /*
    Chartjs + the b-tab component acts up. If the element containing the chart is hidden the chart is rendered with height 0.
    We pass a prop to each chart view that triggers a v-if every time we select a tab, and we listen to an event from the chart views
    to reset the refresh var.
    */
    update () {
      console.log('stats: refresh!', this.refresh)
      this.refresh = true
    },
    tab (i) {
      console.log(i)
      this.tabs[i] = true
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-container {
  width: 1600px;
}
</style>
