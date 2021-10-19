const router = require("express").Router();

// this route does the deleting
router.route("/summonsNum=:sumNum").get((req, res) => {
  let JSONDATA = require('../server.js')
  const sumNum = req.params.sumNum;
  console.log("\nDelete function:")
  console.log("Wants to delete " + sumNum);

  const index = JSONDATA.findIndex(x => x["Summons Number"] == sumNum);

  if (index != -1) {
    console.log("index = " + index)
    JSONDATA.splice(index, 1);
    console.log("After removal length:", JSONDATA.length);
    res.send(sumNum+" has been deleted");
  } else {
    console.log("Summons Number does not exist")
    res.send(sumNum+" does not exist");
  }
  console.log("Delete function ends.\n")
  
});

module.exports = router;
