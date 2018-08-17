import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    latestBlockInstance (state, payload) {
      // console.log('blockNumberInstance mutation being executed', payload)
      state.latestBlock = payload
    },
    priceInstance (state, payload) {
      console.log('priceInstance mutation being executed', payload)
      state.price = payload
    }
  },
  actions: {
    setLatestBlock ({commit}, payload) {
      // console.log('setBlockNumber action being executed')
      commit('latestBlockInstance', payload)
    },
    setPrice ({commit}, payload) {
      console.log('setPrice action being executed')
      commit('priceInstance', payload)
    }
  }
})
