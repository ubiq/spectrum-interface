var BigNumber = require('bignumber.js')

module.exports = {
  fromWei: function (value) {
    return new BigNumber(value).div(1000000000000000000).toString()
  },
  fromWeiToGwei: function (value) {
    return new BigNumber(value).div(1000000000).toString()
  }
}
