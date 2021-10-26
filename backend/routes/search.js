const router = require('express').Router();

const JSONDATA = require('../data.js');
const queryFilter = /([A-Za-z0-9\s]+)(<|>|==|<=|>=|~)([A-Za-z0-9\*]+)/;

function search(cols, page, terms) {
  const resultsPerPage = 16;

  let parsedConditions = [];
  for (const condition of terms) {
    const match = queryFilter.exec(condition);
    if (match) {
      // (column) (operator) (value)
      parsedConditions.push(match);
    }
  }

  let results = [];
  let resultsToSkip = (Number(page) - 1) * resultsPerPage;
  let totalResults = 0;
  for (const row of JSONDATA) {
    let failed = false;
    for (const condition of parsedConditions) {
      const [_, col, op, val] = condition;
      // lazy eval hack
      // meh
      let query;
      if (op === '~') {
        if (val === '*') continue;
        query = `'${row[col]}'.indexOf('${val}') !== -1`;
      } else {
        query = `'${row[col]}' ${op} '${val}'`;
      }

      try {
        const condResult = eval(query);
        if (!condResult) {
          failed = true;
          break;
        }
      } catch {
        console.log(`Failed query: ${query}`);
        failed = true;
        break;
      }
    }

    if (!failed) {
      totalResults++;

      if (resultsToSkip > 0) {
        resultsToSkip--;
      } else if (results.length < resultsPerPage) {
        results.push(row);
      }
    }
  }

  return {
    results,
    totalPages: Math.ceil(totalResults / resultsPerPage),
  };
}

router
  .route('/data/cols=:columns&page=:pageNum&terms=:searchTerms')
  .get((req, res) => {
    let { columns, pageNum, searchTerms } = req.params;
    console.log('found server: ' + columns + ' ' + pageNum + ' ' + searchTerms);

    res.send(search(columns, pageNum, searchTerms.split(',')));
  });

module.exports = { router, search };
