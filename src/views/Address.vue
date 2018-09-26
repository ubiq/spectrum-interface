<template>
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item>Accounts</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ hash }} {{ getAddressTitle(hash) }}</b-breadcrumb-item>
        <b-breadcrumb-link>
          <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
        </b-breadcrumb-link>
      </b-breadcrumb>
      <b-card no-body class="block-card">
        <b-row class="card-row">
          <b-col md="6">
            <Blockie :address="hash" size="xs" inline="true"/>
            <strong>Overview</strong><span v-b-modal.qrModal class="fa fa-qrcode pull-right"/>
            <b-modal id="qrModal" centered variant="dark" hide-footer style="text-align:center">
              <Qrcode :value="hash" :options="{size: 300}"/>
            </b-modal>
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
                {{ fromWei(this.balance) }}
              </b-col>
            </b-row>
            <hr>
          </b-col>
          <b-col md="6">
            <b-dropdown size="sm" split variant="secondary" class="input-dropdown" style="margin-top:-10px">
              <div slot="button-content">Token Balances <b-badge>{{ tokenBalances.length }}</b-badge></div>
              <div v-for="(item, index) in tokenBalances" :key="index">
                <b-dropdown-item>
                  <div><strong>{{ item.name }}</strong></div>
                  <div>{{ item.balance}} {{item.symbol}}</div>
                </b-dropdown-item>
                <b-dropdown-divider/>
              </div>
            </b-dropdown>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="6">
            <b-row class="card-row">
              <b-col md="4">
                Ubiq Value:
              </b-col>
              <b-col md="8">
                ${{ formatNumber(calcValue()) }} (@ ${{ priceUSD }}/UBQ)
              </b-col>
            </b-row>
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
                {{ formatNumber(txnsTotal) }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>

      <b-tabs class="account-txn-tabs">
        <b-tab title="Transactions" active>
          <b-card no-body class="tab-table-card">
            <span style="padding:15px;">
              Latest {{ txns.length }} txns from a total of {{ formatNumber(txnsTotal) }} transactions
            </span>
            <TxnsTable :items="txns" :address="hash"/>
          </b-card>
        </b-tab>
        <b-tab v-if="tokentxnsTotal > 0" title="Erc20 Token Txns">
          <b-card no-body class="tab-table-card">
            <span style="padding:15px;">
              Latest {{ tokentxns.length }} token txns from a total of {{ formatNumber(tokentxnsTotal) }} transactions
            </span>
            <TokenTransfersTable :items="tokentxns" :address="hash"/>
          </b-card>
        </b-tab>
        <b-tab v-if="isContract" title="Contract">
          <b-card no-body class="tab-table-card">
            <b-col md="12">
              <b-row class="card-row" style="margin-top:10px;">
                <b-col v-if="contractDeployTxn != ''" md="12">
                  Contract deployed in txn <router-link :to="{ name: 'Transaction', params: {hash: contractDeployTxn} }">{{ contractDeployTxn.substr(0, 17) }}...</router-link> by <router-link :to="{ name: 'Address', params: {hash: contractDeployBy} }">{{ getAddressTag(contractDeployBy) }}</router-link>
                </b-col>
              </b-row>
              <hr>
              <strong v-if="contractDeployTxn != ''">Contract Deploy Code <span class="fa fa-calculator"/></strong>
              <strong v-else>Contract Byte Code <span class="fa fa-calculator"/></strong>
              <b-card class="card-input-data" style="margin-bottom:15px;">{{ contractByteCode }}</b-card>
            </b-col>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import addresses from '../scripts/addresses'
import Blockie from '../components/Blockie.vue'
import common from '../scripts/common'
import tokens from '../scripts/tokens'
import TxnsTable from '../components/tables/AccountTxns.vue'
import TokenTransfersTable from '../components/tables/AccountTokenTransfers.vue'
import Qrcode from '@xkeshi/vue-qrcode'

export default {
  name: 'Address',
  props: ['hash'],
  watch: {
    '$route': {
      handler: this.fetch(),
      immediate: true
    }
  },
  data () {
    return {
      refreshing: false,
      account: {},
      txns: [],
      txnsTotal: 0,
      tokentxns: [],
      tokentxnsTotal: 0,
      tokensObj: {},
      tokenBalances: [],
      balance: 0,
      isContract: false,
      contractDeployTxn: '',
      contractDeployBy: '',
      contractByteCode: '',
      errors: []
    }
  },
  computed: {
    priceUSD () {
      return this.$store.state.price.usd
    }
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      axios.post(this.$store.state.rpc, {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [
          this.hash,
          'latest'
        ],
        id: 1
      })
        .then(response => {
          this.balance = common.hexToDecimal(response.data.result)
        })
        .catch(e => {
          this.errors.push(e)
        })
      axios.get(this.$store.state.api + 'latestaccounttxns/' + this.hash)
        .then(response => {
          this.txns = response.data.txns || []
          this.txnsTotal = response.data.total

          axios.get(this.$store.state.api + 'latestaccounttokentxns/' + this.hash)
            .then(response_ => {
              this.tokentxns = response_.data.txns || []
              this.tokentxnsTotal = response_.data.total
            })
            .catch(e_ => {
              this.errors.push(e_)
            })
        })
        .catch(e => {
          this.errors.push(e)
        })

      // get contract info if contract
      axios.get(this.$store.state.api + 'transactionbycontract/' + this.hash)
        .then(response => {
          if (response.data.hash) {
            this.isContract = true
            this.contractDeployTxn = response.data.hash
            this.contractByteCode = response.data.input
            this.contractDeployBy = response.data.from
          } else {
            axios.post(this.$store.state.rpc, {
              jsonrpc: '2.0',
              method: 'eth_getCode',
              params: [
                this.hash,
                'latest'
              ],
              id: 2
            })
              .then(response => {
                if (response.data.result !== '0x') {
                  this.isContract = true
                  this.contractByteCode = response.data.result
                } else {
                  this.isContract = false
                }
              })
              .catch(e => {
                self.errors.push(e)
              })
          }
        })
        .catch(e => {
          this.erros.push(e)
        })

      // token balances
      this.tokensObj = tokens.getTokens()

      let self = this
      var bcount = 2
      var tokenBals = []
      Object.keys(this.tokensObj).forEach(function (key) {
        axios.post(self.$store.state.rpc, {
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [{
            to: key,
            data: '0x70a08231' + tokens.zeroPadAddress(self.hash)
          }, 'latest'],
          id: bcount
        })
          .then(response => {
            let balance = tokens.toBalance(response.data.result, key)
            if (balance !== '0') {
              tokenBals.push({
                name: self.tokensObj[key].name,
                symbol: self.tokensObj[key].symbol,
                balance: balance
              })
            }
          })
          .catch(e => {
            self.errors.push(e)
          })
        bcount += 1
      })
      this.tokenBalances = tokenBals

      setTimeout(function () {
        self.refreshing = false
      }, 2000)
    },
    getAddressTag (hash) {
      return addresses.getAddressTag(hash) || hash
    },
    getAddressTitle (hash) {
      let tag = addresses.getAddressTag(hash)
      if (tag) {
        return '(' + tag + ')'
      } else {
        return ''
      }
    },
    calcGasUsed (gasUsed, gasLimit) {
      return ((gasUsed / gasLimit) * 100).toFixed(2) + '%'
    },
    calcTime (timestamp) {
      return this.$moment().to(timestamp * 1000) + ' (' + this.$moment.utc(timestamp * 1000).format('lll') + ' UTC)'
    },
    formatNumber (val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    fromWei (val) {
      return common.fromWei(val)
    },
    calcValue () {
      return common.mulFiat(common.fromWei(this.balance), this.priceUSD, 2)
    },
    gettokens () {
      return tokens.tokens()
    }
  },
  components: {
    Blockie,
    Qrcode,
    TxnsTable,
    TokenTransfersTable
  }
}
</script>
