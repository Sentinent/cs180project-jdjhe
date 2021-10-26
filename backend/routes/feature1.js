const router = require('express').Router();

const queryFilter = /([A-Za-z0-9\s]+)(<|>|==|<=|>=|~)([A-Za-z0-9\*]+)/;

router.route('/').get((req, res) => {
  console.log('found server');
  res.send('you have reached the backend');
});

router.route('/data/violationcount').get((req, res) => {
  let JSONDATA = require('../server.js');
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
  let final = [];

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
  for (var i = 0; i < violationCounts.length; i++) {
    var percent = violationCounts[i] / total;
    //totalp += percent;
    // A line to represent the values needed to be returned and stored in the final result
    var line = {
      ViolationCode: i + 1,
      Occurences: violationCounts[i],
      Percentage: percent,
    };
    /*
        line[0].ViolationCode = i + 1;
        line[0].Occurences = violationCounts[i];
        line[0].Percentage = percent;
        */
    final.push(line);
  }
  //console.log(totalp);
  //////////////////////////////////////////////////////////////////

  res.send(final);
});

module.exports = router;
