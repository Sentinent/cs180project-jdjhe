const router = require("express").Router();

router.route("/").get((req, res) => {
  console.log("found server");
  res.send("you have reached the backend");
});

router
  .route("/data/cols=:columns&page=:pageNum&terms=:searchTerms")
  .get((req, res) => {
    let JSONDATA = require('../server.js')
    let columns = req.params.columns;
    let pageNum = req.params.pageNum;
    let searchTerms = req.params.searchTerms.split(',');
    const resultsPerPage = 20;

    let results = JSONDATA.filter(JSONDATA => JSONDATA[columns] == searchTerms[0]);
    for (let i = 1; i < searchTerms.length; ++i){
      console.log(i);
      let temp = JSONDATA.filter(JSONDATA => JSONDATA[columns] == searchTerms[i]);
      results = results.concat(temp);
    }

    let page = [];
    const startIndex = ((Number)(pageNum) - 1) * resultsPerPage
    for (let i = startIndex; i < startIndex + 20 && i < results.length; ++i) {
      page.push(results[i]);
    }

    // console.log(page);
    console.log("found server: " + columns + " " + pageNum + " " + searchTerms);

    res.send(page);
    // res.send(dataToSend);
    // res.send("searching for columns " + columns + " on page " + pageNum + " for terms " + searchTerms);
  });

module.exports = router;
