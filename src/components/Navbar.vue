<template>
  <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#"><img src="../assets/logo.svg" width="26" height="26"></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav class="d-none d-md-block">
        <b-nav-form @submit.prevent="submitSearch(search)" autocomplete="off">
          <b-form-input size="sm" class="mr-sm-2 search-input" type="text" placeholder="Search by Address / Txhash / Block" v-model="search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item v-b-modal.modalPopover>BROADCAST TRANSACTION</b-nav-item>

        <navbarmodal id="modalPopover" />

        <b-nav-item :to="{ name: 'Home', params: {} }">HOME</b-nav-item>

        <b-nav-item :to="{ name: 'Map', params: {} }">NODE MAP</b-nav-item>

        <b-nav-item :to="{ name: 'Stats', params: {} }">STATS</b-nav-item>

        <b-nav-item-dropdown text="BLOCKCHAIN" right>
          <b-dropdown-item :to="{ name: 'Transactions', params: {type: 'latest'} }"><span class="fa fa-list-alt"/> View Txns</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'Transactions', params: {type: 'pending'} }"><span class="fa fa-tasks"/> View Pending Txns</b-dropdown-item>
          <b-dropdown-divider/>
          <b-dropdown-item :to="{ name: 'Blocks', params: {} }"><span class="fa fa-cubes"/> View Blocks</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'Uncles', params: {} }"><span class="fa fa-cube"/> View Uncles</b-dropdown-item>
          <b-dropdown-divider/>
          <b-dropdown-item :to="{ name: 'ForkedBlocks', params: {} }"><span class="fa fa-code-fork"/> Forked Blocks (Reorgs)</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="TOKENS" right>
          <b-dropdown-item :to="{ name: 'Tokens', params: {} }"><span class="fa fa-certificate"/> View Tokens</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'TokenTransfers', params: {} }"><span class="fa fa-navicon"/> View Token Transfers</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="MISC" right>
          <b-dropdown-item href="https://ubiq.darcr.us" target="_blank"><span class="fa fa-dashboard"/> Network Stats</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import axios from 'axios'
import navbarModal from './misc/navbarmodal'
import common from '../scripts/common'
import Tokens from '../scripts/tokens'
export default {
  name: 'Navbar',
  components: {
    navbarmodal: navbarModal
  },
  data () {
    return {
      search: '',
      errors: []
    }
  },
  methods: {
    submitSearch: function (str) {
      // remove whitespace
      str = str.replace(/\s/g, '')
      var address = new RegExp(/^0x[0-9a-fA-F]{40}$/i)
      var hash = new RegExp(/^0x[0-9a-fA-F]{64}$/i)
      if (address.test(str)) {
        // matches address format
        if (Tokens.getToken(str.toLowerCase())) {
          // matches token hash
          this.$router.push({name: 'Token', params: {hash: str.toLowerCase()}})
          this.search = ''
        } else {
          // must be an account/contract
          this.$router.push({name: 'Address', params: {hash: str.toLowerCase()}})
          this.search = ''
        }
      } else if (hash.test(str)) {
        console.log('search: is hash')
        // is block or txn hash
        // check if block hash
        axios.post(this.$store.state.rpc, {
          jsonrpc: '2.0',
          method: 'eth_getBlockByHash',
          params: [
            str,
            false
          ],
          id: 1
        })
          .then(response => {
            if (response.data.result) {
              // is block hash
              this.$router.push({name: 'Block', params: {number: common.hexToDecimal(response.data.result.number)}})
              this.search = ''
            } else {
              // check if txn hash
              axios.post(this.$store.state.rpc, {
                jsonrpc: '2.0',
                method: 'eth_getTransactionByHash',
                params: [
                  str
                ],
                id: 2
              })
                .then(response => {
                  if (response.data.result) {
                    // is txn hash
                    this.$router.push({name: 'Transaction', params: {hash: str.toLowerCase()}})
                    this.search = ''
                  } else {
                    // hash is not valid txn or block hash
                    console.log('Search: invalid block/txn hash')
                    this.$notify({
                      group: 'normal',
                      text: '<span class="fa fa-search"/> Invalid Txn/Block Hash: ' + str,
                      type: 'error'
                    })
                  }
                })
                .catch(e => {
                  this.errors.push(e)
                })
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else if (!isNaN(parseFloat(str)) && isFinite(str)) {
        // is potential block number
        this.$router.push({name: 'Block', params: {number: str}})
        this.search = ''
      } else {
        this.$notify({
          group: 'normal',
          text: '<span class="fa fa-search"/> Invalid search params: ' + str,
          type: 'error'
        })
      }
    }
  }
}
</script>
