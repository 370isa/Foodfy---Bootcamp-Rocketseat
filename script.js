const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener('click', function() {
    const image = card.querySelector('img');
    const imgSrc = image.getAttribute('src');
    const imgAlt = image.getAttribute('alt');
    const nameEat = card.querySelector('h4').innerHTML;
    const byName = card.querySelector('span').innerHTML;

    modalOverlay.classList.add('active');
    modalOverlay.querySelector('img').src = `${imgSrc}`;
    modalOverlay.querySelector('img').alt  = `${imgAlt}`;
    modalOverlay.querySelector('h2').textContent  = `${nameEat}`;
    modalOverlay.querySelector('p').textContent  = `${byName}`;
  });
}

document.querySelector('.close-modal').addEventListener('click', function() {
  modalOverlay.classList.remove('active');
});
