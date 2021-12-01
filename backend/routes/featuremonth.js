const router = require('express').Router();
const JSONDATA = require('../data');
const { updateLists, deleteLists } = require('./listWrapper');
const { searchAll } = require('./search');

let calculateFeatureMonth = 1;
let final = [];

function calculateM(DATASET) {
  // total is the max number of violations
  // final is the list of violation codes, their respective occurences and their respective percent of the total

  final = [
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
}

function update() {
  let insertedList = require('./listWrapper.js').insertLists.featuremonthList;
  let removedList = require('./listWrapper.js').deleteLists.featuremonthList;
  let oldList = require('./listWrapper.js').updateLists.featuremonthListOld;
  let newList = require('./listWrapper.js').updateLists.featuremonthListNeo;

  // update based on new rows inserted
  if (insertedList.length > 0) {
    for (var i = 0; i < insertedList.length; i++) {
      var date = insertedList[i]['Issue Date'];
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
  }

  // update based on rows that were deleted
  if (removedList.length > 0) {
    for (var i = 0; i < removedList.length; i++) {
      var date = removedList[i]['Issue Date'];
      if (date[5] == 0 && date[6] == 1) {
        final[0]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 2) {
        final[1]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 3) {
        final[2]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 4) {
        final[3]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 5) {
        final[4]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 6) {
        final[5]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 7) {
        final[6]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 8) {
        final[7]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 9) {
        final[8]['Violations'] -= 1;
      } else if (date[5] == 1 && date[6] == 0) {
        final[9]['Violations'] -= 1;
      } else if (date[5] == 1 && date[6] == 1) {
        final[10]['Violations'] -= 1;
      } else if (date[5] == 1 && date[6] == 2) {
        final[11]['Violations'] -= 1;
      } else {
        if (final[12]['Violations'] > 0) final[12]['Violations'] -= 1;
      }
    }
  }

  // update based on rows that were modified
  if (oldList.length > 0) {
    // first we remove the old entry
    for (var i = 0; i < oldList.length; i++) {
      var date = oldList[i]['Issue Date'];
      if (date[5] == 0 && date[6] == 1) {
        final[0]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 2) {
        final[1]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 3) {
        final[2]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 4) {
        final[3]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 5) {
        final[4]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 6) {
        final[5]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 7) {
        final[6]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 8) {
        final[7]['Violations'] -= 1;
      } else if (date[5] == 0 && date[6] == 9) {
        final[8]['Violations'] -= 1;
      } else if (date[5] == 1 && date[6] == 0) {
        final[9]['Violations'] -= 1;
      } else if (date[5] == 1 && date[6] == 1) {
        final[10]['Violations'] -= 1;
      } else if (date[5] == 1 && date[6] == 2) {
        final[11]['Violations'] -= 1;
      } else {
        if (final[12]['Violations'] > 0) final[12]['Violations'] -= 1;
      }
    }
    // now we add the new entry
    for (var i = 0; i < newList.length; i++) {
      var date = newList[i]['Issue Date'];
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
  }
  /*
  Read through the final array and calculate the percentages based on 
  the amount of violations certain months recieved over the total number of violations
  */
  for (var i = 0; i < final.length; i++) {
    final[i].Percentage =
      (final[i].Violations / JSONDATA.length).toFixed(3) * 100;
  }

  // now we clear the update buffers
  while (insertedList.length > 0) {
    insertedList.pop();
  }
  while (deleteLists.length > 0) {
    deleteLists.pop();
  }
  while (oldList.length > 0) {
    oldList.pop();
  }
  while (newList.length > 0) {
    newList.pop();
  }
}

router.route('/data/monthviolations').get((req, res) => {
  const terms = (req.query.terms || '').split(',');
  const DATASET = searchAll(terms);

  if (calculateFeatureMonth == 1) {
    calculateM(DATASET);
    calculateFeatureMonth = 0;
  } else {
    update();
  }
  res.send(final);
});

module.exports = { router };
