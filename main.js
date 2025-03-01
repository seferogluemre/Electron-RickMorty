const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createMenu() {
    const menuTemplate = [
        {
            label: 'Karakterler',
            submenu: [
                {
                    label: 'Favoriler',
                    click() {
                        // Favoriler tıklandığında yeni bir pencere açılıyor
                        openFavoritesWindow();
                    }
                },
                {
                    label: 'Karakterler Listesi',
                    click() {
                        console.log('Karakterler Listesi seçildi');
                    }
                }
            ]
        },
        {
            label: 'Çıkış',
            submenu: [
                {
                    label: 'Quit',
                    click() {
                        app.quit();
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

// Yeni bir pencere açarak 'favorites.html' dosyasını yükleyen fonksiyon
function openFavoritesWindow() {
    let favoritesWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // favorites.html dosyasını yükle
    favoritesWindow.loadFile(path.join(__dirname, './template/pages/favorites/favorites.html'));

    // Pencere kapatıldığında bellekten temizle
    favoritesWindow.on('closed', () => {
        favoritesWindow = null;
    });
}

app.whenReady().then(() => {

    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, './template/pages/main/index.html'));

    // Menü oluşturuldu
    createMenu();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
