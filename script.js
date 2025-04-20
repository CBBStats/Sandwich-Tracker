const form = document.getElementById('sandwichForm');
const list = document.getElementById('sandwichList');

let sandwiches = JSON.parse(localStorage.getItem('sandwiches')) || [];

function saveSandwiches() {
  localStorage.setItem('sandwiches', JSON.stringify(sandwiches));
}

function displaySandwiches() {
  list.innerHTML = '';
  sandwiches.forEach((sandwich, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${sandwich.name}</strong> (${sandwich.date})<br>
      <em>${sandwich.ingredients}</em><br>
      <span>From: ${sandwich.location}</span><br>
      <span>Rating: ${'★'.repeat(sandwich.rating)}${'☆'.repeat(5 - sandwich.rating)}</span>
    `;
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newSandwich = {
    name: document.getElementById('name').value,
    ingredients: document.getElementById('ingredients').value,
    location: document.getElementById('location').value,
    date: document.getElementById('date').value,
    rating: parseInt(document.getElementById('rating').value),
  };
  sandwiches.push(newSandwich);
  saveSandwiches();
  displaySandwiches();
  form.reset();
});

displaySandwiches();
