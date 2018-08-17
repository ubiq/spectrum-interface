let state = {
  latestBlock: {
    number: 0,
    miner: '',
    timestamp: 0,
    transactions: 0,
    uncles: 0
  },
  api: 'http://127.0.0.1:3000/',
  rpc: 'https://rpc1.ubiqscan.io',
  price: {
    btc: '0',
    usd: '0',
    eur: '0'
  }
}
export default state
