const {app, BrowserWindow, globalShortcut} = require('electron');

let mainWindow;

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 0,
        height: 0,
        resizable: false,
        frame: false
    });

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    mainWindow.openDevTools();

    mainWindow.on('close', _ => {
        mainWindow = null;
    });

    globalShortcut.register('Ctrl+Alt+Cmd+D', _ => {
        console.log('Got shortcut!');
        mainWindow.webContents.send('capture', app.getPath('pictures'));
    });
});

