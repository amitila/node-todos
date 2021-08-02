var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");

var config = require("./config");
var setupController = require("./api/controllers/setupController");
var todoController = require("./api/controllers/todoController");

var app = express();
var port = process.env.PORT || 3000;
// Cau hinh su dung cac middleware
app.use("/public", express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

// log moi req ra console
app.use(morgan("dev"));
 
// cau hinh views
app.set("view engine", "ejs");

// db info
console.log(config.getDbConnectionString());
// connect to db
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true });
setupController(app);
todoController(app);

app.get("/", function(req, res) {
    res.render("index");
});

// khoi dong server
app.listen(port, function() {
    console.log("App listening on port: " + port);
});
