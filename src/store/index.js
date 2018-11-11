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
      state.txnsCounts.values = payload.values
      state.txnsCounts.labels = payload.labels
    },
    avgGasPriceInstance (state, payload) {
      state.avgGasPrice.values = payload.values
      state.avgGasPrice.labels = payload.labels
    },
    gasLimitInstance (state, payload) {
      state.gasLimit.values = payload.values
      state.gasLimit.labels = payload.labels
    },
    difficultyInstance (state, payload) {
      state.difficulty.values = payload.values
      state.difficulty.labels = payload.labels
    },
    hashrateInstance (state, payload) {
      state.hashrate.values = payload.values
      state.hashrate.labels = payload.labels
    },
    blocktimeInstance (state, payload) {
      state.blocktime.values = payload.values
      state.blocktime.labels = payload.labels
    },
    blocktime88Instance (state, payload) {
      state.blocktime88.values = payload.values
      state.blocktime88.labels = payload.labels
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
    },
    setAvgGasPrice ({commit}, payload) {
      commit('avgGasPriceInstance', payload)
    },
    setGasLimit ({commit}, payload) {
      commit('gasLimitInstance', payload)
    },
    setDifficulty ({commit}, payload) {
      commit('difficultyInstance', payload)
    },
    setHashrate ({commit}, payload) {
      commit('hashrateInstance', payload)
    },
    setBlocktime ({commit}, payload) {
      commit('blocktimeInstance', payload)
    },
    setBlocktime88 ({commit}, payload) {
      commit('blocktime88Instance', payload)
    }
  }
})
