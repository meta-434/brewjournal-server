var express = require("express");
var router = express.Router();
const { auth } = require("express-openid-connect");
// --/--

// req.isAuthenticated is provided from the auth router
router.get("/", (req, res) => {
  const isAuthed = req.oidc.isAuthenticated();
  res.send(isAuthed ? "Logged in" : "Logged out");
});

module.exports = router;
