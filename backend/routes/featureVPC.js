const router = require('express').Router();
const JSONDATA = require('../data');
const { searchAll } = require('./search');

let calculateFeatureVPC = 1;
let result = [];

function calculate(req) {
  // console.log(req);
  const terms = (req.query.terms || '').split(',');
  const DATASET = searchAll(terms);

  const allCounty = new Map();
  result = [];
  let total = 0;
  for (let i = 0; i < DATASET.length; i++) {
    let county = DATASET[i]['Violation County'];
    if (county.length != 0) {
      if (allCounty.has(county)) {
        allCounty.set(county, allCounty.get(county) + 1);
      } else {
        allCounty.set(county, 1);
      }
      total += 1;
    }
  }

  const iterator1 = allCounty[Symbol.iterator]();
  let other = { County: 'other', Violations: 0, Percentage: 0.0 };
  for (const item of iterator1) {
    if ((parseFloat(item[1]) / total).toFixed(2) <= 0.01) {
      other.Violations += item[1];
    } else {
      let line = {
        County: item[0],
        Violations: item[1],
        Percentage: (item[1] / total).toFixed(2) * 100,
      };
      result.push(line);
    }
  }
  other.Percentage = (other.Violations / total).toFixed(2) * 100;
  result.push(other);
}

// this update function only updates based on the original calculate() function.
// if the order of the top counties change, it will not be reflected until we
// restart the server
function update() {
  console.log(result);
  let insertedList = require('./listWrapper.js').insertLists.featureVPCList;
  let removedList = require('./listWrapper.js').deleteLists.featureVPCList;
  let oldList = require('./listWrapper.js').updateLists.featureVPCListOld;
  let newList = require('./listWrapper.js').updateLists.featureVPCListNeo;

  // update based in new rows inserted
  for (j = 0; j < insertedList.length; ++j) {
    for (i = 0; i < result.length; ++i) {
      if (insertedList[j]['Violation County'] == result[i]['County']) {
        result[i]['Violations']++;
        break;
      }
      if (i >= result.length - 1) result[i]['Violations']++;
    }
  }

  // update based on rows deleted
  // console.log(removedList)
  for (j = 0; j < removedList.length; ++j) {
    for (i = 0; i < result.length; ++i) {
      if (removedList[j]['Violation County'] == result[i]['County']) {
        result[i]['Violations']--;
        break;
      }
      if (i >= result.length - 1) result[i]['Violations']--;
    }
  }

  // update based on old data that was updated
  // start by removing old data
  for (j = 0; j < oldList.length; ++j) {
    for (i = 0; i < result.length; ++i) {
      if (oldList[j]['Violation County'] == result[i]['County']) {
        result[i]['Violations']--;
        break;
      }
      if (i >= result.length - 1) result[i]['Violations']--;
    }
  }
  // now we add the new versions
  for (j = 0; j < newList.length; ++j) {
    for (i = 0; i < result.length; ++i) {
      if (newList[j]['Violation County'] == result[i]['County']) {
        result[i]['Violations']++;
        break;
      }
      if (i >= result.length - 1) result[i]['Violations']++;
    }
  }

  // now we update the percentages
  for (row in result)
    row['Percentage'] = (row['Violations'] / JSONDATA.length).toFixed(2) * 100;

  // now we clear the update buffers
  while (insertedList.length > 0) {
    insertedList.pop();
  }
  while (removedList.length > 0) {
    removedList.pop();
  }
  while (oldList.length > 0) {
    oldList.pop();
  }
  while (newList.length > 0) {
    newList.pop();
  }
}

router.route('/data/violationspercounty').get((req, res) => {
  // console.log(req);
  if (calculateFeatureVPC == 1) {
    console.log('calculating featureVPC');
    calculate(req);
    calculateFeatureVPC = 0;
  } else {
    console.log('recalculating featureVPC');
    update();
  }

  res.send(result);
});

module.exports = { router };
