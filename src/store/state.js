let state = {
  latestBlock: {
    number: 0,
    miner: '',
    timestamp: 0,
    transactions: 0,
    uncles: 0
  },
  api: process.env.API_URL,
  rpc: 'https://rpc1.ubiqscan.io',
  price: {
    btc: '0',
    usd: '0',
    eur: '0'
  },
  supply: '',
  txnsCounts: {
    values: [],
    labels: []
  },
  avgGasPrice: {
    values: [],
    labels: []
  },
  gasLimit: {
    values: [],
    labels: []
  },
  difficulty: {
    values: [],
    labels: []
  },
  hashrate: {
    values: [],
    labels: []
  },
  blocktime: {
    values: [],
    labels: []
  },
  blocktime88: {
    values: [],
    labels: []
  },
  pools: {
    values: {},
    labels: []
  }
}
export default state
