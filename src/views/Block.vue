<template>
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'Blocks'}">Blocks</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ number }}</b-breadcrumb-item>
        <b-breadcrumb-link>
          <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
        </b-breadcrumb-link>
      </b-breadcrumb>
      <b-card no-body class="block-card">
        <b-row class="card-row">
          <b-col md="3">
            Height:
          </b-col>
          <b-col md="9">
            <router-link :to="{ name: 'Block', params: { number: number - 1 }}"><span class="fa fa-arrow-left icon-left"/></router-link>
            {{ block.number }}
            <router-link :to="{ name: 'Block', params: { number: number - -1 }}"><span class="fa fa-arrow-right icon-right"/></router-link>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            TimeStamp:
          </b-col>
          <b-col md="9">
            ~{{ calcTime(block.timestamp) }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Transactions:
          </b-col>
          <b-col md="9">
            <router-link :to="{ name: 'Transactions', params: { type: 'block', number: number}}">{{ block.transactions.length }} transactions</router-link> and TODO (internal contract transactions)
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Hash:
          </b-col>
          <b-col md="9">
            {{ block.hash }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Parent Hash:
          </b-col>
          <b-col md="9">
            <router-link :to="{ name: 'Block', params: { number: number - 1 }}">{{ block.parentHash }}</router-link>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Sha3Uncles:
          </b-col>
          <b-col md="9">
            {{ block.sha3Uncles }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Mined By:
          </b-col>
          <b-col md="9">
            <router-link :to="{ name: 'Address', params: {hash: block.miner} }">{{ getAddressTag(block.miner) }}</router-link>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Difficulty:
          </b-col>
          <b-col md="9">
            {{ formatNumber(block.difficulty) }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Size:
          </b-col>
          <b-col md="9">
            {{ formatNumber(block.size) }} bytes
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Gas Used:
          </b-col>
          <b-col md="9">
            {{ formatNumber(block.gasUsed) }} ({{ calcGasUsed(block.gasUsed, block.gasLimit) }})
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Gas Limit:
          </b-col>
          <b-col md="9">
            {{ formatNumber(block.gasLimit) }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Nonce:
          </b-col>
          <b-col md="9">
            {{ block.nonce }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Block Reward:
          </b-col>
          <b-col md="9">
            TODO
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Uncles Reward:
          </b-col>
          <b-col md="9">
            TODO
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Extra Data:
          </b-col>
          <b-col md="9">
            TODO web3.toAscii ({{ block.extraData }})
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import addresses from '../scripts/addresses'

export default {
  name: 'Block',
  props: ['number'],
  watch: {
    '$route' (to, from) {
      this.fetch()
    }
  },
  data () {
    return {
      refreshing: false,
      block: {}
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      axios.get(this.$store.state.api + 'getblock/' + this.number)
        .then(response => {
          console.log(response.data.result)
          this.block = response.data.result
        })
        .catch(e => {
          this.errors.push(e)
        })

      let self = this
      setTimeout(function () {
        self.refreshing = false
      }, 2000)
    },
    getAddressTag (hash) {
      return addresses.getAddressTag(hash) || hash
    },
    calcGasUsed (gasUsed, gasLimit) {
      return ((gasUsed / gasLimit) * 100).toFixed(2) + '%'
    },
    calcTime (timestamp) {
      return this.$moment().to(timestamp * 1000) + ' (' + this.$moment.utc(timestamp * 1000).format('lll') + ' UTC)'
    },
    formatNumber (val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
