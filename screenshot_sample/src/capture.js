const { ipcRenderer: ipc, desktopCapturer, screen } = require('electron');
const path = require('path');
const fs = require('fs');

/*
* desktopCapturer - could contain one of many sources: images, videos, audio, etc...
* screen - screen functions
* done - callback
* */
function getMainSource(desktopCapturer, screen, done) {
    const options = {
        types: ['screen'],
        thumbnailSize: screen.getPrimaryDisplay().workAreaSize //set capture size as original screen size
    };

    desktopCapturer.getSources(options, (err, sources) => {
        if(err) return console.log('Cannot capture screen', err);

        //filter function
        const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1';

        done(sources.filter(isMainSource)[0]);
    });
};

function writeScreenshot(png, filePath){
    fs.writeFile(filePath, png, err => {
        if(err) return console.log('Failed to write screen', err);
    });
};

function onCapture(evt, targetDir) {
    console.log('capture?!?!?!'); // shows up in Dev Tools
    getMainSource(desktopCapturer, screen, source => {
        const png = source.thumbnail.toPng();
        const filePath = path.join(targetDir, new Date() + '.png');
        writeScreenshot(png, filePath)
    });
};

ipc.on('capture', onCapture);