var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//connect to mongo atlas
mongoose.connect(
  "mongodb+srv://user:user@todo-4m0bu.mongodb.net/test?retryWrites=true&w=majority"
);

//creating schema and model for DB
var todoSchema = new mongoose.Schema({
  item: String
});

var ToDo = mongoose.model("ToDo", todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.get("/todo", function(req, res) {
    //Get data from DB and pass it to view
    ToDo.find({}, function(err, data) {
      if (err) throw err;
      res.render("toDO", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, function(req, res) {
    //get data from view and add to DB
    var newToDo = ToDo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", function(req, res) {
    //delet data from DB
    ToDo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};
