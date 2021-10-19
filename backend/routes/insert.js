const JSONDATA = require("../server");

const router = require("express").Router();

// this route is used for debugging
router.route("/").get((req, res) => {
  res.send("hi");
});

// this route does the inserting
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

    console.log("\nInsert function:")
    
    let JSONDATA = require('../server.js')

    console.log("Wants to insert " + data["Summons Number"])
    const index = JSONDATA.findIndex(x => x["Summons Number"] == data["Summons Number"]);
    if(index > -1){
      console.log("index = " + index)
      console.log("Summons Number already exist")
      res.send("Summons Number already exist")
    } else {
      console.log("index = " + index)
      JSONDATA.push(data)
      console.log("Data added to database")
      res.send("Data added to database");
    }
    console.log("After insertion length:" + JSONDATA.length)
    console.log("Insert function ended\n")
    
  });

module.exports = router;
