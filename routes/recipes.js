var express = require("express");
var router = express.Router();
const setupQuery = require("../queries/queries_setup");
const getAllRecipes = require("../queries/queries_recipes");

router.get('/', async (req, res) => {
    try {
        const data = await pool.query(getAllRecipes);
        res.status(200).send(data.rows);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const { version, isPublic, name, description, steps} = req.body;
    const owner_id = req.oidc.user.sub;

    try {
        await pool.query( getAllRecipes.createRecipe, [version, isPublic, name, description, steps, owner_id]);
        res.status(200).send({message: "Recipe created!"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    };
});

router.get("/setup", async (req, res) => {
  try {
    await pool.query(setupQuery);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}); 

module.exports = router;