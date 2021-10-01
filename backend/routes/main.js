const router = require("express").Router();

router.route("/").get((req,res) => {
    console.log("found server");
    res.send("you have reached the backend");
});

module.exports = router;