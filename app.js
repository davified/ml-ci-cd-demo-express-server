var express = require("express");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var cors = require("cors");
var makeRequestToMLEngine = require("./ml-engine");
var port = process.env.PORT || 3000;
var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

async function servePredictions(req, res, next) {
  try {
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
  } catch (error) {
    res.json("unknown");
    console.log("error in express app");
  }
}

app.post("/", servePredictions);

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
