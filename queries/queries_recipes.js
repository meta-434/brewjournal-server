const getAllRecipes = 'select * from recipes';
const getAllUserRecipes = 'select * from recipes where owner_id = $1';
const getRecipeById = 'select * from recipes where id = $1';
const createRecipe = 'insert into recipes (version, is_public, name, description, steps, owner_id) values ($1, $2, $3, $4, $5, $6) returning *';
const updateRecipe = '';
const deleteRecipe = 'drop table recipes where id = $1';

module.exports = { getAllRecipes, getRecipeById, getAllUserRecipes, createRecipe, updateRecipe, deleteRecipe };