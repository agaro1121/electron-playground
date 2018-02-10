const {app, BrowserWindow, Menu} = require('electron');

let browserWindow;

app.on('ready', _ => {
    browserWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    const name = app.getName();
    const template = [
        {
            // this will not change in dev mode
            label: name,
            submenu: [
                {
                    label: `About ${name}`,
                    click: _ => {
                        console.log("clicked about !");
                    },
                    role: 'about' // pulls up about dialogue built into OS
                },
                {
                    type: 'separator' // horizontal line separation
                },
                {
                    label: 'Quit',
                    click: _ => {
                        app.quit();
                    },
                    accelerator: 'Cmd+Q' // keyboard shortcut for this menu item
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

});