document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const container = document.getElementById('character-container');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('status-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumber = document.getElementById('page-number');
    const themeToggle = document.getElementById('theme-toggle');
    const toggleRemoveFavorites = document.getElementById('toggleRemoveFavorites')

    const fetchCharacters = async (page = 1) => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();
            renderCharacters(data.results);
        } catch (error) {
            console.error('API isteği başarısız:', error);
        }
    };

    const renderCharacters = (characters) => {
        container.innerHTML = "";
        characters.forEach(character => {
            if (!character.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
                searchInput.value !== "") return;

            if (filterSelect.value !== "all" && character.status.toLowerCase() !== filterSelect.value) return;

            const card = document.createElement('div');
            const body = document.createElement('div');
            card.append('body');
            card.classList.add('card');
            card.innerHTML = `
                  <img src="${character.image}" alt="${character.name}">
            `;
            body.innerHTML = `
                <h3>${character.name}</h3>
                <p>Durum: ${character.status}</p>
                <button class="favorite-btn">${favorites.some(fav => fav.id === character.id) ? '❤️' : '🤍'}</button>
            `;
            card.append(body);

            // Favorilere ekleme
            card.querySelector('.favorite-btn').addEventListener('click', () => {
                if (favorites.some(fav => fav.id === character.id)) {
                    favorites = favorites.filter(fav => fav.id !== character.id);
                } else {
                    favorites.push({
                        id: character.id,
                        name: character.name,
                        status: character.status,
                        image: character.image
                    });
                }
                localStorage.setItem('favorites', JSON.stringify(favorites));
                fetchCharacters(currentPage);
            });

            container.appendChild(card);
        });
    };

    // Sayfalama
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            pageNumber.textContent = currentPage;
            fetchCharacters(currentPage);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        pageNumber.textContent = currentPage;
        fetchCharacters(currentPage);
    });

    toggleRemoveFavorites.addEventListener('click', () => {
        localStorage.clear();
    })

    // Arama ve Filtreleme
    searchInput.addEventListener('input', () => fetchCharacters(currentPage));
    filterSelect.addEventListener('change', () => fetchCharacters(currentPage));

    // Tema Değiştirme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    fetchCharacters(currentPage);
});