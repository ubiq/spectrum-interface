<template>
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item active>Uncles</b-breadcrumb-item>
        <b-breadcrumb-link>
          <b-button :class="{fa: true, 'fa-refresh': true, 'fa-spin': refreshing, 'btn-breadcrumb': true}" v-on:click="fetch()"/>
        </b-breadcrumb-link>
      </b-breadcrumb>
      <UnclesTable :items="uncles"/>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import UnclesTable from '../components/tables/Uncles.vue'

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
      uncles: [],
      total: 0
    }
  },
  methods: {
    fetch: function () {
      this.refreshing = true
      axios.get(this.$store.state.api + 'latestuncles/1000')
        .then(response => {
          this.uncles = response.data.uncles
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
    UnclesTable
  }
}
</script>
