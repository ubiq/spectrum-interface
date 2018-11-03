<template>
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'Tokens'}">Tokens</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ checksumAddress }} {{ getAddressTitle(hash) }}</b-breadcrumb-item>
        <b-breadcrumb-link>
          <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
        </b-breadcrumb-link>
      </b-breadcrumb>
      <b-card no-body class="block-card">
        <b-row class="card-row">
          <b-col md="12">
            <Blockie :address="hash" size="xs" inline="true"/>
            <strong>Overview</strong><span v-b-modal.qrModal class="fa fa-qrcode pull-right"/>
            <b-modal id="qrModal" centered variant="dark" hide-footer style="text-align:center">
              <Qrcode :value="hash" :options="{size: 300}"/>
            </b-modal>
            <hr>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="6">
            <b-row class="card-row">
              <b-col md="4">
                Name:
              </b-col>
              <b-col md="8">
                {{ name }}
              </b-col>
            </b-row>
            <hr>
          </b-col>
          <b-col md="6">
            <b-row class="card-row">
              <b-col md="4">
                Total Supply:
              </b-col>
              <b-col md="8">
                {{ supply }} <span class="fa fa-info-circle" v-b-popover.hover="'This value represents the total supply defined in the token contract, it may not represent current circulating supply.'" title="Total Supply"/>
              </b-col>
            </b-row>
            <hr>
          </b-col>
        </b-row>
        <b-row class="card-row">
          <b-col md="6">
            <b-row class="card-row">
              <b-col md="4">
                Symbol:
              </b-col>
              <b-col md="8">
                {{ symbol }}
              </b-col>
            </b-row>
            <hr>
          </b-col>
          <b-col md="6">
            <b-row class="card-row">
              <b-col md="4">
                Transfers:
              </b-col>
              <b-col md="8">
                {{ formatNumber(tokenTransfersTotal) }}
              </b-col>
            </b-row>
            <hr>
          </b-col>
        </b-row>
      </b-card>

      <b-tabs class="account-txn-tabs">
        <b-tab title="Transfers">
          <b-card no-body class="tab-table-card">
            <span style="padding:15px;">
              Latest {{ tokenTransfers.length }} transfers from a total of {{ formatNumber(tokenTransfersTotal) }}
            </span>
            <TokenTransfersTable :items="tokenTransfers" :address="hash" :badge="false"/>
          </b-card>
        </b-tab>
        <b-tab v-if="isContract" title="Contract">
          <b-card no-body class="tab-table-card">
            <b-col md="12">
              <b-row class="card-row" style="margin-top:10px;">
                <b-col v-if="contractDeployTxn != ''" md="12">
                  Token contract deployed in txn <router-link :to="{ name: 'Transaction', params: {hash: contractDeployTxn} }">{{ contractDeployTxn.substr(0, 17) }}...</router-link> by <router-link :to="{ name: 'Address', params: {hash: contractDeployBy} }">{{ getAddressTag(contractDeployBy) }}</router-link>
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
import Tokens from '../scripts/tokens'
import TokenTransfersTable from '../components/tables/AccountTokenTransfers.vue'
import Qrcode from '@xkeshi/vue-qrcode'

export default {
  name: 'Token',
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
      supply: 0,
      decimals: 0,
      name: 'Unknown',
      symbol: 'Unknown',
      tokenTransfers: [],
      tokenTransfersTotal: 0,
      isContract: false,
      contractDeployTxn: '',
      contractDeployBy: '',
      contractByteCode: '',
      errors: []
    }
  },
  computed: {
    checksumAddress () {
      return common.toChecksumAddress(this.hash)
    }
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      var info = Tokens.getToken(this.hash)
      if (info != null) {
        this.name = info.name
        this.symbol = info.symbol
      }
      axios.get(this.$store.state.api + 'latesttransfersbytoken/' + this.hash)
        .then(response_ => {
          this.tokenTransfers = response_.data.txns || []
          this.tokenTransfersTotal = response_.data.total
          let self = this
          setTimeout(function () {
            self.refreshing = false
          }, 2000)
        })
        .catch(e_ => {
          this.errors.push(e_)
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
              id: 1
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
                this.errors.push(e)
              })
          }
        })
        .catch(e => {
          this.erros.push(e)
        })
      // get token total supply (0x18160ddd)
      axios.post(this.$store.state.rpc, {
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [{
          to: this.hash,
          data: '0x18160ddd'
        }, 'latest'],
        id: 2
      })
        .then(response => {
          // response.data.result
          if (response.data.result) {
            this.supply = Tokens.toToken(common.hexToDecimal(response.data.result), this.hash)
          } else {
            this.supply = '-'
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
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
    formatNumber (val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  components: {
    Blockie,
    Qrcode,
    TokenTransfersTable
  }
}
</script>
