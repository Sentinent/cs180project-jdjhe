const router = require('express').Router();
const JSONDATA = require('../data.js');

router.route('/data/monthviolations').get((req, res) => {
  const resultsPerPage = 16;

  //////////////////////////////////////////////////////////////////
  // Start of Code
  //////////////////////////////////////////////////////////////////

  // total is the max number of violations
  // final is the list of violation codes, their respective occurences and their respective percent of the total
  var total = 0;
  let final = [];

  /*
    Check to see which month the violation occured and then add it to its respective
    violation count
  */
  for (var i = 0; i < JSONDATA.length; i++) {
    var date = JSONDATA[i]['Issue Date'];
    if (date[5] == 0 && date[6] == 1) {
      code = 'January';
    } else if (date[5] == 0 && date[6] == 2) {
      code = 'February';
    } else if (date[5] == 0 && date[6] == 3) {
      code = 'March';
    } else if (date[5] == 0 && date[6] == 4) {
      code = 'April';
    } else if (date[5] == 0 && date[6] == 5) {
      code = 'May';
    } else if (date[5] == 0 && date[6] == 6) {
      code = 'June';
    } else if (date[5] == 0 && date[6] == 7) {
      code = 'July';
    } else if (date[5] == 0 && date[6] == 8) {
      code = 'August';
    } else if (date[5] == 0 && date[6] == 9) {
      code = 'September';
    } else if (date[5] == 1 && date[6] == 0) {
      code = 'October';
    } else if (date[5] == 1 && date[6] == 1) {
      code = 'November';
    } else if (date[5] == 1 && date[6] == 2) {
      code = 'December';
    } else {
      code = "Unknown";
    }
    var found = false;
    if (final.length > 0) {
      for (var j = 0; j < final.length; j++) {
        if (final[j].Month == code) {
          final[j].Violations += 1;
          found = true;
          break;
        }
      }
    }
    var line = { Month: code, Violations: 1, Percentage: 0.0 };
    if (!found) {
      final.push(line);
    }
    total++;
  }

  // Testing variable to check the percentages
  //var totalp = 0;

  /*
    Read through the final array and calculate the percentages based on 
    the amount of violations certain months recieved over the total number of violations
    */
  for (var i = 0; i < final.length; i++) {
    final[i].Percentage = parseFloat(((final[i].Violations / total) * 100).toFixed(3));
    //totalp += final[i].Percentage;
  }
  //console.log(totalp);
  //////////////////////////////////////////////////////////////////

  res.send(final);
});

module.exports = router;
