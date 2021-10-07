const router = require("express").Router();

router.route("/").get((req, res) => {
  console.log("found server");
  res.send("you have reached the backend");
});

router.route("/data/cols=:columns&page=:pageNum").get((req, res) => {
  let columns = req.params.columns;
  let pageNum = req.params.pageNum;

  console.log("requesting data");
  console.log("found server: " + columns + " " + pageNum);
  res.send("searching for " + columns + " " + pageNum);
});

module.exports = router;
