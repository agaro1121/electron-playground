const { app, BrowserWindow, ipcMain } = require('electron');

const countdown = require('./countdown');

let mainWindow;

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 400
    });

    mainWindow.loadURL(`file://${__dirname}/countdown.html`);


    mainWindow.on('closed', _ => {
        console.log("main window closed !!!");
        mainWindow = null;
    })
});

// 2. received from ipcRenderer
ipcMain.on('countdown-start', _ => {
    console.log('caught it!');
    // 3. sent to renderer(since it is being pulled in from the html page)
    countdown(count => {
        mainWindow.webContents.send('countdown', count);
    });
});