const planetsContainer = document.getElementById('planets-container');
const paginationContainer = document.getElementById('pagination-container');
let nextPage = 'https://swapi.dev/api/planets/?format=json';
let prevPage = null;

async function fetchPlanets(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        nextPage = data.next;
        prevPage = data.previous;

        displayPlanets(data.results);
        displayPagination();
    } catch (error) {
        console.error('Error fetching planets:', error);
    }
}

function displayPlanets(planets) {
    planetsContainer.innerHTML = '';
    planets.forEach(planet => {
        const residentsList = planet.residents.map(resident => `<li>${resident}</li>`).join('');

        const planetCard = `
            <div class="card">
                <h2>${planet.name}</h2>
                <p><strong>Climate:</strong> ${planet.climate}</p>
                <p><strong>Population:</strong> ${planet.population}</p>
                <p><strong>Terrain:</strong> ${planet.terrain}</p>
                <div class="residents">
                    <h3>Residents:</h3>
                    <ul>${residentsList}</ul>
                </div>
            </div>
        `;
        planetsContainer.innerHTML += planetCard;
    });
}

function displayPagination() {
    paginationContainer.innerHTML = '';
    if (prevPage) {
        const prevPageButton = document.createElement('button');
        prevPageButton.textContent = 'Previous Page';
        prevPageButton.addEventListener('click', () => fetchPlanets(prevPage));
        paginationContainer.appendChild(prevPageButton);
    }
    if (nextPage) {
        const nextPageButton = document.createElement('button');
        nextPageButton.textContent = 'Next Page';
        nextPageButton.addEventListener('click', () => fetchPlanets(nextPage));
        paginationContainer.appendChild(nextPageButton);
    }
}

fetchPlanets(nextPage);

