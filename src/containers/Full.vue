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
import axios from 'axios'

export default {
  name: 'Full',
  components: {
    Navbar,
    Footer
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
      axios.get(this.$store.state.api + 'latest')
        .then(response => {
          let latestBlock = response.data
          if (this.$store.state.latestBlock.number !== latestBlock.number) {
            this.$store.dispatch('setLatestBlock', {
              number: latestBlock.number,
              miner: latestBlock.miner,
              timestamp: latestBlock.timestamp,
              transactions: latestBlock.transactions,
              uncles: latestBlock.uncles
            })
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
