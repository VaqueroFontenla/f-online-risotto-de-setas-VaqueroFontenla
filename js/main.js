'use strict';
const nameRecipe = document.querySelector('.name-recipe');
const ingredientsList = document.querySelector('.ingredients-list');
let list = '';
const shippingCostHTML = document.querySelector('.shipping__price');
const currencyHTML = document.querySelector('.currency');
const select = document.querySelector('.select__all');
const unselect = document.querySelector('.unselect__all');
const itemsNumber = document.querySelector('.items__number');
const subtotalPrice = document.querySelector('.subtotal__price');
const totalPrice = document.querySelector('.total__price');
const totalButton = document.querySelector('.total__button');

// LLamada a la API

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
    selectIngredients();
  });

// Mostrar los valores de la receta

function showNameRecipe(recipe) {
  nameRecipe.innerHTML = recipe
}

function showIngredients(ingredients, currency) {
  for (const ingredient of ingredients) {
    list +=
      '<li class="article">' +
      '<div class="article__group">' +
      '<div class="article__block1">' +
      '<input type="checkbox" name="product" id="product' + ingredient.items + ' "class="checkbox" value= ' + ingredient.price.toFixed(2) +
      '/>' +
      '<input type="number" class="quantity" name="quantity" min="0" max="10" value="' + ingredient.items + '"/>' +
      '</div>' +
      '<div class="article__block2">' +
      '<span class="product">' + ingredient.product + '</span>' +
      '<span class="brand">' + (ingredient.brand ? ingredient.brand : '') + '</span>' +
      '<span class="items">' + ingredient.quantity + '</span>' +
      '</div>' +
      '</div>' +
      '<div class="article__block3">' +
      '<span class="price">' + parseFloat(ingredient.price).toFixed(2) + '</span> ' +
      '<span class="currency">' + currency + '</span>' +
      '</div>' +
      '</li>';
  }
  ingredientsList.innerHTML = list;
  const checkbox = document.querySelector('.checkbox');
}

function showShippingCost(shippingCost) {
  shippingCostHTML.innerHTML = shippingCost
};

function showCurrency(currency) {
  currencyHTML.innerHTML = currency
};


// Obtenemos los valores de cantidad y el número total de items

function selectIngredients() {
  const checkbox = document.querySelectorAll('.checkbox');
  const quantity = document.querySelectorAll('.quantity');
  checkbox.forEach((check) => {
    return check.addEventListener('click', getIngredients);
  });
  quantity.forEach((q) => {
    return q.addEventListener('change', getIngredients);
  });
}

function getIngredients() {
  const checkbox = document.querySelectorAll('.checkbox');
  const checkboxChecked = document.querySelectorAll('.checkbox:checked');
  let totalItems = checkboxChecked.length;
  itemsNumber.innerHTML = totalItems;
  let subTotal = 0;
  let total = 0;

  for (let check of checkbox) {
    if (check.checked === true) {
      const quantity = check.nextSibling.value;
      subTotal += parseFloat(check.defaultValue) * quantity;
    } else if (check.checked === false) {
      subTotal == '00.00';
    }
    subtotalPrice.innerHTML = subTotal.toFixed(2);
    total = subTotal + parseFloat(shippingCostHTML.innerHTML);
    totalPrice.innerHTML = total.toFixed(2);
    totalButton.innerHTML = total.toFixed(2);
  }
}

/* Menú para seleccionar/deseleccionar todos los items */

function selectAll() {
  const checkedAll = document.querySelectorAll('.checkbox');
  for (let i = 0; i < checkedAll.length; i++) {
    checkedAll[i].checked = 1;
  }
  getIngredients()
}

function unselectAll() {
  const uncheckedAll = document.querySelectorAll('.checkbox');
  for (let i = 0; i < uncheckedAll.length; i++) {
    uncheckedAll[i].checked = 0;
  }
  getIngredients()
}

select.addEventListener('click', selectAll);
unselect.addEventListener('click', unselectAll);