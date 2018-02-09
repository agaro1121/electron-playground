const {ipcRenderer} = require('electron');

document.getElementById('start').addEventListener('click', _ => {
    console.log('start clicked !!!');
    // 1. sends message out to ipcMain
    ipcRenderer.send('countdown-start');
});

// 4. received from ipcMain
ipcRenderer.on('countdown', (evt, count) => {
    // 5. display on html page
   document.getElementById('count').innerHTML = count;
});