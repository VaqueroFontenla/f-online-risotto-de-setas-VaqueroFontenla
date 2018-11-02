'use strict';
const nameRecipe = document.querySelector('.name-recipe');
const ingredientsList = document.querySelector('.ingredients-list');
let list = '';
const shippingCostHTML = document.querySelector('.shipping__price');
const currencyHTML = document.querySelector('.currency');

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
    const shippingCost = data.recipe["shipping-cost"];
    showShippingCost(shippingCost);
    showCurrency(currency);
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
      '<span class="brand">' + (ingredient.brand ? ingredient.brand : '') + '</span>' +
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

function showShippingCost(shippingCost) {
  shippingCostHTML.innerHTML = shippingCost
};

function showCurrency(currency) {
  currencyHTML.innerHTML = currency
};


function getIngredients() {
  console.log('Vir');
  // for (const ingredientRecipe of ingredientsRecipe) {
  //   //console.log('no me lo creo');
  //   if (ingredientRecipe.checked = true) {
  //     console.log('no me lo creo')
  //   }
  // }
  //console.log(ingredientRecipe.checked)
}
document.querySelector('.checkbox').addEventListener('click', 'getIngredients');