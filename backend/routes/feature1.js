const router = require('express').Router();
const JSONDATA = require('../data.js');

let final = [];

function calculate() {
  const resultsPerPage = 16;

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
    Read through the JSONDATA rows and increment the position of the
    violation code in the former array by 1 when a specific violation
    code occures to represent the amount of times that violation code
    is found
    */
  for (var i = 0; i < JSONDATA.length; i++) {
    var code = Number(JSONDATA[i]['Violation Code']);
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

// run it once, just so featurerepeats can access it
// after this, it will run again each time the front
// end calls this route
calculate();

router.route('/data/violationcount').get((req, res) => {
  calculate();
  res.send(final);
});

module.exports = {router, final};