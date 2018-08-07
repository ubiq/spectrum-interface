<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col md="10">
        <b-card class="text-center card-dark">
          <img src='../assets/logo.svg' width="100" height="100"/>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center" style="margin-top:20px;">
      <b-col md="5">
        <b-card class="card-home">
          <strong slot="header">Blocks <b-badge pill variant="dark" class="float-right"><router-link :to="{ name: 'Blocks', params: {} }">View All</router-link></b-badge></strong>
          <div v-for="(item, index) in blocks" :key="index">
            <PreviewBlock :info="item"/>
            <hr style="margin:5px 0 3px 0;">
          </div>
        </b-card>
      </b-col>
      <b-col md="5">
        <b-card class="card-home">
          <strong slot="header">Transactions <b-badge pill variant="dark" class="float-right"><router-link :to="{ name: 'Transactions', params: {type: 'latest'} }">View All</router-link></b-badge></strong>
          <div v-for="(item, index) in txns" :key="index">
            <PreviewTxn :info="item"/>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import PreviewTxn from '../components/PreviewTxn.vue'
import PreviewBlock from '../components/PreviewBlock.vue'

export default {
  name: 'Home',
  data () {
    return {
      errors: [],
      txns: [],
      blocks: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch: function () {
      axios.get('https://api1.ubiqscan.io/v2/getlatesttransactions')
        .then(response => {
          this.txns = response.data.result.slice(0, 10)
        })
        .catch(e => {
          this.errors.push(e)
        })
      axios.get('https://api1.ubiqscan.io/v2/getlatestblocks')
        .then(response => {
          this.blocks = response.data.result.slice(0, 10)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  components: {
    PreviewTxn,
    PreviewBlock
  }
}
</script>
