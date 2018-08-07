var BigNumber = require('bignumber.js')

module.exports = {
  baseBlockReward: function (height) {
    if (height > 2508545) {
      return new BigNumber(1000000000000000000)
    } else if (height > 2150181) {
      return new BigNumber(2000000000000000000)
    } else if (height > 1791818) {
      return new BigNumber(3000000000000000000)
    } else if (height > 1433454) {
      return new BigNumber(4000000000000000000)
    } else if (height > 1075090) {
      return new BigNumber(5000000000000000000)
    } else if (height > 716727) {
      return new BigNumber(6000000000000000000)
    } else if (height > 358363) {
      return new BigNumber(7000000000000000000)
    } else if (height > 0) {
      return new BigNumber(8000000000000000000)
    } else {
      // genesis
      return new BigNumber(0)
    }
  },

  includeUnclesReward: function (blockHeight, unclesCount) {
    var reward = new BigNumber(module.exports.baseBlockReward(blockHeight).dividedBy(32).times(unclesCount))
    if (reward > 0) {
      return reward
    } else {
      return new BigNumber(0)
    }
  },

  calculateUncleReward: function (blockNumber, uncleNumber) {
    var baseReward = module.exports.baseBlockReward(blockNumber)
    var uncleReward = (((uncleNumber + 2) - blockNumber) * baseReward) / 2
    if (uncleReward < 0) {
      return 0
    } else {
      return uncleReward
    }
  },

  calculateMintedCoins: function (blockNumber, unclesCount) {
    var baseReward = module.exports.baseBlockReward(blockNumber)
    var unclesReward = module.exports.includeUnclesReward(blockNumber, unclesCount)
    return new BigNumber(baseReward).plus(unclesReward).div(1000000000000000000).toString()
  }
}
