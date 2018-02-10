const {app, BrowserWindow, ipcMain: ipc} = require('electron');
const images = require('./images');
let mainWindow;

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 725,
        resizable: false
    });


    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    mainWindow.webContents.openDevTools();

    images.mkDir(images.getPicturesDir(app));

    mainWindow.on('close', _ => {
       mainWindow = null;
    });

});

ipc.on('image-captured', (evt, contents) => {
    images.save(images.getPicturesDir(app), contents, (err, imgPath) => {
        images.cache(imgPath);
    });
});

ipc.on('image-remove', (evt, index) => {
    images.rm(index, _ => {
        evt.sender.send('image-removed', index);
    });
});
