require("dotenv").config();

//express
const express = require("express");
let app = express();

global.config = require("./config");
require("./config/globals")();


//required modules
const bodyParser = require("body-parser");
var path = require("path");
app.use(express.static("public"));
app.use(express.json());

//add routing
let router = require("./routes");
router(app);

//listen to given port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Application is running on the port:" + port);
});

module.exports = app;