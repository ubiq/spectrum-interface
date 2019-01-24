<template>
  <b-row>
    <b-col md="12">
      <nav style="margin-right:-4px;">
        <b-pagination size="md" align="right" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next"/>
      </nav>
      <b-card no-body>
        <b-table @row-hovered="dbg" class="mb-0" responsive="sm" stacked="sm" hover striped :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
          <div slot="number" slot-scope="data">
            <router-link :to="{ name: 'Block', params: {number: data.value} }">{{ data.value }}</router-link>
          </div>
          <div slot="timestamp" slot-scope="data">
            ~{{ calcTime(data.value) }}
          </div>
          <div slot="miner" slot-scope="data">
            <router-link :to="{ name: 'Address', params: {hash: data.value} }">{{ getAddressTag(data.value) }}</router-link>
          </div>
          <div slot="blockReward" slot-scope="data">
            {{ fromWei(data.value) }} UBQ
          </div>
          <div slot="row-details" slot-scope="data">
            <div class="nested-col-grid">
              <div class="">
                  <span class="code">Hash: {{ data.item.hash }}</span>
                  <br>
                  <span class="code">Miner:</span> <router-link :to="{ name: 'Address', params: {hash: data.item.miner} }">{{ getAddressTag(data.item.miner) }}</router-link>
                  <br>
                  <span class="code">Nonce: {{ data.item.nonce }}</span>
              </div>
              <div class="">
                  <span class="code">Canonical chain hash:</span><router-link :to="{ name: 'Block', params: {number: data.item.canonicalblock.hash} }">{{ data.item.canonicalblock.hash }}</router-link>
                  <br>
                  <span class="code">Miner:</span> <router-link :to="{ name: 'Address', params: {hash: data.item.canonicalblock.miner} }">{{getAddressTag(data.item.canonicalblock.miner)}}</router-link>
                  <br>
                  <span class="code">Nonce: {{data.item.canonicalblock.nonce}}</span>
                </div>
            </div>
          </div>
          <div slot="showDetails" slot-scope="data">
            <b-button size="sm" @click.stop="fetchBlock(data)" class="mr-2">
              {{ data.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
          </div>
        </b-table>
      </b-card>
      <nav style="margin-right:-4px;margin-top:15px;">
        <b-pagination size="md" align="right" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next"/>
      </nav>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import common from '../../scripts/common'
import addresses from '../../scripts/addresses'
export default {
  props: {
    items: {
      type: Array
    }
  },
  data: () => {
    return {
      currentPage: 1,
      perPage: 25,
      totalRows: 0,
      fields: {
        number: {
          label: 'Height'
        },
        timestamp: {
          label: 'Age'
        },
        transactions: {
          label: 'Txns'
        },
        uncles: {
          label: 'Uncles'
        },
        gasLimit: {
          label: 'GasLimit'
        },
        blockReward: {
          label: 'Reward'
        },
        showDetails: {
          label: ''
        }
      }
    }
  },
  methods: {
    dbg (i, idx, e) {
      console.log(i, idx, e)
    },
    fetchBlock (data) {
      console.log(data)
      if (data.item.canonicalblock === undefined) {
        axios.get(this.$store.state.api + `block/${data.item.number}`)
          .then(response => {
            data.item.canonicalblock = response.data
            data.toggleDetails()
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        data.toggleDetails()
      }
    },
    getRowCount (items) {
      return items.length
    },
    fromWei (value) {
      return common.fromWei(value)
    },
    getAddressTag (hash) {
      return addresses.getAddressTag(hash) || hash.substring(0, 17) + '...'
    },
    toTH (diff) {
      return common.toTH(diff, 3) + ' TH'
    },
    calcTime (timestamp) {
      return this.$moment().to(timestamp * 1000)
    }
  }
}
</script>
