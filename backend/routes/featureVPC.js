const router = require('express').Router();
const { searchAll } = require('./search');

let RecalculateFeatureVPC = 1;
let result = [];

function calculate(req) {
  const terms = (req.query.terms || '').split(',');
  const DATASET = searchAll(terms);

  const allCounty = new Map();
  const result = [];
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

router.route('/data/violationspercounty').get((req, res) => {
  if (RecalculateFeatureVPC == 1) {
    console.log("recalculating featureVPC");
    calculate(req);
    RecalculateFeatureVPC = 0;
  }

  res.send(result);
});

module.exports = {router, RecalculateFeatureVPC};
