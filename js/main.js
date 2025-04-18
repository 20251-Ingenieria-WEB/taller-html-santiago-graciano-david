const input = document.getElementById("input-search");
const button = document.getElementById("btn-search");
const resultsContainer = document.getElementById("character-result");

// Function to fetch and display characters
async function showCharacters(nombre = "") {
  resultsContainer.innerHTML = "<p><strong>Loading...</strong></p>";

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`);
    const data = await response.json();

    if (data.error) {
      resultsContainer.innerHTML = "<p><strong>No results found.</strong></p>";
      return;
    }

    resultsContainer.innerHTML = data.results
      .slice(0, 10)
      .map(personaje => `
        <div class="character-card">
          <img src="${personaje.image}" alt="${personaje.name}" />
          <h3>${personaje.name}</h3>
          <p>Species: ${personaje.species}</p>
        </div>
      `)
      .join("");
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsContainer.innerHTML = "<p><strong>Error fetching data. Please try again.</strong></p>";
  }
}

// Show characters on page load
window.addEventListener("DOMContentLoaded", () => {
  showCharacters(); // sin nombre, muestra primeros
});

// Show characters on button click
button.addEventListener("click", () => {
  const nombre = input.value.trim().toLowerCase();
  showCharacters(nombre);
});
