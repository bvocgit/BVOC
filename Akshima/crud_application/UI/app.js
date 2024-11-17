const apiUrl = 'http://localhost:8082/api/recipes'; // Your backend URL

// Function to fetch and display all recipes
async function fetchRecipes() {
  const response = await fetch(apiUrl);
  const recipes = await response.json();
  const recipesContainer = document.getElementById('recipesContainer');
  recipesContainer.innerHTML = '';
  
  recipes.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Category:</strong> ${recipe.category}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <button onclick="deleteRecipe(${recipe.id})">Delete</button>
    `;
    recipesContainer.appendChild(recipeDiv);
  });
}

// Function to add a new recipe
document.getElementById('recipeForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const ingredients = document.getElementById('ingredients').value;
  const instructions = document.getElementById('instructions').value;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, category, ingredients, instructions })
  });
  
  if (response.ok) {
    fetchRecipes(); // Refresh the list after adding
    document.getElementById('recipeForm').reset(); // Clear the form
  }
});

// Function to delete a recipe
async function deleteRecipe(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchRecipes(); // Refresh the list after deleting
}

// Fetch and display recipes on page load
fetchRecipes();
