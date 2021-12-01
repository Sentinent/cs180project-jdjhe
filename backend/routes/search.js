const router = require('express').Router();

const JSONDATA = require('../data.js');
const RESULTS_PER_PAGE = 16;
const queryFilter = /([A-Za-z0-9\s]+)(<|>|==|<=|>=|~)([A-Za-z0-9\*]+)/;
const numerical_cols = ['Violation Code'];

function isMatch(row, parsedConditions) {
  for (const condition of parsedConditions) {
    const [_, col, op, val] = condition;
    // lazy eval hack
    // meh
    let query;
    if (op === '~') {
      if (val === '*') continue;
      query = `'${row[col]}'.indexOf('${val}') !== -1`;
    } else if (numerical_cols.indexOf(col) !== -1) {
      query = `${row[col]} ${op} ${val}`;
    } else {
      query = `'${row[col]}' ${op} '${val}'`;
    }

    try {
      const condResult = eval(query);
      if (!condResult) {
        return false;
      }
    } catch {
      console.log(`Failed query: ${query}`);
      return false;
    }
  }
  return true;
}

function parseTerms(terms) {
  let parsedConditions = [];
  for (const condition of terms) {
    const match = queryFilter.exec(condition);
    if (match) {
      // (column) (operator) (value)
      parsedConditions.push(match);
    }
  }
  return parsedConditions;
}

// TODO: cache if we got the memory
// a generalized version exists below
function searchAll(terms) {
  let results = [];
  const parsedConditions = parseTerms(terms);
  for (const row of JSONDATA) {
    if (isMatch(row, parsedConditions)) {
      results.push(row);
    }
  }

  return results;
}

// generalized version for above function
function searchAllArray(terms, ...array) {
  let results = [];
  const parsedConditions = parseTerms(terms);
  // for (let row = 0; row < array.length; ++row) {
  for (const row of array[0]) {
    if (isMatch(row, parsedConditions)) {
      results.push(row);
    }
  }

  return results;
}

function search(cols, page, terms) {
  let totalResults = 0;
  const results = [];
  let resultsToSkip = (Number(page) - 1) * RESULTS_PER_PAGE;
  const parsedConditions = parseTerms(terms);

  for (const row of JSONDATA) {
    if (isMatch(row, parsedConditions)) {
      totalResults++;

      if (resultsToSkip > 0) {
        resultsToSkip--;
      } else if (results.length < RESULTS_PER_PAGE) {
        results.push(row);
      }
    }
  }

  return {
    results,
    currPage: page,
    totalPages: Math.ceil(totalResults / RESULTS_PER_PAGE),
  };
}

router
  .route('/data/cols=:columns&page=:pageNum&terms=:searchTerms')
  .get((req, res) => {
    let { columns, pageNum, searchTerms } = req.params;
    console.log('found server: ' + columns + ' ' + pageNum + ' ' + searchTerms);

    res.send(search(columns, pageNum, searchTerms.split(',')));
  });

module.exports = { router, search, searchAll, searchAllArray };
