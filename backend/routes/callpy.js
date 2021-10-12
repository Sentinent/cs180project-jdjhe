const {runPy} = require("./python_tools/runPython")
const router = require("express").Router();

router.route("/").get((req, res) => {
  console.log("found server");

    runPy.then(function(fromRunpy) {
        console.log(fromRunpy);
        res.end(fromRunpy); 
    }).catch( err => console.log(err)); 
//   res.send("you have reached the py test site");
});

module.exports = router;