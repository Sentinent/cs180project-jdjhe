const router = require('express').Router();
const JSONDATA = require('../data.js');

let deleteLists = require("./listWrapper.js").deleteLists;

let RecalculateFeatureVPC = require("./featureVPC.js").RecalculateFeatureVPC;
let RecalculateFeatureMonth = require('./featuremonth.js').RecalculateFeatureMonth;


// this route does the deleting
router.route('/summonsNum=:sumNum').get((req, res) => {
  const sumNum = req.params.sumNum;
  console.log('\nDelete function:');
  console.log('Wants to delete ' + sumNum);

  const index = JSONDATA.findIndex((x) => x['Summons Number'] == sumNum);

  if (index != -1) {
    console.log('index = ' + index);
    deleteLists.push(JSONDATA[index]);   // Save the delted data for incremental analytics
    JSONDATA.splice(index, 1);
    console.log('After removal length:', JSONDATA.length);
    res.send(sumNum + ' has been deleted');
  } else {
    console.log('Summons Number does not exist');
    res.send(sumNum + ' does not exist');
  }

  RecalculateFeatureVPC = 1;
  RecalculateFeatureMonth = 1;

  console.log('Delete function ends.\n');
});

module.exports = { router };
