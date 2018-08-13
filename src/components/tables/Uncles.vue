<template>
  <b-row>
    <b-col md="12">
      <nav style="margin-right:-4px;">
        <b-pagination size="md" align="right" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next"/>
      </nav>
      <b-card no-body>
        <b-table class="mb-0" responsive="sm" hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
          <div slot="blockNumber" slot-scope="data">
            <router-link :to="{ name: 'Block', params: {number: data.value} }">{{ data.value }}</router-link>
          </div>
          <div slot="number" slot-scope="data">
            <router-link :to="{ name: 'Uncle', params: {hash: data.item.hash} }">{{ data.value }}</router-link>
          </div>
          <div slot="timestamp" slot-scope="data">
            ~{{ calcTime(data.value)}}
          </div>
          <div slot="miner" slot-scope="data">
            <router-link :to="{ name: 'Address', params: {hash: data.value} }">{{ getAddressTag(data.value) }}</router-link>
          </div>
          <div slot="reward" slot-scope="data">
            {{ fromWei(data.value) }} UBQ
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
        blockNumber: {
          label: 'Block Height'
        },
        number: {
          label: 'Uncle Number'
        },
        timestamp: {
          label: 'Age'
        },
        miner: {
          label: 'Miner'
        },
        reward: {
          label: 'Reward'
        }
      }
    }
  },
  methods: {
    getRowCount (items) {
      return items.length
    },
    fromWei (value) {
      return common.fromWei(value)
    },
    getAddressTag (hash) {
      return addresses.getAddressTag(hash) || hash.substring(0, 17) + '...'
    },
    calcTime (timestamp) {
      return this.$moment().to(timestamp * 1000)
    }
  }
}
</script>
