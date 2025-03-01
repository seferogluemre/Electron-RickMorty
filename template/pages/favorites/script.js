const themeToggle = document.getElementById('theme-toggle');


const getLocalCharacters = () => {

}

// Tema Değiştirme işlemleri
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}