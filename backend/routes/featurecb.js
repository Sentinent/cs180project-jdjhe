const router = require('express').Router();
const { searchAll } = require('./search');
const { performance } = require('perf_hooks');
let RecalculateFeatureCarBrand = 1;
let initialCalculate = 1;

const queryFilter = /([A-Za-z0-9\s]+)(<|>|==|<=|>=|~)([A-Za-z0-9\*]+)/;

let final = [];
var total = 0;

function calculateCB(DATASET) {
  // total is the max number of violations
  // final is the list of car brands, their respective occurences and their respective percent of the total
  total = 0;
  final = [];

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
}

//////////////////////////////////////////
// If items were added
function updateInsert(DATASET, insertedList) {
  // start time
  var startTime = performance.now();

  for (var i = 0; i < insertedList.length; i++) {
    var code = Number(insertedList[i]['Vehicle Make']);

    for (var a = 0; a < final.length; a++) {
      if (code == final[a].CarBrand) {
        final[a].Occurences += 1;
        total++;
        break;
      }
    }
  }

  // Empty the inserted list
  while (insertedList.length > 0) {
    insertedList.pop();
  }

  // Readjust all the percentages
  for (var i = 1; i < final.length; i++) {
    var percent = parseFloat(((final[i].Occurences / total) * 100).toFixed(3));

    final[i].Percentage = percent;
  }

  var endTime = performance.now();
  console.log('Car Brand Update calculation time: ' + (endTime - startTime));
}

/////////////////////////////////////////////////////////
// If items were deleted
function updateDelete(DATASET, removedList) {
  // start time
  var startTime = performance.now();

  for (var i = 0; i < removedList.length; i++) {
    var code = Number(removedList[i]['Vehicle Make']);

    for (var a = 0; a < final.length; a++) {
      if (code == final[a].CarBrand) {
        final[a].Occurences -= 1;
        total--;
        break;
      }
    }
  }

  // Empty the deleted list
  while (removedList.length > 0) {
    removedList.pop();
  }

  // Readjust all the percentages
  for (var i = 1; i < final.length; i++) {
    var percent = parseFloat(((final[i].Occurences / total) * 100).toFixed(3));

    final[i].Percentage = percent;
  }

  var endTime = performance.now();
  console.log('Car Brand Update calculation time: ' + (endTime - startTime));
}

/////////////////////////////////////////////////
// If items were updated
function updateEdit(DATASET, oldList, newList) {
  // start time
  var startTime = performance.now();

  // Reduce violation codes of original data
  for (var i = 0; i < oldList.length; i++) {
    var code = Number(oldList[i]['Vehicle Make']);

    for (var a = 0; a < final.length; a++) {
      if (code == final[a].CarBrand) {
        final[a].Occurences -= 1;
        total--;
        break;
      }
    }
  }

  // Increase violations for new data
  for (var i = 0; i < newList.length; i++) {
    var code = Number(newList[i]['Vehicle Make']);

    for (var a = 0; a < final.length; a++) {
      if (code == final[a].CarBrand) {
        final[a].Occurences += 1;
        total++;
        break;
      }
    }
  }

  //Empty the updated lists
  while (oldList.length > 0) {
    oldList.pop();
  }
  while (newList.length > 0) {
    newList.pop();
  }

  // Readjust all the percentages
  for (var i = 1; i < final.length; i++) {
    var percent = parseFloat(((final[i].Occurences / total) * 100).toFixed(3));

    final[i].Percentage = percent;
  }

  var endTime = performance.now();
  console.log('Car Brand Update calculation time: ' + (endTime - startTime));
}

router.route('/data/carbrandviolations').get((req, res) => {
  const terms = (req.query.terms || '').split(',');
  const DATASET = searchAll(terms);

  if (initialCalculate != 1) {
    let insertedList = require('./listWrapper.js').insertLists.featurecbList;
    let removedList = require('./listWrapper.js').deleteLists.featurecbList;
    let oldList = require('./listWrapper.js').updateLists.featurecbListOld;
    let newList = require('./listWrapper.js').updateLists.featurecbListNeo;

    if (insertedList.length > 0) {
      updateInsert(DATASET, insertedList);
    }
    if (oldList.length > 0 && newList.length > 0) {
      updateEdit(DATASET, oldList, newList);
    }
    if (removedList.length > 0) {
      updateDelete(DATASET, removedList);
    }
  }
  if (initialCalculate == 1) {
    calculateCB(DATASET);
    initialCalculate = 0;
  }

  res.send(final);
});

module.exports = { router, RecalculateFeatureCarBrand };
