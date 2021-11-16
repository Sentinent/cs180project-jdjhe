const router = require('express').Router();
const JSONDATA = require('../data.js');
let RecalculateFeatureTime = require("./featuretime.js").RecalculateFeatureTime;
let RecalculateFeature1 =  require("./feature1.js").RecalculateFeature1;
let RecalculateFeatureVPC = require("./featureVPC.js").RecalculateFeatureVPC;
let RecalculateFeatureMonth = require('./featuremonth.js').RecalculateFeatureMonth;
let RecalculateFeatureCarBrand = require('./featurecb.js').RecalculateFeatureCarBrand;

let deleteList = require('./listWrapper.js').deleteLists;

// this route does the deleting
router.route('/summonsNum=:sumNum').get((req, res) => {
  const sumNum = req.params.sumNum;
  console.log('\nDelete function:');
  console.log('Wants to delete ' + sumNum);

  const index = JSONDATA.findIndex((x) => x['Summons Number'] == sumNum);

  if (index != -1) {
    console.log('index = ' + index);
    deleteList.push(JSONDATA[index]); 
    JSONDATA.splice(index, 1);
    console.log('After removal length:', JSONDATA.length);
    res.send(sumNum + ' has been deleted');
  } else {
    console.log('Summons Number does not exist');
    res.send(sumNum + ' does not exist');
  }

  RecalculateFeatureTime = 1;
  RecalculateFeature1 = 1;
  RecalculateFeatureVPC = 1;
  RecalculateFeatureMonth = 1;
  RecalculateFeatureCarBrand = 1;

  console.log('Delete function ends.\n');
});

module.exports = { router, deleteList };
