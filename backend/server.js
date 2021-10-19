const express = require("express");
const cors = require("cors");
const fs = require("fs");
const {spawn} = require("child_process");
const {spawnSync} = require("child_process");

var app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const search = require("./routes/search");
const insert = require("./routes/insert");
const del = require("./routes/delete");
const update = require("./routes/update");

app.use("/", search);
app.use("/insert", insert);
app.use("/delete", del);
app.use("/update", update);

let JSONDATA;

fs.access("../parsed_data/data8.json", fs.constants.F_OK, (err) => {
  console.log("checking if file exists");
  if (err) {
    console.log("file does not exist");

    let pyprog = spawnSync("python3", ["./functions/main.py"]);
    
    pyprog.on("close", (msg) => {
      console.log("closing py: ${code}");
    });
    
    pyprog.stderr.on("data", (data) => {
      console.log("error: " + data);
    });
  }

  console.log("found data json files, loading into memory...");
  
  'use strict';
  let num = 2;
  console.log("loading file 1");
  JSONDATA = require('../parsed_data/data1.json');
  while (num < 9){
      console.log("loading file " + num);
      JSONDATA = JSONDATA.concat(require('../parsed_data/data' + num +'.json'));
      num++;
  }
  console.log("Sucessfully loaded " + JSONDATA.length + " rows into memory");
  module.exports = JSONDATA;
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

module.exports = JSONDATA;