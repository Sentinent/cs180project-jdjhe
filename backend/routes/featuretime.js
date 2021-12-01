const router = require('express').Router();
const { performance } = require('perf_hooks');
const { searchAll, searchAllArray } = require('./search');

// final is the list of violation codes, their respective occurences and their respective percent of the total
let final = [];

function calculate(req) {
  //////////////////////////////////////////////////////////////////
  // Start of Code
  //////////////////////////////////////////////////////////////////
  const terms = (req.query.terms || '').split(',');
  const DATASET = searchAll(terms);
  final = [];

  // total is the max number of violations
  var total = 0;

  /*
    Find the correct time the violation occured, putting any unknown time in a
    variable called unknown, and then add their respective count of violations in
    a list
    */
  for (var i = 0; i < DATASET.length; i++) {
    var time = DATASET[i]['Violation Time'];
    if (
      time.length > 5 ||
      (Number(time[1]) == 0 && Number(time[0]) != 1) ||
      (Number(time[0]) != 0 && Number(time[0]) != 1) ||
      (Number(time[0]) == 1 && Number(time[1]) > 2)
    ) {
      code = 'Unknown Time';
    } else {
      code = time[0] + time[1] + time[4] + 'M';
    }
    var found = false;
    for (var j = 0; j < final.length; j++) {
      if (final[j].Time == code) {
        final[j].Violations += 1;
        found = true;
        break;
      }
    }

    var line = { Time: code, Violations: 1, Percentage: 0.0 };
    if (!found) {
      final.push(line);
    }
    total++;
  }

  // Testing variable to check the percentages
  //var totalp = 0;

  /*
    Read through the final array and calculate the percentages based on 
    the amount of violations certain times recieved over the total number of violations
    */
  for (var i = 0; i < final.length; i++) {
    final[i].Percentage = parseFloat(
      ((final[i].Violations / total) * 100).toFixed(3)
    );
    //totalp += final[i].Percentage;
  }
  //console.log(totalp);
  //////////////////////////////////////////////////////////////////
}

function update(req) {
  let insertLists = require('./listWrapper.js').insertLists.featuretime;
  let deleteLists = require('./listWrapper.js').deleteLists.featuretime;
  let updateListsOld = require('./listWrapper.js').updateLists.featuretimeOld;
  let updateListsNeo = require('./listWrapper.js').updateLists.featuretimeNeo;

  const terms = (req.query.terms || '').split(',');
  const iLists = searchAllArray(terms, insertLists);
  const dLists = searchAllArray(terms, deleteLists);
  const uListsOld = searchAllArray(terms, updateListsOld);
  const uListsNeo = searchAllArray(terms, updateListsNeo);

  /*
    Find the correct time the violation occured, putting any unknown time in a
    variable called unknown, and then add their respective count of violations in
    a list
    */

  // find correct time for insertLists
  for (var i = 0; i < iLists.length; i++) {
    var time = iLists[i]['Violation Time'];

    if (
      time.length > 5 ||
      (Number(time[1]) == 0 && Number(time[0]) != 1) ||
      (Number(time[0]) != 0 && Number(time[0]) != 1) ||
      (Number(time[0]) == 1 && Number(time[1]) > 2)
    ) {
      code = 'Unknown Time';
    } else {
      code = time[0] + time[1] + time[4] + 'M';
    }
    var found = false;
    for (var j = 0; j < final.length; j++) {
      if (final[j].Time == code) {
        final[j].Violations += 1;
        found = true;
        break;
      }
    }

    var line = { Time: code, Violations: 1, Percentage: 0.0 };
    if (!found) {
      final.push(line);
    }
  }

  // find correct time for deleteLists
  for (var i = 0; i < dLists.length; i++) {
    var time = dLists[i]['Violation Time'];
    if (
      time.length > 5 ||
      (Number(time[1]) == 0 && Number(time[0]) != 1) ||
      (Number(time[0]) != 0 && Number(time[0]) != 1) ||
      (Number(time[0]) == 1 && Number(time[1]) > 2)
    ) {
      code = 'Unknown Time';
    } else {
      code = time[0] + time[1] + time[4] + 'M';
    }

    for (var j = 0; j < final.length; j++) {
      if (final[j].Time == code) {
        final[j].Violations -= 1;
        break;
      }
    }
  }

  // find correct time for updateListsOld and remove them
  for (var i = 0; i < uListsOld.length; i++) {
    var oldtime = uListsOld[i]['Violation Time'];
    if (
      oldtime.length > 5 ||
      (Number(oldtime[1]) == 0 && Number(oldtime[0]) != 1) ||
      (Number(oldtime[0]) != 0 && Number(oldtime[0]) != 1) ||
      (Number(oldtime[0]) == 1 && Number(oldtime[1]) > 2)
    ) {
      oldcode = 'Unknown Time';
    } else {
      oldcode = oldtime[0] + oldtime[1] + oldtime[4] + 'M';
    }

    for (var j = 0; j < final.length; j++) {
      if (final[j].Time == oldcode) {
        final[j].Violations -= 1;
        break;
      }
    }
  }

  // find correct time for updateListsNeo (updated times) and insert them
  for (var i = 0; i < uListsNeo.length; i++) {
    var neotime = uListsNeo[i]['Violation Time'];
    if (
      neotime.length > 5 ||
      (Number(neotime[1]) == 0 && Number(neotime[0]) != 1) ||
      (Number(neotime[0]) != 0 && Number(neotime[0]) != 1) ||
      (Number(neotime[0]) == 1 && Number(neotime[1]) > 2)
    ) {
      neocode = 'Unknown Time';
    } else {
      neocode = neotime[0] + neotime[1] + neotime[4] + 'M';
    }

    for (var j = 0; j < final.length; j++) {
      if (final[j].Time == neocode) {
        final[j].Violations += 1;
        break;
      }
    }
  }

  /*
    Read through the final array and calculate the percentages based on 
    the amount of violations certain times recieved over the total number of violations
    */
  let numViolations = 0;
  for (let z = 0; z < final.length; ++z) {
    numViolations += final[z].Violations;
  }

  for (var i = 0; i < final.length; i++) {
    final[i].Percentage = parseFloat(
      ((final[i].Violations / numViolations) * 100).toFixed(3)
    );
    //totalp += final[i].Percentage;
  }
  //console.log(totalp);
  //////////////////////////////////////////////////////////////////
  require('./listWrapper.js').insertLists.featuretime.length = 0;
  require('./listWrapper.js').deleteLists.featuretime.length = 0;
  require('./listWrapper.js').updateLists.featuretimeOld.length = 0;
  require('./listWrapper.js').updateLists.featuretimeNeo.length = 0;
}

router.route('/data/timeviolations').get((req, res) => {
  if (final.length == 0) {
    console.log('calculating featuretime for the first time...');
    let start = performance.now();
    calculate(req);
    let end = performance.now();
    console.log(
      'Took ' +
        (end - start) +
        ' to calculate Violations by Time of Day for the first time'
    );
  } else {
    console.log('updating featuretime...');
    let start = performance.now();
    update(req);
    let end = performance.now();
    console.log(
      'Took ' + (end - start) + ' to update Violations by Time of Day'
    );
  }

  res.send(final);
});

module.exports = { router };
