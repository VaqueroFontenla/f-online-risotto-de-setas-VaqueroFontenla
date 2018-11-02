'use strict';
const nameRecipe = document.querySelector('.name-recipe');
const ingredientsList = document.querySelector('.ingredients-list');
let list = '';

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const name = data.recipe.name;
    showNameRecipe(name);
    const currency = data.recipe.currency
    const ingredients = data.recipe.ingredients;
    showIngredients(ingredients, currency);
  });


function showNameRecipe(recipe) {
  nameRecipe.innerHTML = recipe
}

function showIngredients(ingredients, currency) {
  for (const ingredient of ingredients) {

    list +=
      '<li class="article">' +
      '<div class="article__block1">' +
      '<input type="checkbox" name="product" id="product' + ingredient.items + '"  class="checkbox"/>' +
      '<input type="number" class="quantity" name="quantity" min="0" max="10" value="1"/>' +
      '<div class="group">' +
      '<span class="product">' + ingredient.product + '</span>' +
      '<span class="brand">' + (ingredient.brand ? ingredients.brand : '') + '</span>' +
      '<span class="items">' + parseFloat(ingredient.quantity) + '</span>' +
      '</div>' +
      '</div>' +
      '<div class="article__block2">' +
      '<span class="price">' + parseFloat(ingredient.price).toFixed(2) + '</span> ' +
      '<span class="currency">' + currency + '</span>' +
      '</div>' +
      '</li>';
  }
  ingredientsList.innerHTML = list;
}