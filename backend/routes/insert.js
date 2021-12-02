const router = require('express').Router();
const JSONDATA = require('../data.js');

let insertLists = require('./listWrapper.js').insertLists;

// this route does the inserting
function inserts(data, res) {
  console.log('\nInsert function:');
  console.log('Wants to insert ' + data['Summons Number']);

  //check if the data wants to insert is already in the index
  const index = JSONDATA.findIndex(
    (x) => x['Summons Number'] == data['Summons Number']
  );

  if (index > -1) {
    // For the data is already exist, no action
    console.log('Summons Number already exist');
    res.send('Summons Number already exist');
  } else {
    //For those did not found in the index.
    //change all the data to uppercase
    data['Plate ID'] = data['Plate ID'].toUpperCase();
    data['Registration State'] = data['Registration State'].toUpperCase();
    data['Issue Date'] = data['Issue Date'].toUpperCase();
    data['Violation Time'] = data['Violation Time'].toUpperCase();
    data['Violation Code'] = data['Violation Code'];
    data['Vehicle Make'] = data['Vehicle Make'].toUpperCase();
    data['Vehicle Body Type'] = data['Vehicle Body Type'].toUpperCase();
    data['Vehicle Year'] = data['Vehicle Year'].toUpperCase();
    data['Street Name'] = data['Street Name'].toUpperCase();
    data['County County'] = data['County County'].toUpperCase();
    data['Violation County'] = data['Violation County'].toUpperCase();
    JSONDATA.push(data);
    insertLists.push(data); // lets features know that we inserted data
    console.log('Data added to database');
    res.send('Data added to database');
  }

  RecalculateFeatureVPC = 1;
  RecalculateFeatureMonth = 1;

  console.log('After insertion length:' + JSONDATA.length);
  console.log('Insert function ended\n');
}

router
  .route(
    '/summonsNum=:sumNum&' +
    'plateID=:plateID&' +
    'regState=:regState&' +
    'issDate=:issDate&' +
    'vTime=:vioTime&' +
    'vCode=:vioCode&' +
    'vehMake=:vehMake&' +
    'vehBody=:vehBody&' +
    'vehYear=:vehYear&' +
    'street=:street&' +
    'cCounty=:cCounty&' +
    'vCounty=:vCounty'
  )
  .get((req, res) => {
    const data = {
      'Summons Number': req.params.sumNum,
      'Plate ID': req.params.plateID,
      'Registration State': req.params.regState,
      'Issue Date': req.params.issDate,
      'Violation Time': req.params.vioTime,
      'Violation Code': req.params.vioCode,
      'Vehicle Make': req.params.vehMake,
      'Vehicle Body Type': req.params.vehBody,
      'Vehicle Year': req.params.vehYear,
      'Street Name': req.params.street,
      'County County': req.params.cCounty,
      'Violation County': req.params.vCounty,
    };

    inserts(data, res);
  });

module.exports = { router, inserts };
