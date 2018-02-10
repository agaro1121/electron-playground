const {app, BrowserWindow} = require('electron');


let mainwindow;

app.on('ready', _ => {
    console.log("Saluton Mondo");

    mainwindow = new BrowserWindow({
       width: 400,
       height: 100
    });

    mainwindow.loadURL(`file://${__dirname}/status.html`);

    mainwindow.on('close', _ => {
        mainwindow = null;
    });
});