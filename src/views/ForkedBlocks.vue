<template>
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item active>Forked Blocks (Reorgs)</b-breadcrumb-item>
        <b-breadcrumb-link>
          <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
        </b-breadcrumb-link>
      </b-breadcrumb>
      <ForkedBlocksTable :items="blocks"/>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import ForkedBlocksTable from '../components/tables/ForkedBlocks.vue'

export default {
  name: 'ForkedBlocks',
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
      blocks: []
    }
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      axios.get(this.$store.state.api + 'latestforkedblocks/1000')
        .then(response => {
          this.blocks = response.data
          let self = this
          setTimeout(function () {
            self.refreshing = false
          }, 2000)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  components: {
    ForkedBlocksTable
  }
}
</script>
