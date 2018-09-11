import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    latestBlockInstance (state, payload) {
      state.latestBlock = payload
    },
    priceInstance (state, payload) {
      state.price = payload
    },
    supplyInstance (state, payload) {
      state.supply = payload
    },
    txnsCountInstance (state, payload) {
      state.txnsCounts.data = payload.data
      state.txnsCounts.labels = payload.labels
    }
  },
  actions: {
    setLatestBlock ({commit}, payload) {
      commit('latestBlockInstance', payload)
    },
    setPrice ({commit}, payload) {
      commit('priceInstance', payload)
    },
    setSupply ({commit}, payload) {
      commit('supplyInstance', payload)
    },
    setTxnsCount ({commit}, payload) {
      commit('txnsCountInstance', payload)
    }
  }
})
