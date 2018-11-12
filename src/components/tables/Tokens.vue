<template>
  <b-row>
    <b-col md="12">
      <nav style="margin-right:-4px;">
        <b-pagination size="md" align="right" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next"/>
      </nav>
      <b-card no-body>
        <b-table class="mb-0" responsive="sm" hover stacked="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
          <div slot="address" slot-scope="data">
            <router-link :to="{ name: 'Token', params: {hash: data.value} }">{{ data.value.substr(0,17) }}...</router-link>
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
        symbol: {
          label: 'Symbol'
        },
        name: {
          label: 'Name'
        },
        decimals: {
          label: 'Decimals'
        },
        address: {
          label: 'Address'
        }
      }
    }
  },
  methods: {
    getRowCount (items) {
      return items.length
    }
  }
}
</script>
