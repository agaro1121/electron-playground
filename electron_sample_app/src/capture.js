// override method
navigator.getUserMedia = navigator.webkitGetUserMedia;

const video = require('./video');
const countdown = require('./countdown');
const {ipcRenderer: ipc, shell, remote} = require('electron');
const flash = require('./flash');
// remote is a simple way to do ipc between renderer and Main processes


// remote.require -> as if calling require in the main process
// calling vanilla require would never give us access to the cache
// because it was created in the Main process
const images = remote.require('./images');

function formatImgTag(doc, bytes) {
    const div = doc.createElement('div');
    div.classList.add('photo');

    const close = doc.createElement('div');
    close.classList.add('photoClose');

    const img = new Image();
    img.classList.add('photoImg');
    img.src = bytes;

    div.appendChild(img);
    div.appendChild(close);

    return div;
}

window.addEventListener('DOMContentLoaded', _ => {
    const videoEl = document.getElementById('video');
    const canvasEl = document.getElementById('canvas');
    const recordEl = document.getElementById('record');
    const photosEl = document.querySelector('.photosContainer');
    const counterEl = document.getElementById('counter');
    const flashEl = document.getElementById('flash');

    const ctx = canvasEl.getContext('2d');

    video.init(navigator, videoEl);

    recordEl.addEventListener('click', _ => {
        console.log('CLICKED!');
        countdown.start(counterEl, 3, _ => {
            flash(flashEl);
            const bytes = video.captureBytes(videoEl, ctx, canvasEl);
            ipc.send('image-captured', bytes);
            photosEl.appendChild(formatImgTag(document, bytes));
        });
    });

    photosEl.addEventListener('click', evt => {
        // this is a close operation???
        const isRm = evt.target.classList.contains('photoClose');
        const selector = isRm ? '.photoClose' : '.photoImg';

        const photos = Array.from(document.querySelectorAll(selector));
        const index = photos.findIndex(el => el == evt.target);

        if(index > -1){
            if(isRm)
                ipc.send('image-remove', index);
            else
                shell.showItemInFolder(images.getFromCache(index));
        }
    });
});

ipc.on('image-removed', (evt, index) => {
    document.getElementById('photos').removeChild(Array.from(document.querySelectorAll('.photo'))[index]);
});