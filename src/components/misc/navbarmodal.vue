<template lang="html">
  <b-modal :id="id" title="Broadcast Raw Transaction" ok-only inline>
    <b-form @submit.prevent="post">
      <b-form-group id="exampleInputGroup1"
                    label="Raw txhash:"
                    label-for="exampleInput1"
                    :description="(this.status !== '' ?  this.status : 'Signed raw trasaction data')">
        <b-form-input id="exampleInput1"
                      v-model="txhash"
                      placeholder="0x00000000000000000000000000000000000000000000">
        </b-form-input>
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
  name: "NavbarModal",
  props: ['id'],
  data: function () {
    return {
      txhash: '',
      status: ''
    }
  },
  methods: {
    post: function () {
      let self = this
      axios.post(this.$store.state.rpc, {
        jsonrpc: '2.0',
        method: 'eth_sendRawTransaction',
        params: [
          this.hash
        ],
        id: 1
      })
      .then(function (response) {
            if (response.status === 200) {
              if (response.data.error !== "") {
                self.status = response.data.error.message
              }
              console.log(response)
              console.log(self.status)

            }
          })
    }
  }
}
</script>

<style lang="css">
</style>
