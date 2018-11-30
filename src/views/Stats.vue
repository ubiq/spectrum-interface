<template>
  <tabgrid :descriptions="desc">
    <template slot="difficulty">
      <difficulty/>
    </template>
    <template slot="avggastx">
      <avggastx/>
    </template>
    <template slot="blocktime">
      <blocktime/>
    </template>
    <template slot="blocktime88">
      <blocktime88/>
    </template>
  </tabgrid>
</template>
<script>
import avggastx from './charts/avggastx'
import difficulty from './charts/difficulty'
import blocktime from './charts/blocktime'
import blocktime88 from './charts/blocktime88'

import tabgrid from '../components/misc/tabgrid'

export default {
  name: 'Stats',
  components: {
    avggastx,
    difficulty,
    blocktime,
    blocktime88,
    tabgrid
  },
  data () {
    return {
      desc: {
        'difficulty': 'Difficulty/Hashrate',
        'avggastx': 'Avg.gas/Gaslimit/Txns',
        'blocktime': 'Avg.blocktime',
        'blocktime88': 'Avg.88-block period blocktime',
      },
      isActive: '',
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
