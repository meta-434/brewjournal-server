const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
