<template>
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item active>Blocks</b-breadcrumb-item>
        <b-breadcrumb-link>
          <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
        </b-breadcrumb-link>
      </b-breadcrumb>
      <BlocksTable :items="blocks" :total="total"/>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import BlocksTable from '../components/tables/Blocks.vue'

export default {
  name: 'Blocks',
  watch: {
    '$route': {
      handler: this.fetch(),
      immediate: true
    }
  },
  data () {
    return {
      refreshing: false,
      blocks: [],
      total: 0
    }
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      axios.get(this.$store.state.api + 'latestblocks/1000')
        .then(response => {
          this.blocks = response.data.blocks
          this.total = response.data.total
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
    BlocksTable
  }
}
</script>
