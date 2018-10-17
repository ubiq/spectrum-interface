<template>
<b-card>
  <b-row class="justify-content-md-center">
    <b-col md="2">
      <h5>Nodes <small>{{data.length}}</small></h5>
      <b-list-group>
        <b-list-group-item v-for="v in this.stats" :key="v[0]" class="d-flex justify-content-between align-items-center">
          <span>{{v[0]}}</span>
          <b-badge variant="primary" pill>{{v[1]}}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col md="8" offset-md="2">
      <nodemap :locations="data"></nodemap>
    </b-col>
  </b-row>
</b-card>
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
