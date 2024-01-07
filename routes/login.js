var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
  console.log('success - user creds = ', req.oidc.user);
});

module.exports = router;
