const router = require('express').Router();
const { searchAll } = require('./search');
const { performance } = require('perf_hooks');
const JSONDATA = require('../data.js');
let RecalculateFeature1 = 1;
let initialCalculate = 1;
let final = [];
var total = 0;

function calculate(DATASET) {
  //////////////////////////////////////////////////////////////////
  // Start of Code
  //////////////////////////////////////////////////////////////////
  final = [];

  // Create a Fixed array of size 99 for all 99 types of violations
  let violationCounts = new Array(100);
  if (Object.seal) {
    violationCounts.fill(0);
  }
  Object.seal(violationCounts);
  // total is the max number of violations
  // final is the list of violation codes, their respective occurences and their respective percent of the total
  total = 0;

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

calculate(JSONDATA);

// If an item was added
function updateInsert(DATASET, insertedList) {
  // start time
  var startTime = performance.now();

  for (var i = 0; i < insertedList.length; i++) {
    var code = Number(insertedList[i]['Violation Code']);

    for (var a = 0; a < final.length; a++) {
      if (code == final[a].ViolationCode) {
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
  console.log('Feature1 Update calculation time: ' + (endTime - startTime));
}

// If items were deleted
function updateDelete(DATASET, removedList) {
  // start time
  var startTime = performance.now();

  for (var i = 0; i < removedList.length; i++) {
    var code = Number(removedList[i]['Violation Code']);

    for (var a = 0; a < final.length; a++) {
      if (code == final[a].ViolationCode) {
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
  console.log('Feature1 Update calculation time: ' + (endTime - startTime));
}

// If items were updated
function updateEdit(DATASET, oldList, newList) {
  // start time
  var startTime = performance.now();

  // Reduce violation codes of original data
  for (var i = 0; i < oldList.length; i++) {
    var code = Number(oldList[i]['Violation Code']);

    for (var a = 0; a < final.length; a++) {
      if (code == final[a].ViolationCode) {
        final[a].Occurences -= 1;
        total--;
        break;
      }
    }
  }

  // Increase violations for new data
  for (var i = 0; i < newList.length; i++) {
    var code = Number(newList[i]['Violation Code']);

    for (var a = 0; a < final.length; a++) {
      if (code == final[a].ViolationCode) {
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
  console.log('Feature1 Update calculation time: ' + (endTime - startTime));
}

router.route('/data/violationcount').get((req, res) => {
  const terms = (req.query.terms || '').split(',');
  const DATASET = searchAll(terms);

  if (initialCalculate != 1) {
    let insertedList = require('./listWrapper.js').insertLists.feature1List;
    let removedList = require('./listWrapper.js').deleteLists.feature1List;
    let oldList = require('./listWrapper.js').updateLists.feature1ListOld;
    let newList = require('./listWrapper.js').updateLists.feature1ListNeo;

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
    calculate(DATASET);
    initialCalculate = 0;
  }

  res.send(final);
});

module.exports = { router, final, calculate, RecalculateFeature1 };
