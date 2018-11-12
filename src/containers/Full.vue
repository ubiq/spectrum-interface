<template>
  <div class="app">
    <Navbar/>
    <notifications position="top left" class="top-notification" group="normal" width="100%"/>
    <div class="container-fluid app-body">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import common from '../scripts/common'
import axios from 'axios'

export default {
  name: 'Full',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      errors: []
    }
  },
  created () {
    this.fetch()
    let self = this
    setInterval(function () {
      self.fetch()
    }, 30000)
  },
  methods: {
    fetch: function () {
      axios.get(this.$store.state.api + 'status')
        .then(response => {
          let latestBlock = response.data.latestBlock
          if (this.$store.state.latestBlock.number !== latestBlock.number) {
            this.$store.dispatch('setLatestBlock', {
              number: latestBlock.number,
              miner: latestBlock.miner,
              timestamp: latestBlock.timestamp,
              transactions: latestBlock.transactions,
              uncles: latestBlock.uncles
            })
            this.$store.dispatch('setSupply', response.data.supply)
            axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
              .then(response_ => {
                this.$store.dispatch('setPrice', {
                  btc: response.data.price,
                  usd: common.mulFiat(response.data.price, response_.data.bpi.USD.rate.replace(',', '')),
                  eur: common.mulFiat(response.data.price, response_.data.bpi.EUR.rate.replace(',', ''))
                })
              })
            axios.get(this.$store.state.api + 'charts/txns/365')
              .then(response => {
                this.$store.dispatch('setTxnsCount', response.data)
              })
              .catch(e => {
                this.errors.push(e)
              })
            axios.get(this.$store.state.api + 'charts/avggasprice/365')
              .then(response => {
                this.$store.dispatch('setAvgGasPrice', response.data)
              })
              .catch(e => {
                this.errors.push(e)
              })
            axios.get(this.$store.state.api + 'charts/gaslimit/365')
              .then(response => {
                this.$store.dispatch('setGasLimit', response.data)
              })
              .catch(e => {
                this.errors.push(e)
              })
            axios.get(this.$store.state.api + 'charts/difficulty/365')
              .then(response => {
                this.$store.dispatch('setDifficulty', response.data)
              })
              .catch(e => {
                this.errors.push(e)
              })
            axios.get(this.$store.state.api + 'charts/hashrate/365')
              .then(response => {
                this.$store.dispatch('setHashrate', response.data)
              })
              .catch(e => {
                this.errors.push(e)
              })
            axios.get(this.$store.state.api + 'charts/blocktime/0')
              .then(response => {
                this.$store.dispatch('setBlocktime', response.data)
              })
              .catch(e => {
                this.errors.push(e)
              })
            axios.get(this.$store.state.api + 'charts/blocktime88/1100')
              .then(response => {
                this.$store.dispatch('setBlocktime88', response.data)
              })
              .catch(e => {
                this.errors.push(e)
              })
          }
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
    }
  }
}
</script>
