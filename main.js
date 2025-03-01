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
                        console.log('Favoriler seçildi');
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

    // Menü oluşturuluyor
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
