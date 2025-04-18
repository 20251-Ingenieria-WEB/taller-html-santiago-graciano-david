// Get references to DOM elements
const input = document.getElementById("input-search");
const button = document.getElementById("btn-search");
const resultsContainer = document.getElementById("character-result");

/**
 * Fetch and display characters from the Rick and Morty API.
 * @param {string} name - Character name to search for (optional).
 */
async function showCharacters(name = "") {
  // Show a loading message while fetching data
  resultsContainer.innerHTML = "<p><strong>Loading...</strong></p>";

  try {
    // Fetch characters filtered by name
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );
    const data = await response.json();

    // If there's an error (e.g., no results), show a message
    if (data.error) {
      resultsContainer.innerHTML = "<p><strong>No results found.</strong></p>";
      return;
    }

    // Display up to 10 characters with image, name, and species
    resultsContainer.innerHTML = data.results
      .slice(0, 10)
      .map(
        (character) => `
        <div class="character-card">
          <img src="${character.image}" alt="${character.name}" />
          <h3>${character.name}</h3>
          <p>Species: ${character.species}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    // Handle network or API errors
    console.error("Error fetching data:", error);
    resultsContainer.innerHTML =
      "<p><strong>Error fetching data. Please try again.</strong></p>";
  }
}

// Automatically show default characters when the page loads
window.addEventListener("DOMContentLoaded", () => {
  showCharacters(); // No name passed = list initial characters
});

// Run a search when the user clicks the "Search" button
button.addEventListener("click", () => {
  const name = input.value.trim().toLowerCase();
  showCharacters(name);
});
