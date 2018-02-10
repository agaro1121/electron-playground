const {app, BrowserWindow, Tray, Menu} = require('electron');
const path = require('path');

let mainWindow;


app.on('ready', _ => {
    const tray = new Tray(path.join('img', '16x16.png'));

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Wow',
            click: _ => {
                console.log('wow!!!')
            }
        },{
            label: 'Awesome',
            click: _ => {
                console.log('Awesome!!!')
            }
        }
    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip('My great app!');

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
});