<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col md="10">
        <b-breadcrumb>
          <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Tokens</b-breadcrumb-item>
        </b-breadcrumb>
        <TokensTable :items="tokens"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Tokens from '../scripts/tokens'
import TokensTable from '../components/tables/Tokens.vue'

export default {
  name: 'Tokens',
  data () {
    return {
      tokens: []
    }
  },
  created () {
    let tokens = Tokens.getTokens()
    for (var key in tokens) {
      if (tokens.hasOwnProperty(key)) {
        if (tokens[key].display === true) {
          this.tokens.push({
            address: key,
            name: tokens[key].name,
            symbol: tokens[key].symbol,
            decimals: tokens[key].decimals
          })
        }
      }
    }
  },
  components: {
    TokensTable
  }
}
</script>
