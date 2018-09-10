<template>
  <div style="color: rgba(255, 255, 255, 0.5);padding:0 15px;">
    <div style="margin:3px 20px 0 -20px;width:200px;display:inline-block;vertical-align:top;">
      <b-card class='text-center' style="background-color:#222;margin-top:0;">
        <label style="margin-bottom:0;">Block {{ number }}</label>
        <div>
          <small>{{ timeSince }}</small>
        </div>
      </b-card>
    </div>
    <div style="display:inline-block;padding-top:12px;">
      <b-row>
        <strong>Mined By <router-link :to="{ name: 'Address', params: {hash: miner.full} }">{{ miner.short}}</router-link></strong>
      </b-row>
      <b-row>
        <label><router-link :to="{ name: 'Transactions', params: {type: 'block', blockNumber: number} }">{{ txns }} txns</router-link></label>
      </b-row>
      <b-row>
        <label>Block Reward {{ reward }} UBQ</label>
      </b-row>
    </div>
  </div>
</template>

<script>
import addresses from '../scripts/addresses'
import rewards from '../scripts/rewards'
export default {
  props: ['info'],
  data () {
    return {
      hash: '',
      number: 0,
      txns: 0,
      miner: {},
      reward: 0,
      time: 0,
      timeSince: 0
    }
  },
  watch: {
    info: function (val) {
      this.setData(val)
    }
  },
  methods: {
    setData: function (val) {
      this.hash = val.hash
      this.number = val.number
      this.txns = val.transactions
      this.miner = {
        short: addresses.getAddressTag(val.miner) || val.miner.substring(0, 17) + '...',
        full: val.miner
      }
      this.reward = rewards.calculateMintedCoins(val.number, val.uncles)
      this.time = val.timestamp * 1000
      this.timeSince = this.$moment().to(this.time)
    }
  },
  created () {
    this.setData(this.info)
    // update timeSince every 10 seconds
    let self = this
    setInterval(function () {
      self.timeSince = self.$moment().to(self.time)
    }, 10000)
  }
}
</script>
