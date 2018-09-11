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
    data: [],
    labels: []
  }
}
export default state
