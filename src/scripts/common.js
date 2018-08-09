var BigNumber = require('bignumber.js')
var utf8 = require('utf8');

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
  toUtf8: function (hex) {
    var str = "";
    var i = 0, l = hex.length;
    if (hex.substring(0, 2) === '0x') {
        i = 2;
    }
    for (; i < l; i+=2) {
        var code = parseInt(hex.substr(i, 2), 16);
        if (code === 0)
            break;
        str += String.fromCharCode(code);
    }
    try {
      return utf8.decode(str);
    } catch (err) {
      return null;
    }
  },
  toAscii (hex) {
    var str = "";
    var i = 0, l = hex.length;
    if (hex.substring(0, 2) === '0x') {
        i = 2;
    }
    for (; i < l; i+=2) {
        var code = parseInt(hex.substr(i, 2), 16);
        str += String.fromCharCode(code);
    }

    return str;
  }
}
