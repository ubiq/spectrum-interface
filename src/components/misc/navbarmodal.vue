<template lang="html">
  <b-modal :id="id" title="Broadcast Raw Transaction" ok-only inline>
    <b-form @submit.prevent="post">
      <b-form-group id="exampleInputGroup1"
                    label="Raw txhash:"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      v-model="txhash"
                      placeholder="0x00000000000000000000000000000000000000000000">
        </b-form-input>
        <template slot="description">
          <div :style="{color: (this.status.error ? '#f13a3a': '#00ea90')}">
            {{this.status.text}}
          </div>
        </template>
      </b-form-group>
    </b-form>
    <div slot="modal-footer">
      <b-button @click="post" type="submit" style="background-color: transparent; color: #00ea90;">Submit</b-button>
    </div>
  </b-modal>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NavbarModal',
  props: ['id'],
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

<style lang="css">
</style>
