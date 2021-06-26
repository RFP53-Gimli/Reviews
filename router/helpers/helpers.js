
let helpers = {};

helpers.appendRatings = (data) => {
  let obj = {};

  data.forEach((result, index) => {
    if (result.rating !== null) {
      obj[result.rating] = result.count;
    }
  })

  return obj
}

helpers.appendCharacteristics = (data) => {
  let obj = {};

  data.forEach((result, index) => {
    obj[result.name] = {
      value: result.avg
    }

  })

  return obj
}

module.exports = helpers;