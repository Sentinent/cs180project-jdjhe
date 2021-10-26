const router = require('express').Router();

// this route is used for debugging
router.route('/').get((req, res) => {
  console.log('inside delete update route');
  res.send('what would you like to delete?');
});

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

    let JSONDATA = require('../server.js');

    console.log('Wants to update ' + data['Summons Number']);
    const index = JSONDATA.findIndex(
      (x) => x['Summons Number'] == data['Summons Number']
    );
    if (index == -1) {
      console.log('index = ' + index);
      console.log('Summons Number does not exist');
      res.send('Summons Number does not exist');
    } else {
      console.log('index = ' + index);
      console.log('before :');
      console.log(JSONDATA[index]);
      JSONDATA[index] = data;
      console.log('after :');
      console.log(JSONDATA[index]);
      console.log('Data has been updated');
      res.send('Data has been updated');
    }
    console.log('After Update length:' + JSONDATA.length);
    console.log('Update function ended\n');
  });

module.exports = router;
