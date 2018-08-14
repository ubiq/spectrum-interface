<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col md="10">
        <b-breadcrumb>
          <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Token Transfers</b-breadcrumb-item>
          <b-breadcrumb-link>
            <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
          </b-breadcrumb-link>
        </b-breadcrumb>
        <TokenTransfersTable :items="transfers"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import TokenTransfersTable from '../components/tables/TokenTransfers.vue'

export default {
  name: 'TokenTransfers',
  watch: {
    '$route' (to, from) {
      this.fetch()
    }
  },
  data () {
    return {
      refreshing: false,
      transfers: [],
      errors: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      axios.get(this.$store.state.api + 'latesttokentransfers/1000')
        .then(response => {
          this.transfers = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })

      let self = this
      setTimeout(function () {
        self.refreshing = false
      }, 2000)
    }
  },
  components: {
    TokenTransfersTable
  }
}
</script>
