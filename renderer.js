document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('character-container');

    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();

        data.results.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h3>${character.name}</h3>
                <p>Durum: ${character.status}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('API isteği başarısız:', error);
        container.innerHTML = '<p>Veri yüklenirken hata oluştu.</p>';
    }
});
