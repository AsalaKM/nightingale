const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const router = require("./router");
const passport = require("./passport");
const dbConnection = require("./database/db_connection");

const app = express();

// read the config file
// eslint-disable-next-line global-require
require("env2")("./.env");

// connect with DB
dbConnection();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

if (process.env.NODE_ENV === "production") {
  // serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Handle React routing, resturn all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
} else {
  // read the config file
  // eslint-disable-next-line global-require
  require("env2")("./.env");
}

// use passport config middleware
app.use(passport().initialize());

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
