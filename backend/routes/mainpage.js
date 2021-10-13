// const {runPy} = require("./python_tools/runPython")
const router = require("express").Router();
const {spawn} = require('child_process');


router.route("/").get((req, res) => {
  console.log("found server");
  res.send("you have reached the backend");
});

router.route("/data/cols=:columns&page=:pageNum&terms=:searchTerms").get((req, res) => {
  let columns = req.params.columns;
  let pageNum = req.params.pageNum;
  let searchTerms = req.params.searchTerms;

  let testObject = ["first", "second"];
  let dataToSend;
  // {stdio:['pipe', 'pipe', 'pipe']}
  console.log("before py");
  const py = spawn('python3', ['../functions/test.py'], {stdio:['pipe']});
  // const py = spawn ('ls', ['-l']);

  py.stdout.on('data', function (data) { 
    console.log('Pipe data from python script ...');
    console.log("data: " + data)
    dataToSend = data;
  });

  // let ttt = py.stdout;
  // console.log(ttt);

  py.on('close', (code) => {
    console.log('child process close all stdio with code ${code}');
    // res.send(dataToSend);
  });
  
  // console.log("requesting data"); 
  console.log("found server: " + columns + " " + pageNum + " " + searchTerms);
  console.log("data to send: " + dataToSend);
  // will use this dummy data to test the front end, until search fully works
  let dummyData = {
    col: columns,
    pg: pageNum,
    search: searchTerms,
    "reciepe": "ble"
  }

  res.send(dummyData);
  // res.send("searching for columns " + columns + " on page " + pageNum + " for terms " + searchTerms);
});

module.exports = router;