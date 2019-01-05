<template>
  <div>
   <tabgrid :descriptions="desc">
     <template slot="card-header">
       <datePicker :shortcuts="shortcuts"  v-model="date" :not-before="new Date('Jan 28, 2017 8:00 PM UTC')" range lang="en" format="DD/MM/YYYY" confirm ></datePicker>
     </template>
     <template slot="difficulty">
       <difficulty :dates="this.dates"/>
     </template>
     <template slot="avggastx">
       <avggastx :dates="this.dates"/>
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
import blocktime88 from './charts/blocktime88'
import pools from './charts/pools'

import tabgrid from '../components/misc/tabgrid'

export default {
  name: 'Stats',
  components: {
    datePicker,
    avggastx,
    difficulty,
    blocktime88,
    pools,
    tabgrid
  },
  data () {
    return {
      date: [this.$moment().subtract(30, 'days').format('MM/DD/YY'), this.$moment().format('MM/DD/YY')],
      dates: [],
      desc: {
        'difficulty': 'Difficulty/Hashrate',
        'avggastx': 'Avg.gas/Gaslimit/Txns',
        'blocktime88': 'Avg.88-block period blocktime',
        'pools': 'Blocks mined by pools'
      },
      shortcuts: [
        {text: 'previous 30 days', onClick: this.short30d},
        {text: 'previous 90 days', onClick: this.short90d},
        {text: 'previous 6 months', onClick: this.short6m},
        {text: 'previous year', onClick: this.short1y}
      ],
      isActive: ''
    }
  },
  watch: {
    date: {
      handler: function (val) {
        let self = this
        self.dates = val.map((date) => {
          return self.$moment(date, 'MM/DD/YY').format('D/MM/YY')
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
    short30d () {
      this.date = [this.$moment().subtract(30, 'days').format('MM/DD/YY'), this.$moment().format('MM/DD/YY')]
    },
    short90d () {
      this.date = [this.$moment().subtract(90, 'days').format('MM/DD/YY'), this.$moment().format('MM/DD/YY')]
    },
    short6m () {
      this.date = [this.$moment().subtract(6, 'months').format('MM/DD/YY'), this.$moment().format('MM/DD/YY')]
    },
    short1y () {
      this.date = [this.$moment().subtract(1, 'year').format('MM/DD/YY'), this.$moment().format('MM/DD/YY')]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
