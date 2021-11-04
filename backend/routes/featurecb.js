const router = require('express').Router();
const { searchAll } = require('./search');

const queryFilter = /([A-Za-z0-9\s]+)(<|>|==|<=|>=|~)([A-Za-z0-9\*]+)/;

router.route('/data/carbrandviolations').get((req, res) => {
  //////////////////////////////////////////////////////////////////
  // Start of Code
  //////////////////////////////////////////////////////////////////
  const terms = (req.query.terms || '').split(',');
  const DATASET = searchAll(terms);

  // total is the max number of violations
  // final is the list of car brands, their respective occurences and their respective percent of the total
  var total = 0;
  let final = [];

  /*
    Read through the DATASET array and save the Vehicle make aka Car brand
    as a seperate variable. Then read through the array (called final) which stores all the
    car brands, their respective occurences, and their percentages. If the stored car brand is 
    found in the final array, then simply increment its occurences by 1, otherwise 
    add it as a new entry to the final array.
    */
  for (var i = 0; i < DATASET.length; i++) {
    //var line = {"CarBrand": 0, "Occurences": 0, "Percentage": 0.0};
    var code = DATASET[i]['Vehicle Make'];
    var found = false;
    if (final.length > 0) {
      for (var j = 0; j < final.length; j++) {
        if (final[j].CarBrand == code) {
          final[j].Occurences += 1;
          found = true;
          break;
        }
      }
    }
    var line = { CarBrand: code, Occurences: 1, Percentage: 0.0 };
    if (!found) {
      final.push(line);
    }
    total++;
  }

  // Testing variable to see total percentage
  //var totalp = 0;

  /*
    Read through the final array and calculate the percentages based on 
    the amount of violations certain car brands recieved over the total number of violations
  */
  var otherline = { CarBrand: 'Other', Occurences: 0, Percentage: 0.0 };
  for (var i = 0; i < final.length; i++) {
    final[i].Percentage = parseFloat(
      ((final[i].Occurences / total) * 100).toFixed(3)
    );

    if (final[i].Percentage < 0.5) {
      otherline.Occurences += final[i].Occurences;
      final.splice(i, 1);
      i--;
    }
    //totalp += final[i].Percentage;
  }

  otherline.Percentage = (otherline.Occurences / total) * 100;
  final.push(otherline);
  //console.log(totalp);

  //////////////////////////////////////////////////////////////////

  res.send(final);
});

module.exports = router;
