var express = require("express");
var toDoController = require("./controllers/toDocontroller");
var app = express();

//template engine setup
app.set("view engine", "ejs");

//static file setup
app.use(express.static("./public"));

//fire controller
toDoController(app);
//listen port
app.listen(3000);
console.log("Server started at port 3000");
