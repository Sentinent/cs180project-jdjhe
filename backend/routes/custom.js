const router = require('express').Router();
const JSONDATA = require('../data.js');

router.route('/term=:term').get((req, res) => {
  const term = req.params.term;
  console.log('\nCustom analytic for ' + term);
  const allCol = new Map();
  const result = [];
  let total = 0;
  for (let i = 0; i < JSONDATA.length; i++) {
    let col = JSONDATA[i][term];
    if (col.length != 0) {
      if (allCol.has(col)) {
        allCol.set(col, allCol.get(col) + 1);
      } else {
        allCol.set(col, 1);
      }
      total += 1;
    }
  }
  console.log(total);
  const iterator1 = allCol[Symbol.iterator]();
  let other = { Title: 'Unknow', Violations: 0, Percentage: 0.0 };
  for (const item of iterator1) {
    if ((parseFloat(item[1]) / total).toFixed(3) <= 0.001) {
      other.Violations += item[1];
    } else {
      let line = {
        Title: item[0],
        Violations: item[1],
        Percentage: ((item[1] / total) * 100).toFixed(3),
      };
      result.push(line);
    }
  }
  other.Percentage = ((other.Violations / total) * 100).toFixed(3);
  result.push(other);
  console.log(result);
  res.send(result);
});

module.exports = router;
