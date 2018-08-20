<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col md="5">
        <b-card class="card-dark">
          <div>
            <img src='../assets/logo.svg' width="60" height="60"/>
            <span style="display:inline-block">
              <div>MARKET CAP OF ${{ marketcap }} MILLION</div>
              <div>${{ priceUSD }} @ {{ priceBTC }} BTC/UBQ</div>
            </span>
          </div>
          <b-row style="padding:15px 15px 0 15px">
            <div>
              <h5 style="margin-bottom:0px;">LAST BLOCK</h5>
              <h6>{{ latestBlock }} ({{ blocktime }}s)</h6>
            </div>
            <div class="text-right mr-0 ml-auto">
              <h5 style="margin-bottom:0px;">TRANSACTIONS</h5>
              <h6>{{ txnCount }}</h6>
            </div>
          </b-row>
          <b-row style="padding:0px 15px">
            <div>
              <h6 style="margin-bottom:0px;">Hash Rate</h6>
              <span>{{ hashrate }} GH/s</span>
            </div>
            <div class="text-right mr-0 ml-auto">
              <h6 style="margin-bottom:0px;">Network Difficulty</h6>
              <span>{{ difficulty }} TH</span>
            </div>
          </b-row>
        </b-card>
      </b-col>
      <b-col md="5">
        <b-card class="text-center card-dark">
          <img src='../assets/logo.svg' width="100" height="100"/>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center" style="margin-top:20px;">
      <b-col md="5">
        <b-card class="card-home">
          <strong slot="header">Blocks <b-badge pill variant="dark" class="float-right"><router-link :to="{ name: 'Blocks', params: {} }">View All</router-link></b-badge></strong>
          <div v-for="(item, index) in blocks" :key="index">
            <PreviewBlock :info="item"/>
            <hr style="margin:5px 0 3px 0;">
          </div>
        </b-card>
      </b-col>
      <b-col md="5">
        <b-card class="card-home">
          <strong slot="header">Transactions <b-badge pill variant="dark" class="float-right"><router-link :to="{ name: 'Transactions', params: {type: 'latest'} }">View All</router-link></b-badge></strong>
          <div v-for="(item, index) in txns" :key="index">
            <PreviewTxn :info="item"/>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import common from '../scripts/common'
import PreviewTxn from '../components/PreviewTxn.vue'
import PreviewBlock from '../components/PreviewBlock.vue'

export default {
  name: 'Home',
  watch: {
    '$route' (to, from) {
      this.fetch()
    },
    latestBlock: function () {
      this.fetch()
    }
  },
  data () {
    return {
      errors: [],
      txns: [],
      txnCount: 0,
      blocks: [],
      hashrate: '',
      blocktime: 0,
      difficulty: 0
    }
  },
  created () {
    this.fetch()
  },
  computed: {
    latestBlock () {
      return this.$store.state.latestBlock.number
    },
    priceUSD () {
      return parseFloat(this.$store.state.price.usd).toFixed(4)
    },
    priceBTC () {
      return this.$store.state.price.btc
    },
    marketcap () {
      return (common.mulFiat(common.fromWei(this.$store.state.supply), this.$store.state.price.usd, 2) / 1000000).toFixed(2)
    }
  },
  methods: {
    fetch: function () {
      axios.get(this.$store.state.api + 'latesttransactions/10')
        .then(response => {
          this.txns = response.data.txns
          this.txnCount = response.data.total
        })
        .catch(e => {
          this.errors.push(e)
        })
      axios.get(this.$store.state.api + 'latestblocks/10')
        .then(response => {
          this.blocks = response.data
          this.difficulty = (this.blocks[0].difficulty / 1000000000000).toFixed(2) // (TH)
          this.blocktime = this.blocks[0].timestamp - this.blocks[1].timestamp
          // calc avg blocktime based on latest blocks
          var blocktimes = []
          var sum = 0
          var count = 0
          let self = this
          this.blocks.forEach(function (block) {
            if (self.blocks[count + 1]) {
              var btime = block.timestamp - self.blocks[count + 1].timestamp
              blocktimes.push(btime)
              sum += btime
              count += 1
            }
          })
          var avgBlocktime = sum / blocktimes.length
          // estimate hashrate based on avg blocktime (GH/s)
          this.hashrate = ((this.blocks[0].difficulty / avgBlocktime) / 1000000000).toFixed(2)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  components: {
    PreviewTxn,
    PreviewBlock
  }
}
</script>
