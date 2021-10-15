const router = require("express").Router();

// this route is used for debugging
router.route("/").get((req, res) => {
  console.log("inside delete update route");
  res.send("what would you like to delete?");
});

// this route does the updating
router
  .route(
    "/summonsNum=:sumNum&" +
      "plateID=:plateID&" +
      "regState=:regState&" +
      "issDate=:issDate&" +
      "vTime=:vioTime&" +
      "vCode=:vioCode&" +
      "vehMake=:vehMake&" +
      "vehBody=:vehBody&" +
      "vehYear=:vehYear&" +
      "street=:street&" +
      "county=:county"
  )
  .get((req, res) => {
    console.log("about to do some updating");

    const data = {
      "Summons Number": req.params.sumNum,
      "Plate ID": req.params.plateID,
      "Registration State": req.params.regState,
      "Issue Date": req.params.issDate,
      "Violation Time": req.params.vioTime,
      "Violation Code": req.params.vioCode,
      "Vehicle Make": req.params.vehMake,
      "Vehicle Body Type": req.params.vehBody,
      "Vehicle Year": req.params.vehYear,
      "Street Name": req.params.street,
      "Violation County": req.params.county,
    };

    res.send(data);
  });

module.exports = router;
