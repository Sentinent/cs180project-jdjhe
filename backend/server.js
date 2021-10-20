const express = require("express");
const cors = require("cors");
const fs = require("fs");
const {spawnSync} = require("child_process");
const readline = require("readline");
// import {stdin as input} from "process";
process = require("process");

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
    console.log("file does not exist, generating files...");
    let pyprog = spawnSync("python3", ["./functions/main.py"]);
  }

  console.log("found data json files, loading into memory...");
  
  'use strict';
  let num = 2;
  console.log("loading file 1");
  JSONDATA = require('../parsed_data/data1.json');
  // while (num < 9){
  //     console.log("loading file " + num);
  //     JSONDATA = JSONDATA.concat(require('../parsed_data/data' + num +'.json'));
  //     num++;
  // }
  console.log("Sucessfully loaded " + JSONDATA.length + " rows into memory");
  module.exports = JSONDATA;
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

process.on("SIGINT", () => {
  console.log("Got kill signal. Backing up all data...");
  const EntriesPerFile = 1200000;

  for (let i = 0, files = 1; i < JSONDATA.length; i += EntriesPerFile, files++) {
    if (i + EntriesPerFile < JSONDATA.length) {
      console.log(i);
      let data = JSON.stringify(JSONDATA.slice(i, i + EntriesPerFile), null, 4);
      fs.writeFileSync("../parsed_data/data" + files + ".json", data , (err) => {
        if (err)
          throw err;
        else
          console.log("wrote file data" + files + ".json");
      });
    } else {
      console.log("last");
      let data = JSON.stringify(JSONDATA.slice(i, JSONDATA.length), null, 4);
      fs.writeFileSync("../parsed_data/data" + files + ".json", data, (err) => {
        if (err)
          throw err;
        else
          console.log("wrote file data" + files + ".json");
      });
    }
  }

  console.log("Finished backing up data");
  process.exit();
});

module.exports = JSONDATA;