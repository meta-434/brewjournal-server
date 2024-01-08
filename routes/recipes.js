var express = require("express");
var router = express.Router();
// const setupQuery = require("../queries/queries_setup");
// const getAllRecipes = require("../queries/queries_recipes");
const pool = require("../db");

// TODO: pg pool doesn't like reading queries from a file (see setupQuery.js or queries_recipes.js)
// investigate alternatives to providing full sql queries in the router methods. because it's ugly.

// GET fetch recipe by id
// router.get('/?id=:id', async (req, res) => {
//   console.log('fetching recipe by id: ', req.params.id);
//   try {
//     const data = await pool.query(`select * from recipes where id = $1;`, [req.params.id]);
//     res.status(200).send(data.rows);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

// GET fetch all recipes
router.get('/', async (req, res) => {
  const { id } = req.query;
  console.log('fetching all recipes');
    try {
      if (req.query.id) {
        const data = await pool.query(`select * from recipes where id = $1;`, [id]);
        res.status(200).send(data.rows);
      } else {
        const data = await pool.query(`select * from recipes;`);
        res.status(200).send(data.rows);
      }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});



// POST create new recipe, returns new recipe id
router.post('/', async (req, res) => {
    const { version, isPublic, name, description, steps, owner_id} = req.body;

    try {
        let dbres = await pool.query( 
        `
          insert into recipes (name, description, steps, owner_id) 
          values ($1, $2, $3, $4)
          returning id;
        `, [name, description, steps, owner_id]);
        res.status(200).send({message: "Recipe created!", data: dbres.rows});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    };
});

// PUT update recipe by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { version, isPublic, name, description, steps} = req.body;

  try {
    let dbres = await pool.query(
      `
        update recipes 
        set version = $1, is_public = $2, name = $3, description = $4, steps = $5
        where id = $6
        returning id;
      `, [version+=1, isPublic, name, description, steps, id]);
    res.status(200).send({message: "Recipe updated!", data: dbres.rows});
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  };
});

// =========================================
// GET (create tables + seed DB)
router.get("/setup", async (req, res) => {
  try {
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS recipes (
          id SERIAL PRIMARY KEY,
          version INTEGER DEFAULT 1,
          is_public BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          steps TEXT,
          owner_id INTEGER REFERENCES users(id)
        );
        -- seed db with test data
        INSERT INTO users (email, password) 
        VALUES 
          ('alex@hapgood.me', 'password123'),
          ('garrett@moore.me', 'password456');
        INSERT INTO recipes (name, description, steps, owner_id)
        VALUES
          ('test recipe 1!', 'this is a test recipe entry #1!', '1. grind beans. 2. make coffee. 3. Drink coffee', 1),
          ('test recipe 2!', 'this is a test recipe entry #2!', '1. grind beans BETTER. 2. make coffee BETTER. 3. Drink coffee MORE', 2);
`
    );
    res.status(200).send({message: "Setup complete!"});
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}); 

module.exports = router;