const express = require("express");
const cors = require("cors");

var app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const mainpage = require("./routes/mainpage");
const insert = require("./routes/insert");
const del = require("./routes/delete");
const update = require("./routes/update");
// const callpy = require("./routes/callpy");

app.use("/", mainpage);
app.use("/insert", insert);
app.use("/delete", del);
app.use("/update", update);
// app.use("/py", callpy);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
