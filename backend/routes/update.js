const router = require('express').Router();
const JSONDATA = require('../data.js');

let updateLists = require('./listWrapper.js').updateLists;

function updates(req, res) {
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

  console.log('\nUpdate function:');
  console.log('Wants to update ' + data['Summons Number']);
  const index = JSONDATA.findIndex(
    (x) => x['Summons Number'] == data['Summons Number']
  );
  if (index == -1) {
    console.log('Summons Number does not exist');
    res.send('Summons Number does not exist');
  } else {
    console.log('before :');
    console.log(JSONDATA[index]);

    updateLists.pushOld(JSONDATA[index]); // Save the old row for incremental analytics

    //change all the data to uppercase
    data['Plate ID'] = data['Plate ID'].toUpperCase();
    data['Registration State'] = data['Registration State'].toUpperCase();
    data['Issue Date'] = data['Issue Date'].toUpperCase();
    data['Violation Time'] = data['Violation Time'].toUpperCase();
    data['Violation Code'] = data['Violation Code']
    data['Vehicle Make'] = data['Vehicle Make'].toUpperCase();
    data['Vehicle Body Type'] = data['Vehicle Body Type'].toUpperCase();
    data['Vehicle Year'] = data['Vehicle Year'].toUpperCase();
    data['Street Name'] = data['Street Name'].toUpperCase();
    data['County County'] = data['County County'].toUpperCase();
    data['Violation County'] = data['Violation County'].toUpperCase();
    JSONDATA[index] = data;
    console.log('after :');
    console.log(JSONDATA[index]);
    console.log('Data has been updated');

    updateLists.pushNew(JSONDATA[index]); // Save the new row for incremental analytics

    res.send('Data has been updated');
  }
}

// this route does the updating
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
    updates(req, res);
  });

module.exports = { router, updates };
