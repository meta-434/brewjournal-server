const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { auth, requiresAuth } = require("express-openid-connect");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "9e3dde0a5af465a9e452595cdb733c25ca99efa40c87d3643fb4bd73e09d6227",
  baseURL: "http://localhost:3000",
  clientID: "u7pwIDDcpClWsj07OUOmgk2HRzqYP0GT",
  issuerBaseURL: "https://dev-brewjournal.us.auth0.com",
};
app.use(auth(config));
app.use("/", indexRouter);
app.use("/users", requiresAuth(), usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
