const themeToggle = document.getElementById('theme-toggle');
const favoritesRow = document.getElementById('favoriteCharacters-row');

// LocalStorage'dan karakterleri getir ve ekrana bas
const getLocalCharacters = () => {
    const characters = JSON.parse(localStorage.getItem('favorites') || '[]'); // Boş dizi için []

    favoritesRow.innerHTML = ""; // Önce temizle ki tekrar çağrıldığında çift veri olmasın

    characters.forEach((data) => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('col-lg-4');

        characterCard.innerHTML = `  
            <div class="card">
                <div class="card-header">
                    <img src="${data.image}" class="img-fluid" alt="${data.name}">
                </div>
                <div class="card-body">
                    <p class="card-text">${data.name}</p>
                    <p class="card-text">${data.status}</p>
                </div>
            </div>
        `;

        favoritesRow.appendChild(characterCard);
    });
};

// Tema Değiştirme işlemleri
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Sayfa yüklendiğinde favori karakterleri getir
document.addEventListener('DOMContentLoaded', () => {
    getLocalCharacters();
});
