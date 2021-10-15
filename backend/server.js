const express = require("express");
const cors = require("cors");
const fs = require("fs");
const {spawn} = require("child_process");

var app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const mainpage = require("./routes/mainpage");
const insert = require("./routes/insert");
const del = require("./routes/delete");
const update = require("./routes/update");

app.use("/", mainpage);
app.use("/insert", insert);
app.use("/delete", del);
app.use("/update", update);

let JSONDATA;
fs.access("../parsed_data/data.json", fs.constants.F_OK, (err) => {
  console.log("checking if file exists");
  if (err) {
    console.log("file does not exist");

    let pyprog = spawn("python3", ["./functions/main.py"]);

    pyprog.stdout.on("data", function (data) {
      console.log("read stdout data");
    });
    
    pyprog.on("close", (msg) => {
      console.log("closing py: ${code}");
    });
    
    pyprog.stderr.on("data", (data) => {
      console.log("error: " + data);
    });
  } else {
    console.log("file exists, loading into memory...");
    fs.readFile("../parsed_data/data.json", 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const content = String.fromCharCode(...data)
        JSONDATA = JSON.parse(content);
        console.log("successfully loaded data");
      }
    });
    
  }
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
