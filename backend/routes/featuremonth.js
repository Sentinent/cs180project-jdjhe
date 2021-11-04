const router = require('express').Router();
const { searchAll } = require('./search');

router.route('/data/monthviolations').get((req, res) => {
  //////////////////////////////////////////////////////////////////
  // Start of Code
  //////////////////////////////////////////////////////////////////
  const terms = (req.query.terms || '').split(',');
  const DATASET = searchAll(terms);

  // total is the max number of violations
  // final is the list of violation codes, their respective occurences and their respective percent of the total

  const final = [
    { Month: 'January', Violations: 0, Percentage: 0 },
    { Month: 'February', Violations: 0, Percentage: 0 },
    { Month: 'March', Violations: 0, Percentage: 0 },
    { Month: 'April', Violations: 0, Percentage: 0 },
    { Month: 'May', Violations: 0, Percentage: 0 },
    { Month: 'June', Violations: 0, Percentage: 0 },
    { Month: 'July', Violations: 0, Percentage: 0 },
    { Month: 'August', Violations: 0, Percentage: 0 },
    { Month: 'September', Violations: 0, Percentage: 0 },
    { Month: 'October', Violations: 0, Percentage: 0 },
    { Month: 'November', Violations: 0, Percentage: 0 },
    { Month: 'December', Violations: 0, Percentage: 0 },
    { Month: 'Unknown', Violations: 0, Percentage: 0 },
  ];

  /*
    Check to see which month the violation occured and then add it to its respective
    violation count
  */
  for (var i = 0; i < DATASET.length; i++) {
    var date = DATASET[i]['Issue Date'];
    if (date[5] == 0 && date[6] == 1) {
      final[0]['Violations'] += 1;
    } else if (date[5] == 0 && date[6] == 2) {
      final[1]['Violations'] += 1;
    } else if (date[5] == 0 && date[6] == 3) {
      final[2]['Violations'] += 1;
    } else if (date[5] == 0 && date[6] == 4) {
      final[3]['Violations'] += 1;
    } else if (date[5] == 0 && date[6] == 5) {
      final[4]['Violations'] += 1;
    } else if (date[5] == 0 && date[6] == 6) {
      final[5]['Violations'] += 1;
    } else if (date[5] == 0 && date[6] == 7) {
      final[6]['Violations'] += 1;
    } else if (date[5] == 0 && date[6] == 8) {
      final[7]['Violations'] += 1;
    } else if (date[5] == 0 && date[6] == 9) {
      final[8]['Violations'] += 1;
    } else if (date[5] == 1 && date[6] == 0) {
      final[9]['Violations'] += 1;
    } else if (date[5] == 1 && date[6] == 1) {
      final[10]['Violations'] += 1;
    } else if (date[5] == 1 && date[6] == 2) {
      final[11]['Violations'] += 1;
    } else {
      final[12]['Violations'] += 1;
    }
  }
  // Testing variable to check the percentages
  //var totalp = 0;

  /*
    Read through the final array and calculate the percentages based on 
    the amount of violations certain months recieved over the total number of violations
    */
  for (var i = 0; i < final.length; i++) {
    final[i].Percentage =
      (final[i].Violations / DATASET.length).toFixed(3) * 100;
    //totalp += final[i].Percentage;
  }
  //console.log(totalp);
  //////////////////////////////////////////////////////////////////
  res.send(final);
});

module.exports = router;
