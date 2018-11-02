'use strict';
const nameRecipe = document.querySelector('.name-recipe');
const ingredientsList = document.querySelector('.ingredients-list');

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.recipe)
    name = data.recipe.name;
    showNameRecipe(name);
    ingredients = data.recipe.ingredients;
    showIngredients(ingredients);

  });


function showNameRecipe(recipe) {
  nameRecipe.innerHTML = recipe
}

function showIngredients(ingredientsRecipe) {
  for (const ingredient in ingredientsRecipe) {

  }

}