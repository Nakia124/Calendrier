
"use strict";
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
let mainWindow;
const template = [
    {
        label: "Fichier",
        submenu: [
            {
                label: "Ajouter un evenement",
                click: () => {
                    const secondWindow = new BrowserWindow({
                        width: 800,
                        height: 600,
                        parent: mainWindow,
                        modal: true,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false
                        }
                    });
                    //secondWindow.setMenu(menu)
                    secondWindow.loadFile('second.html');
                }
            },
            {
                type: "separator"
            },
            {
                label: "Quitter",
                role: "quit"
            }
        ]
    }
];
const template2 = [
    {
        label: "Outils",
        role: "toggleDevTools"
    }
];
const menu = Menu.buildFromTemplate(template);
const menu2 = Menu.buildFromTemplate(template2);
ipcMain.handle('ouverture-context-menu', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    menu2.popup(win);
});
const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
          }       
    });
    //menu sur la fenêtre
    //  mainWindow.setMenu(menu)
    mainWindow.loadFile('index.html')
};
Menu.setApplicationMenu(menu);
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
