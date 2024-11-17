const db = require('../config/db');

const Recipe = {
  getAllRecipes: (callback) => {
    db.query('SELECT * FROM recipe', callback);
  },

  getRecipeById: (id, callback) => {
    db.query('SELECT * FROM recipe WHERE id = ?', [id], callback);
  },

  createRecipe: (recipeData, callback) => {
    db.query('INSERT INTO recipe SET ?', recipeData, callback);
  },

  updateRecipe: (id, recipeData, callback) => {
    db.query('UPDATE recipe SET ? WHERE id = ?', [recipeData, id], callback);
  },

  deleteRecipe: (id, callback) => {
    db.query('DELETE FROM recipe WHERE id = ?', [id], callback);
  }
};

module.exports = Recipe;
