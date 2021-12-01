const express = require('express');
const cors = require('cors');

const search = require('./routes/search').router;
const insert = require('./routes/insert').router;
const del = require('./routes/delete').router;
const update = require('./routes/update').router;
const feature1 = require('./routes/feature1').router;

const featurecb = require('./routes/featurecb').router;
const featuretime = require('./routes/featuretime').router;
const featuremonth = require('./routes/featuremonth').router;
const repeats = require('./routes/featurerepeats').router;
const featureVPC = require('./routes/featureVPC').router;
const table = require('./routes/table');
const customAnalytic = require('./routes/custom');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/', search);
app.use('/insert', insert);
app.use('/delete', del);
app.use('/update', update);
app.use('/feature1', feature1);
app.use('/featurecb', featurecb);
app.use('/featuretime', featuretime);
app.use('/featuremonth', featuremonth);
app.use('/featurerepeats', repeats);
app.use('/featureVPC', featureVPC);
app.use('/table', table);
app.use('/custom', customAnalytic);

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
