const mathHelper = {
  getPercentageValue: (value, percentage, roundOf) => {
    return Math.round((percentage/100)*value*10*roundOf)/(10*roundOf)
  },
  multiply: (value1, value2, roundOf) => {
    return Math.round(value1 * value2 * 10 * roundOf)/(10*roundOf)
  },
  divide: (value1, value2, roundOf)  => {
    return Math.round((value1 / value2) * 10 * roundOf)/(10*roundOf)
  }
}

module.exports = mathHelper
