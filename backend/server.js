const express = require("express");
const cors = require("cors");

var app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const mainpage = require("./routes/mainpage");
// const callpy = require("./routes/callpy");

app.use("/", mainpage);
// app.use("/py", callpy);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
