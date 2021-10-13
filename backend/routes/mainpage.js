const {runPy} = require("./python_tools/runPython")
const router = require("express").Router();

router.route("/").get((req, res) => {
  console.log("found server");
  res.send("you have reached the backend");
});

router.route("/data/cols=:columns&page=:pageNum&terms=:searchTerms").get((req, res) => {
  let columns = req.params.columns;
  let pageNum = req.params.pageNum;
  let searchTerms = req.params.searchTerms;

  console.log("requesting data");
  console.log("found server: " + columns + " " + pageNum + " " + searchTerms);
  
  // calls python code
  runPy.then(function(fromRunpy) {
    console.log(fromRunpy);
    res.send(fromRunpy);
  }).catch(err => console.log("python error: " + err));

  // will use this dummy data to test the front end, until search fully works
  let dummyData = {
    col: columns,
    pg: pageNum,
    search: searchTerms
  }

  res.send(dummyData);
  // res.send("searching for columns " + columns + " on page " + pageNum + " for terms " + searchTerms);
});

module.exports = router;