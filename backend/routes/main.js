const router = require("express").Router();

router.route("/").get((req,res) => {
    res.send("welcome to the backend");
});

module.exports = router;