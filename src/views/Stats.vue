<template>
  <div class="">
   <tabgrid :descriptions="desc">
     <template slot="card-header">
       <datePicker :shortcuts="[{text: 'test', onClick:this.click}]"  v-model="date" :not-before="new Date('Jan 28, 2017 8:00 PM UTC')" range lang="en" format="DD/MM/YYYY" confirm ></datePicker>
     </template>
     <template slot="difficulty">
       <difficulty :dates="this.dates"/>
     </template>
     <template slot="avggastx">
       <avggastx :dates="this.dates"/>
     </template>
     <template slot="blocktime">
       <blocktime/>
     </template>
     <template slot="blocktime88">
       <blocktime88 :dates="this.dates"/>
     </template>
     <template slot="pools">
       <pools :dates="this.dates"/>
     </template>
   </tabgrid>
  </div>

</template>
<script>
import datePicker from 'vue2-datepicker'
import avggastx from './charts/avggastx'
import difficulty from './charts/difficulty'
import blocktime from './charts/blocktime'
import blocktime88 from './charts/blocktime88'
import pools from './charts/pools'

import tabgrid from '../components/misc/tabgrid'

export default {
  name: 'Stats',
  components: {
    datePicker,
    avggastx,
    difficulty,
    blocktime,
    blocktime88,
    pools,
    tabgrid
  },
  // created () {
  //   let self = this
  //   var id = setInterval(function () {
  //     console.log(self.date)
  //     clearInterval(id)
  //   }, 1000)
  // },
  data () {
    return {
      date: [],
      dates: [],
      desc: {
        'difficulty': 'Difficulty/Hashrate',
        'avggastx': 'Avg.gas/Gaslimit/Txns',
        'blocktime': 'Avg.blocktime',
        'blocktime88': 'Avg.88-block period blocktime',
        'pools': 'Blocks mined by pools'
      },
      isActive: ''
    }
  },
  watch: {
    date: {
      handler: function (val) {
        let self = this
        self.dates = val.map((date) => {
          return self.$moment(date).format('D/MM/YY')
        })
      },
      immediate: true
    }
  },
  methods: {
    // confirm (e) {
    //   let a = this.$moment(e[0])
    //   let b = this.$moment(e[1])
    //   this.days = b.diff(a, 'days')
    // },
    click (a, b) {
      console.log(a, b)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
