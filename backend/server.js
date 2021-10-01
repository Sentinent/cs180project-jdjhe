const express = require("express");
const cors = require("cors");

var app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const main = require("./routes/main");
app.use("/", main);

app.listen(port, ()=> {
    console.log("Server is running on port: $(port)");
});