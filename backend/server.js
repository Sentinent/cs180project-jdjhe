const express = require("express");

var app = express();
const port = 5000;

app.use(express.json());

const main = require("./routes/main");
app.use("/", main);

app.listen(port, ()=> {
    console.log("Server is running on port: $(port)");
});