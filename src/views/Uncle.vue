<template>
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'Uncles'}">Uncles</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ hash }}</b-breadcrumb-item>
        <b-breadcrumb-link>
          <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
        </b-breadcrumb-link>
      </b-breadcrumb>
      <b-card no-body class="block-card">
        <b-row class="card-row">
          <b-col md="3">
            Uncle Height:
          </b-col>
          <b-col md="9">
            {{ uncle.number }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Uncle Position:
          </b-col>
          <b-col md="9">
            {{ uncle.position }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Block Height:
          </b-col>
          <b-col md="9">
            <router-link :to="{ name: 'Block', params: { number: uncle.blockNumber }}">{{ uncle.blockNumber }}</router-link>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Hash:
          </b-col>
          <b-col md="9">
            {{ uncle.hash }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Parent Hash:
          </b-col>
          <b-col md="9">
            {{ uncle.parentHash }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Sha3Uncles:
          </b-col>
          <b-col md="9">
            {{ uncle.sha3Uncles }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Mined By:
          </b-col>
          <b-col md="9">
            <router-link :to="{ name: 'Address', params: {hash: uncle.miner} }">{{ getAddressTag(uncle.miner) }}</router-link>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Difficulty:
          </b-col>
          <b-col md="9">
            {{ formatNumber(uncle.difficulty) }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Gas Used:
          </b-col>
          <b-col md="9">
            {{ formatNumber(uncle.gasUsed) }} ({{ calcGasUsed(uncle.gasUsed, uncle.gasLimit) }})
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Gas Limit:
          </b-col>
          <b-col md="9">
            {{ formatNumber(uncle.gasLimit) }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            TimeStamp:
          </b-col>
          <b-col md="9">
            ~{{ calcTime(uncle.timestamp) }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Uncle Reward:
          </b-col>
          <b-col md="9">
            {{ fromWei(uncle.reward) }} UBQ
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import addresses from '../scripts/addresses'
import common from '../scripts/common'

export default {
  name: 'Uncle',
  props: ['hash'],
  watch: {
    '$route': {
      handler: function (from, to) {
        this.fetch()
      },
      immediate: true
    }
  },
  data () {
    return {
      refreshing: false,
      uncle: {}
    }
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      axios.get(this.$store.state.api + 'uncle/' + this.hash)
        .then(response => {
          this.uncle = response.data
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
      return common.formatNumber(val)
    },
    fromWei (val) {
      return common.fromWei(val)
    }
  }
}
</script>
