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
  watch: {
    '$route' (to, from) {
      this.fetch()
    },
    latestBlock: function () {
      this.fetch()
    }
  },
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
  computed: {
    latestBlock () {
      return this.$store.state.latestBlock.number
    }
  },
  methods: {
    fetch: function () {
      axios.get(this.$store.state.api + 'latesttransactions/10')
        .then(response => {
          this.txns = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      axios.get(this.$store.state.api + 'latestblocks/10')
        .then(response => {
          this.blocks = response.data
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
