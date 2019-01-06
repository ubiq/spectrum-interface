<template lang="html">
  <b-row class="justify-content-md-center">
    <b-col md="10">
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name: 'Home'}">Home</b-breadcrumb-item>
        <b-breadcrumb-item active>Broadcast Raw Txn</b-breadcrumb-item>
      </b-breadcrumb>
      <b-card>
        <b-alert show>This page allows you to paste a Signed Raw Transaction in hex format (i.e. characters 0-9, a-f) and broadcast it over the Ubiq network.</b-alert>
        <b-form @submit.prevent="post">
          <b-form-group id="exampleInputGroup1"
                        label="Enter Txn Hex"
                        label-for="exampleInput1">
            <b-form-textarea id="exampleInput1"
                          v-model="txhash"
                          :rows="8">
            </b-form-textarea>
            <template slot="description">
              <div :style="{color: (this.status.error ? '#f13a3a': '#00ea90')}">
                {{this.status.text}}
              </div>
            </template>
          </b-form-group>
        </b-form>
        <b-row no-gutters>
          <b-button @click="post" type="submit" id="sendRawTxn">Send Transaction</b-button>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BroadcastTxn',
  data: function () {
    return {
      txhash: '',
      status: {
        error: false,
        text: ''
      }
    }
  },
  methods: {
    post: function () {
      let self = this
      axios.post(this.$store.state.rpc, {
        jsonrpc: '2.0',
        method: 'eth_sendRawTransaction',
        params: [
          this.txhash
        ],
        id: 1
      })
        .then(function (response) {
          console.log(response)
          if (response.status === 200) {
            if (response.data.error) {
              self.status.error = true
              self.status.text = response.data.error.message
            } else {
              self.status.error = false
              self.status.text = `Transaction broadcasted succesfully; hash: ${response.data.result}`
            }
            console.log(self.status)
          }
        })
    }
  }
}
</script>
