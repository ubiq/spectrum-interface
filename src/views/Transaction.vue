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
      <b-tabs class="account-txn-tabs">
        <b-tab title="Overview" active>
          <b-card no-body class="block-card tab-card">
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
                <span v-if="pending">pending</span>
                <router-link v-else :to="{ name: 'Block', params: { number: txn.blockNumber}}">{{ txn.blockNumber }}</router-link> ({{ confirmations }} block confirmations)
              </b-col>
            </b-row>
            <b-row v-if="pending === false" class="card-row">
              <b-col md="3">
                TimeStamp:
              </b-col>
              <b-col md="9">
                ~{{ timestamp }}
              </b-col>
            </b-row>
            <b-row class="card-row">
              <b-col md="3">
                From:
              </b-col>
              <b-col md="9">
                <router-link :to="{ name: 'Address', params: { hash: txn.from}}">{{ txn.from }}</router-link> {{ getAddressTag(txn.from) }}
              </b-col>
            </b-row>
            <b-row class="card-row">
              <b-col md="3">
                To:
              </b-col>
              <b-col md="9">
                <router-link :to="{ name: 'Address', params: { hash: txn.to}}">{{ txn.to }}</router-link> {{ getAddressTag(txn.to) }}
              </b-col>
            </b-row>
            <b-row v-if="tokenTransfered" class="card-row">
              <b-col md="3">
                Token Transfered:
              </b-col>
              <b-col md="9">
                <span class="fa fa-arrow-right"/> From <router-link :to="{ name: 'Address', params: { hash: token.from }}">{{ shortenAddress(token.from) }}</router-link> To <router-link :to="{ name: 'Address', params: { hash: token.to }}">{{ shortenAddress(token.to) }}</router-link> for {{ token.value }} <router-link :to="{ name: 'Address', params: { hash: token.contract }}">{{ token.symbol }}</router-link>
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
                <span v-if="pending">{{ formatNumber(toDecimal(txn.gas)) }}</span>
                <span v-else>{{ formatNumber(txn.gas) }}</span>
              </b-col>
            </b-row>
            <b-row v-if="pending === false" class="card-row">
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
            <b-row v-if="pending === false" class="card-row">
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
                <span v-if="pending">{{ toDecimal(txn.nonce) }} | [{{ toDecimal(txn.transactionIndex) }}]</span>
                <span v-else>{{ txn.nonce}} | [{{ txn.transactionIndex }}]</span>
              </b-col>
            </b-row>
            <b-row class="card-row">
              <b-col md="3">
                Input Data:
              </b-col>
              <b-col md="9">
                <b-card class="card-input-data">
                  <pre v-if="inputType === 'original'">{{ txn.input }}</pre>
                  <!-- leave this gross indentation for correct formatting inside pre -->
                  <pre v-if="inputType === 'default'">
Function: {{ inputData.function }}

MethodID: {{ inputData.methodId }}
<span v-for="(item, index) in inputData.params" :key="index">[{{ index }}]:  {{ item }}
</span>
                  </pre>
                  <pre v-if="inputType === 'utf8'">{{ toUtf8(txn.input) }}</pre>
                </b-card>
                <b-dropdown size="sm" variant="secondary" text="View Input As" class="input-dropdown">
                  <b-dropdown-item v-if="tokenTransfered" v-on:click="inputType = 'default'">Default View</b-dropdown-item>
                  <b-dropdown-item v-on:click="inputType = 'original'">Original</b-dropdown-item>
                </b-dropdown>
              </b-col>
            </b-row>
          </b-card>
        </b-tab>
        <b-tab v-if="showLogs" :title="'Event Logs (' + txn.logs.length + ')'">
          <b-card no-body class="block-card tab-card">
            <!-- leave this gross indentation for correct formatting inside pre -->
            <pre>
<strong>Transaction Receipt Event Logs</strong>
<b-card class="card-input-data" v-for="(item, index) in eventLogs" :key="index">
[{{item.index}}]  Address    {{ item.address }}
     <span v-if="item.isKnown">Name       {{ item.name }}</span>

     Topics<span v-for="(topic, tindex) in item.topics" :key="tindex">
                [{{ tindex }}] {{ topic }}</span>

     Data<span v-for="(data, dindex) in item.data" :key="dindex">
                {{ data }}</span>
</b-card>
            </pre>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import addresses from '../scripts/addresses'
import common from '../scripts/common'
import contracts from '../scripts/contracts'
import tokens from '../scripts/tokens'

export default {
  name: 'Transaction',
  props: ['hash'],
  watch: {
    '$route' (to, from) {
      this.fetch()
    },
    latestBlock: function () {
      if (this.pending === true) {
        this.fetch()
      } else {
        this.timestamp = this.calcTime(this.txn.timestamp)
      }
    }
  },
  data () {
    return {
      refreshing: false,
      txn: {},
      tokenTransfered: false,
      showLogs: false,
      inputType: 'original',
      inputData: {},
      eventLogs: [],
      timestamp: '',
      token: {},
      pending: false,
      errors: []
    }
  },
  created () {
    this.fetch()
  },
  computed: {
    confirmations () {
      return this.pending === true ? 0 : this.$store.state.latestBlock.number - this.txn.blockNumber
    },
    latestBlock () {
      return this.$store.state.latestBlock.number
    }
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      axios.get(this.$store.state.api + 'transaction/' + this.hash)
        .then(response => {
          if (response.data.hash) {
            this.txn = response.data
            this.timestamp = this.calcTime(this.txn.timestamp)
            if (response.data.logs.length > 0) {
              this.showLogs = true
              this.eventLogs = contracts.processEventLogs(this.txn.logs)
            }
            this.pending = false
          } else {
            axios.post(this.$store.state.rpc, {
              jsonrpc: '2.0',
              method: 'eth_getTransactionByHash',
              params: [
                this.hash
              ],
              id: 1
            })
              .then(response_ => {
                this.txn = response_.data.result
                this.pending = true
              })
              .catch(e => {
                this.errors.push(e)
              })
          }
          if (this.txn.input !== '0x') {
            this.inputData = contracts.processTxnInput(this.txn.input)
            if (this.inputData.isKnown === true) {
              this.inputType = 'default'
            }
            this.token = tokens.processInputData(this.txn, this.inputData)
            if (this.token.isTokenTxn) {
              this.tokenTransfered = true
            }
          }
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
      let tag = addresses.getAddressTag(hash)
      if (tag) {
        return '(' + tag + ')'
      } else {
        return ''
      }
    },
    shortenAddress (hash) {
      return hash.substring(0, 17) + '...'
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
    },
    toDecimal (hex) {
      return common.hexToDecimal(hex)
    },
    toUtf8 (val) {
      return common.toUtf8(val)
    },
    processEventTopic (topic) {
      return contracts.processEventTopic(topic)
    }
  }
}
</script>
