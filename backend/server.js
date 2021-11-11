const express = require('express');
const cors = require('cors');

const search = require('./routes/search').router;
const insert = require('./routes/insert');
const del = require('./routes/delete');
const update = require('./routes/update');
const feature1 = require('./routes/feature1').router;
const featurecb = require('./routes/featurecb');
const featuretime = require('./routes/featuretime').router;
const featuremonth = require('./routes/featuremonth');
const repeats = require('./routes/featurerepeats').router;
const featureVPC = require('./routes/featureVPC');
const table = require('./routes/table');

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

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});