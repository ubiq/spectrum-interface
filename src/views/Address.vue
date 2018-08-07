<template>
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'Accounts'}">Accounts</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ hash }}</b-breadcrumb-item>
        <b-breadcrumb-link>
          <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
        </b-breadcrumb-link>
      </b-breadcrumb>
      <b-card no-body class="block-card">
        <b-row class="card-row">
          <b-col md="6">
            <strong>Overview</strong><span class="fa fa-qrcode pull-right"/>
            <hr>
          </b-col>
          <b-col md="6">
            <strong>Misc</strong>
            <hr>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="6">
            <b-row class="card-row">
              <b-col md="4">
                Balance:
              </b-col>
              <b-col md="8">
                10000000000
              </b-col>
            </b-row>
            <hr>
          </b-col>
          <b-col md="6">
            <strong>Misc</strong>
            <hr>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="6">
            <b-row class="card-row">
              <b-col md="4">
                Ubiq Value:
              </b-col>
              <b-col md="8">
                $10000000000
              </b-col>
            </b-row>
            <hr>
          </b-col>
          <b-col md="6">
            <strong>Misc</strong>
            <hr>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="6">
            <b-row class="card-row">
              <b-col md="4">
                Transactions:
              </b-col>
              <b-col md="8">
                250
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6">
            <strong>Misc</strong>
          </b-col>
        </b-row>
      </b-card>

      <b-tabs class="account-txn-tabs">
        <b-tab title="Transactions" active>
          <b-card no-body class="tab-table-card">
            <span style="padding:15px;">
              Latest 25 txns from a total of TODO transactions
            </span>
            <TxnsTable :items="txns" :address="hash"/>
          </b-card>
        </b-tab>
        <b-tab title="Erc20 Token Txns">
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import addresses from '../scripts/addresses'
import TxnsTable from '../components/tables/AccountTxns.vue'

export default {
  name: 'Address',
  props: ['hash'],
  watch: {
    '$route' (to, from) {
      this.fetch()
    }
  },
  data () {
    return {
      refreshing: false,
      account: {},
      txns: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      axios.get('https://api1.ubiqscan.io/v2/getbalance/' + this.hash)
        .then(response => {
          console.log(response.data.result)
          this.account = response.data.result
        })
        .catch(e => {
          this.errors.push(e)
        })
      axios.get('https://api1.ubiqscan.io/v2/getaccounttransactions/' + this.hash)
        .then(response => {
          console.log(response.data.result)
          this.txns = response.data.result
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
  },
  components: {
    TxnsTable
  }
}
</script>
