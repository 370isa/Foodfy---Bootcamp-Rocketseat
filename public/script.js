const currentPage = location.pathname;
const menuItens = document.querySelectorAll('header .links a');

for (item of menuItens) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active');
  }
}

const recipes = document.querySelectorAll('.recipes');

function openBlock(recipe, recipeClass) {
  let blockSelected = recipe.querySelector(`.event-open-block-${recipeClass}`);
  blockSelected.addEventListener('click', function() {
    let isActivited = recipe.querySelector(`.list-details.${recipeClass}`).classList.toggle('active');
    console.log(isActivited);
    blockSelected.innerHTML = isActivited ? 'Fechar' : 'Abrir';
  });
}

for (let recipe of recipes) {
  openBlock(recipe, 'ingredient');
  openBlock(recipe, 'preparation');
  openBlock(recipe, 'informations');
}

function addInput(input) {
  const inputs = document.querySelector(`#${input}s`);
  const fieldContainer = document.querySelectorAll(`.${input}`);
  const inputsButton = document.querySelector(`#${input}s button`);

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  inputs.appendChild(newField);
  inputs.appendChild(inputsButton);
}
