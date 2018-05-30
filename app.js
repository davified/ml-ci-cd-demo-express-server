var express = require("express");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var makeRequestToMLEngine = require("./ml-engine");
var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", async function(req, res, next) {
  const userInput = req.body.input;
  const response = await makeRequestToMLEngine(userInput);
  const classification = response["predictions"][0];
  let sentiment;
  if (classification === 1) {
    sentiment = "positive";
  } else {
    sentiment = "negative";
  }
  res.json(sentiment);
});

app.get("/", function(req, res, next) {
  res.json("simple nlp server demo");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, function() {
  console.log(`app started on port ${port}`);
});

module.exports = app;