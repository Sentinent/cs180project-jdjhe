const router = require('express').Router();
const { searchAll } = require('./search');
const JSONDATA = require('../data.js');
let RecalculateFeature1 = 1;
let final = [];

function calculate(DATASET) {
  //////////////////////////////////////////////////////////////////
  // Start of Code
  //////////////////////////////////////////////////////////////////

  // Create a Fixed array of size 99 for all 99 types of violations
  let violationCounts = new Array(100);
  if (Object.seal) {
    violationCounts.fill(0);
  }
  Object.seal(violationCounts);
  // total is the max number of violations
  // final is the list of violation codes, their respective occurences and their respective percent of the total
  var total = 0;

  /*
    Read through the DATASET rows and increment the position of the
    violation code in the former array by 1 when a specific violation
    code occures to represent the amount of times that violation code
    is found
    */
  for (var i = 0; i < DATASET.length; i++) {
    var code = Number(DATASET[i]['Violation Code']);
    violationCounts[code] += 1;
    total++;
  }

  //var totalp = 0;

  /*
    Calculate the percent of the violation based on its occurences over the total amount
    of violations. Then store the values in the line and store the line in the final list, then 
    keep repeating until all the violation codes has been reached
    */
  for (var i = 1; i < violationCounts.length; i++) {
    var percent = parseFloat(((violationCounts[i] / total) * 100).toFixed(3));

    //totalp += percent;
    // A line to represent the values needed to be returned and stored in the final result
    var line = {
      ViolationCode: i,
      Occurences: violationCounts[i],
      Percentage: percent,
    };

    final.push(line);
  }
  //console.log(totalp);
  //////////////////////////////////////////////////////////////////
}

router.route('/data/violationcount').get((req, res) => {
  const terms = (req.query.terms || '').split(',');
  const DATASET = searchAll(terms);

  if (RecalculateFeature1 == 1) {
    console.log("recalculating feature 1");
    calculate(DATASET);
    RecalculateFeature1 = 0;
  }

  res.send(final);
});

module.exports = { router, final, calculate, RecalculateFeature1 };
