<template>
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item active>Node Map</b-breadcrumb-item>
      </b-breadcrumb>
      <b-alert show>This page does not represent the entire state of the Ubiq network, only nodes that have connected to ubiqscan are displayed.</b-alert>
      <b-row class="justify-content-md-center">
        <b-col md="3">
          <b-card>
            <div slot="header">
              Nodes <b-badge>{{data.length}}</b-badge>
            </div>
            <b-list-group>
              <b-list-group-item v-for="v in this.stats" :key="v[0]" class="d-flex justify-content-between align-items-center">
                <span>{{v[0]}}</span>
                <b-badge variant="primary" pill>{{v[1]}}</b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
        <b-col md="9">
          <b-card header="Node Map">
            <nodemap :locations="data"></nodemap>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import map from '../components/maps/Nodemap'
import axios from 'axios'

export default {
  name: 'Map',
  components: {
    nodemap: map
  },
  data () {
    return {
      data: [],
      stats: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch: function () {
      axios.get(this.$store.state.api + 'geodata')
        .then(response => {
          let i
          let stats = {}
          for (i = 0; i < response.data.length; i++) {
            let country = response.data[i]['city'][1]
            if (country !== '') {
              if (!stats[country]) {
                stats[country] = 1
              } else {
                stats[country]++
              }
            }
          }

          for (var c in stats) {
            this.stats.push([c, stats[c]])
          }

          this.stats.sort(function (a, b) {
            return b[1] - a[1]
          })

          this.stats = this.stats.slice(0, 11)

          this.data = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
