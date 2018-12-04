var express = require("express");
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  //intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.send(200);
  } else {
    //move on
    next();
  }
});

var users = [];

app.post("/signup", function(req, res, next) {
  var user = req.body;
  console.log(user);
  users.push(user);
  res.statusCode = 200;
  res.json({ sucess: true });
  res.end();
});

app.post("/login", function(req, res) {
  var loginUser = req.body;
  var foundUser = users.find(user => {
    return (
      user.username === loginUser.username &&
      user.password === loginUser.password
    );
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "applciation/json");
  res.json(foundUser);
});

function getUser(username) {
  return users.find(user => {
    return user.username === username;
  });
}

app.post("/shortenLink", function(req, res) {
  var username = req.body.username;
  var user = getUser(username);
  user.links.push(req.body.links);
  res.statusCode = 200;
  res.end;
});

app.put("/shortenLink", function(req, res) {
  var username = req.body.username;
  var user = getUser(username);
  user.links = req.body.links;
  res.statusCode = 200;
  res.end();
});

var server = app.listen(3000, function() {
  console.log("Server running at http://localhost:" + server.address().port);
});
