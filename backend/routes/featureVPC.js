const router = require('express').Router();
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

function update() {
  let insertedList = require('./listWrapper.js').insertLists.featureVPCList;
  let removedList = require('./listWrapper.js').deleteLists.featureVPCList; 
  let oldList = require('./listWrapper.js').updateLists.featureVPCListOld;
  let newList = require('./listWrapper.js').updateLists.featureVPCListNeo;
}

router.route('/data/violationspercounty').get((req, res) => {
  // console.log(req);
  if (calculateFeatureVPC == 1) {
    console.log("recalculating featureVPC");
    calculate(req);
    calculateFeatureVPC = 0;
  } else {
    update();
  }

  res.send(result);
});

module.exports = {router};
