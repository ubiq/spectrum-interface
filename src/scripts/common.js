var BigNumber = require('bignumber.js')
var utf8 = require('utf8')

module.exports = {
  fromWei: function (value) {
    return new BigNumber(value).div(1000000000000000000).toString()
  },
  fromWeiToGwei: function (value) {
    return new BigNumber(value).div(1000000000).toString()
  },
  calcTxFee: function (gasUsed, gasPrice) {
    return new BigNumber(gasUsed).times(gasPrice).toString()
  },
  addTxFees: function (reward, txFees) {
    return new BigNumber(reward).plus(txFees).toString()
  },
  hexToDecimal: function (hex) {
    return new BigNumber(hex.substring(2), 16).toString()
  },
  mulFiat: function (a, b) {
    return new BigNumber(a).times(b).toFixed(2).toString()
  },
  toUtf8: function (hex) {
    if (hex) {
      var str = ''
      var i = 0
      var l = hex.length
      if (hex.substring(0, 2) === '0x') {
        i = 2
      }
      for (; i < l; i += 2) {
        var code = parseInt(hex.substr(i, 2), 16)
        if (code === 0) {
          break
        }
        str += String.fromCharCode(code)
      }
      try {
        return utf8.decode(str)
      } catch (err) {
        return null
      }
    } else {
      return null
    }
  },
  toAscii (hex) {
    if (hex) {
      var str = ''
      var i = 0
      var l = hex.length
      if (hex.substring(0, 2) === '0x') {
        i = 2
      }
      for (; i < l; i += 2) {
        var code = parseInt(hex.substr(i, 2), 16)
        str += String.fromCharCode(code)
      }

      return str
    } else {
      return null
    }
  },
  toTH (diff, decimals) {
    return new BigNumber(diff).div(1000000000000).toFixed(decimals).toString()
  }
}
