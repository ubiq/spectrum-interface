<template>
  <div class="app">
    <Navbar/>
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
            this.$store.dispatch('setTxnsCount', response.data.txnCounts)
            axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
              .then(response_ => {
                console.log(response_.data.bpi.USD.rate)
                this.$store.dispatch('setPrice', {
                  btc: response.data.price,
                  usd: common.mulFiat(response.data.price, response_.data.bpi.USD.rate.replace(',', '')),
                  eur: common.mulFiat(response.data.price, response_.data.bpi.EUR.rate.replace(',', ''))
                })
              })
              .catch(e_ => {
                this.errors.push(e_)
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
