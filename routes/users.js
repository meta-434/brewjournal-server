const express = require("express");
const UserService = require("../services/UserService");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("\n ", req.oidc.user);
  res.send(UserService.sayHello(req.oidc.user.sub));
});

router.get("/create", (req, res) => {
  try {
    axios
      .post(
        "https://equipped-mantis-70.hasura.app/api/rest/users/create",
        {
          display_name: req.oidc.user.nickname,
          auth0_id: req.oidc.user.sub,
          is_active: true,
        },
        {
          headers: {
            "x-hasura-admin-secret":
              "",
          },
        }
      )
      .then((result) => {
        if (res && res.status) return res.status(200).json(result);
        return res.status(409).send(result.data.error);
      });
  } catch (e) {
    res.status(500).send(`error: ${e}`);
    console.error("error: ", e);
  }
});

module.exports = router;
