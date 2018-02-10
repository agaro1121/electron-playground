const {app} = require('electron');

function enabledCycleEffects(items) {
    const nonEffectMenuOffset = 2;
    const selectedIndex = items.findIndex(item => item.checked);
    const nextIndex = selectedIndex + 1 < items.length ? selectedIndex + 1 : nonEffectMenuOffset;
    items[nextIndex].checked = true;
}

module.exports = mainWindow => {
    const name = app.getName();

    const template = [
        {
            label: name,
            submenu: [
                {
                    label: 'About ' + name,
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ' + name,
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: _ => { app.quit() }
                }
            ]
        },
        {
            label: 'Effects',
            submenu: [
                {
                    label: 'Cycle',
                    accelerator: 'Shift+CmdOrCtrl+E',
                    click: menuItem => {
                        enabledCycleEffects(menuItem.menu.items);
                        mainWindow.webContents.send('effect-cycle');
                    }
                },
                {
                    label: 'Vanilla',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose')
                },
                {
                    label: 'Ascii',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'ascii')
                },
                {
                    label: 'Daltonize',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'daltonize')
                },
                {
                    label: 'Filmgrain',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'filmgrain')
                },
                {
                    label: 'Hex',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'hex')
                },
                {
                    label: 'Kaleidoscope',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'kaleidoscope')
                },
                {
                    label: 'Mirror',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'mirror')
                },
                {
                    label: 'Pixelate',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'pixelate')
                },
                {
                    label: 'Ripple',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'ripple')
                },
                {
                    label: 'Scanlines',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'scanlines')
                },
                {
                    label: 'Sketch',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'sketch')
                },
                {
                    label: 'Vibrance',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'vibrance')
                },
                {
                    label: 'Vignette',
                    type: 'radio',
                    click: _ => mainWindow.webContents.send('effect-choose', 'vignette')
                }
            ]
        }
    ];

    return template;
};
