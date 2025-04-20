const form = document.getElementById('sandwichForm');
const list = document.getElementById('sandwichList');
const chartCanvas = document.getElementById('ingredientChart');
let chart;

let sandwiches = JSON.parse(localStorage.getItem('sandwiches')) || [];

function saveSandwiches() {
  localStorage.setItem('sandwiches', JSON.stringify(sandwiches));
}

function displaySandwiches() {
  list.innerHTML = '';
  sandwiches.forEach((sandwich) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${sandwich.name}</strong> (${sandwich.date})<br>
      <em>${sandwich.ingredients}</em><br>
      <span>From: ${sandwich.location}</span><br>
      <span>Rating: ${'★'.repeat(sandwich.rating)}${'☆'.repeat(5 - sandwich.rating)}</span>
    `;
    list.appendChild(li);
  });
  updateIngredientChart();
}

function updateIngredientChart() {
  const ingredientCounts = {};

  sandwiches.forEach(s => {
    const ingredients = s.ingredients.split(',').map(i => i.trim().toLowerCase());
    ingredients.forEach(ing => {
      if (ing) {
        ingredientCounts[ing] = (ingredientCounts[ing] || 0) + 1;
      }
    });
  });

  const labels = Object.keys(ingredientCounts);
  const data = Object.values(ingredientCounts);

  if (chart) chart.destroy(); // reset chart if it already exists

  chart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Ingredient Count',
        data,
        backgroundColor: 'rgba(60, 180, 75, 0.6)',
        borderColor: 'rgba(60, 180, 75, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
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
