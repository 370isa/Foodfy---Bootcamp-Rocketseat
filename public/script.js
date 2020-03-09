const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener('click', function() {
    const recipeId = card.getAttribute('id');
    window.location.href = `/recipe?id=${recipeId}`;
  });
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
