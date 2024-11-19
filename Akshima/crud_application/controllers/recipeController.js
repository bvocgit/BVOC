const Recipe = require('../models/recipeModel');

exports.getAllRecipes = (req, res) => {
  Recipe.getAllRecipes((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getRecipeById = (req, res) => {
  Recipe.getRecipeById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.createRecipe = (req, res) => {
  const recipeData = req.body;
  Recipe.createRecipe(recipeData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...recipeData });
  });
};

exports.updateRecipe = (req, res) => {
  const recipeData = req.body;
  Recipe.updateRecipe(req.params.id, recipeData, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Recipe updated successfully' });
  });
};

exports.deleteRecipe = (req, res) => {
  Recipe.deleteRecipe(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Recipe deleted successfully' });
  });
};
