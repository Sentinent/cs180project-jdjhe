const router = require("express").Router();

const queryFilter = /([A-Za-z0-9\s]+)(<|>|==|<=|>=|~)([A-Za-z0-9\*]+)/;

router.route("/").get((req, res) => {
  console.log("found server");
  res.send("you have reached the backend");
});

router
  .route("/data/cols=:columns&page=:pageNum&terms=:searchTerms")
  .get((req, res) => {
    let JSONDATA = require("../server.js");
    const resultsPerPage = 16;

    let { columns, pageNum, searchTerms } = req.params;
    console.log("found server: " + columns + " " + pageNum + " " + searchTerms);

    let parsedConditions = [];
    for (const condition of req.params.searchTerms.split(",")) {
      const match = queryFilter.exec(condition);
      if (match) {
        // (column) (operator) (value)
        parsedConditions.push(match);
      }
    }

    let results = [];
    let resultsToSkip = (Number(pageNum) - 1) * resultsPerPage;
    for (const row of JSONDATA) {
      let failed = false;
      for (const condition of parsedConditions) {
        const [_, col, op, val] = condition;
        // lazy eval hack
        // meh
        let query;
        if (op === "~") {
          if (val === "*") continue;
          query = `'${row[col]}'.indexOf('${val}') !== -1`;
        } else {
          query = `${row[col]} ${op} ${val}`;
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
        if (resultsToSkip > 0) {
          resultsToSkip--;
        } else {
          results.push(row);
          if (results.length >= resultsPerPage) break;
        }
      }
    }

    res.send(results);

    /*
    let results = JSONDATA.filter(
      (JSONDATA) => JSONDATA[columns] == searchTerms[0]
    );
    for (let i = 1; i < searchTerms.length; ++i) {
      console.log(i);
      let temp = JSONDATA.filter(
        (JSONDATA) => JSONDATA[columns] == searchTerms[i]
      );
      results = results.concat(temp);
    }
    */
  });

module.exports = router;
