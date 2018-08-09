<template>
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'Transactions', params:{type: 'latest'}}">Transactions</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ hash }}</b-breadcrumb-item>
        <b-breadcrumb-link>
          <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
        </b-breadcrumb-link>
      </b-breadcrumb>
      <b-card no-body class="block-card">
        <b-row class="card-row">
          <b-col md="3">
            TxHash:
          </b-col>
          <b-col md="9">
            {{ hash }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Block Height:
          </b-col>
          <b-col md="9">
            <router-link :to="{ name: 'Block', params: { number: txn.blockNumber}}">{{ txn.blockNumber }}</router-link> ({{ confirmations }} block confirmations)
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            TimeStamp:
          </b-col>
          <b-col md="9">
            ~{{ calcTime(txn.timestamp) }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            From:
          </b-col>
          <b-col md="9">
            <router-link :to="{ name: 'Address', params: { hash: txn.from}}">{{ getAddressTag(txn.from) }}</router-link>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            To:
          </b-col>
          <b-col md="9">
            <router-link :to="{ name: 'Address', params: { hash: txn.to}}">{{ getAddressTag(txn.to) }}</router-link>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Value:
          </b-col>
          <b-col md="9">
            {{ fromWei(txn.value) }} UBQ
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Gas Limit:
          </b-col>
          <b-col md="9">
            {{ formatNumber(txn.gas) }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Gas Used By Txn:
          </b-col>
          <b-col md="9">
            {{ formatNumber(txn.gasUsed) }}
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Gas Price:
          </b-col>
          <b-col md="9">
            {{ fromWeiToGwei(txn.gasPrice) }} gwei
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Actual Tx Cost/Fee:
          </b-col>
          <b-col md="9">
            {{ calcTxFee(txn.gasUsed, txn.gasPrice)}} UBQ
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Nonce & [Position]:
          </b-col>
          <b-col md="9">
            {{ txn.nonce}} | [{{ txn.transactionIndex }}]
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="3">
            Input Data:
          </b-col>
          <b-col md="9">
            <b-card class="card-input-data">
              <pre>{{ txn.input }}</pre>
            </b-card>
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
  name: 'Transaction',
  props: ['hash'],
  watch: {
    '$route' (to, from) {
      this.fetch()
    }
  },
  data () {
    return {
      refreshing: false,
      txn: {}
    }
  },
  created () {
    this.fetch()
  },
  computed: {
    confirmations () {
      return this.$store.state.latestBlock.number - this.txn.blockNumber
    }
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      axios.get(this.$store.state.api + 'transaction/' + this.hash)
        .then(response => {
          this.txn = response.data
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
    calcTime (timestamp) {
      return this.$moment().to(timestamp * 1000) + ' (' + this.$moment.utc(timestamp * 1000).format('lll') + ' UTC)'
    },
    formatNumber (val) {
      if (val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return ''
      }
    },
    fromWei (val) {
      return common.fromWei(val)
    },
    fromWeiToGwei (val) {
      return common.fromWeiToGwei(val)
    },
    calcTxFee (gasUsed, gasPrice) {
      return common.fromWei(common.calcTxFee(gasUsed, gasPrice))
    }
  }
}
</script>
