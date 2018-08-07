<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col md="10">
        <b-breadcrumb>
          <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
          <b-breadcrumb-item :active="type === 'latest'" :to="{name: 'Transactions', params: {type: 'latest'}}">Transactions</b-breadcrumb-item>
          <b-breadcrumb-item v-if="type === 'pending'" active='true'>Pending</b-breadcrumb-item>
          <b-breadcrumb-link>
            <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
          </b-breadcrumb-link>
        </b-breadcrumb>
        <TxnsTable :items="txns"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import TxnsTable from '../components/tables/Txns.vue'

export default {
  name: 'Transactions',
  props: ['type'],
  watch: {
    '$route' (to, from) {
      this.fetch()
    },
    type: function () {
      this.fetch()
    }
  },
  data () {
    return {
      refreshing: false,
      txns: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      if (this.type === 'latest') {
        axios.get('https://api1.ubiqscan.io/v2/getlatesttransactions')
          .then(response => {
            this.txns = response.data.result
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        axios.get('https://api1.ubiqscan.io/v2/getpendingtransactions')
          .then(response => {
            this.txns = response.data.result
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      let self = this
      setTimeout(function () {
        self.refreshing = false
      }, 2000)
    }
  },
  components: {
    TxnsTable
  }
}
</script>
