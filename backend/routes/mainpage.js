const router = require("express").Router();
const {spawn} = require("child_process");

router.route("/").get((req, res) => {
  console.log("found server");
  res.send("you have reached the backend");
});

router.route("/data/cols=:columns&page=:pageNum&terms=:searchTerms").get((req, res) => {
  let columns = req.params.columns;
  let pageNum = req.params.pageNum;
  let searchTerms = req.params.searchTerms;

  let Object = [pageNum, columns, searchTerms];

  // call simple search
  let pyprog = spawn('python3', ['./functions/main.py', Number(pageNum), columns, 20]);

  pyprog.stdout.on('data', function(data) {
      console.log("reading stdout data");
      console.log(data);
      const msg = String.fromCharCode(...data);
      console.log(msg);
      // const msg = String.fromCharCode.apply(null,data);
      const jjjson = JSON.parse(msg);
      console.log("jjjson: ");
      console.log(jjjson);
      res.send(jjjson);
      // success(data);
  }); 

  pyprog.on('close', (msg) => {
      console.log("closing py: ${code}");
  });

  pyprog.stderr.on('data',(data) => {
    console.log("error: " + data);
      // nosuccess(data);
  });
  
  console.log("found server: " + columns + " " + pageNum + " " + searchTerms);
  // will use this dummy data to test the front end, until search fully works
  let dummyData = {
    col: columns,
    pg: pageNum,
    search: searchTerms,
    "reciepe": "ble"
  }

  // res.send(dummyData);
  // res.send(dataToSend);
  // res.send("searching for columns " + columns + " on page " + pageNum + " for terms " + searchTerms);
});

module.exports = router;