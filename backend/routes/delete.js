const router = require("express").Router();

// this route does the deleting
router.route("/summonsNum=:sumNum").get((req, res) => {
    const sumNum = req.params.sumNum;

    console.log("want to delete " + sumNum);
    res.send("you want to delete row with Summons Number " + sumNum);
  });
  
module.exports = router;