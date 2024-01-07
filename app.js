require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { auth, requiresAuth } = require("express-openid-connect");
const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profile");
const recipesRouter = require("./routes/recipes");
const loginRouter = require("./routes/login");
const pool = require('./db');
const port = 3000;

const app = express();  
app.set('view engine', 'pug');

//auth0 config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.auth0_secret,
  baseURL: `http://localhost:${port}`,
  clientID: process.env.auth0_client_ID,
  issuerBaseURL: process.env.auth0_issuer_base_URL,
}

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
app.use(auth(config));
app.use("/", indexRouter);
app.use("/login", requiresAuth(), loginRouter);
app.use("/profile", requiresAuth(), profileRouter);
app.use("/recipes", recipesRouter);

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
