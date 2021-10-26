const router = require("express").Router();

const queryFilter = /([A-Za-z0-9\s]+)(<|>|==|<=|>=|~)([A-Za-z0-9\*]+)/;

router.route("/").get((req, res) => {
  console.log("found server");
  res.send("you have reached the backend");
});

router
  .route("/data/timeviolations")
  .get((req, res) => {
    let JSONDATA = require("../server.js");
    const resultsPerPage = 16;

    //////////////////////////////////////////////////////////////////
    // Start of Code
    //////////////////////////////////////////////////////////////////

    // total is the max number of violations
    // final is the list of violation codes, their respective occurences and their respective percent of the total
    var total = 0;
    let final = [];

    /*
    
    */
    for (var i = 0; i < JSONDATA.length; i++)
    {
        var time = JSONDATA[i]["Violation Time"];
        if (time.length > 5)
        {
            code = "Unknown Time";
        }
        else if (Number(time[1]) == 0 && Number(time[0]) != 1)
        {
            code = "Unknown Time";
        }
        else if (Number(time[0]) != 0 && Number(time[0]) != 1)
        {
            code = "Unknown Time";
        }
        else if (Number(time[0]) == 1 && Number(time[1]) > 2)
        {
            code = "Unknown Time";
        }
        else
        {
            code = time[0] + time[1] + time[4] + "M";
        }
        var found = false;
        if (final.length > 0)
        {
            for (var j = 0; j < final.length; j++)
            {
                if (final[j].Time == code)
                {
                    final[j].Violations += 1;
                    found = true;
                    break;
                }
            }
        }
        var line = {"Time": code, "Violations": 1, "Percentage": 0.0};
        if (!found)
        {
            final.push(line)
        }
        total++;
    }

    // Testing variable to check the percentages
    //var totalp = 0;

    /*
    Read through the final array and calculate the percentages based on 
    the amount of violations certain car brands recieved over the total number of violations
    */
    for (var i = 0; i < final.length; i++)
    {
        final[i].Percentage = final[i].Violations / total;
        //totalp += final[i].Percentage;
    }
    //console.log(totalp);
    //////////////////////////////////////////////////////////////////

    res.send(final);
  });

module.exports = router;
