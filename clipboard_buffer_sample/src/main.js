const {app, Menu, Tray, clipboard, globalShortcut} = require('electron');
const path = require('path');

const STACK_SIZE=5;
const ITEM_MAX_LENGTH=20;

function addToStack(item, stack){
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1): stack);
}

function checkClipboardForChange(clipboard, onChange) {
    let cache = clipboard.readText();
    let latest;
    setInterval(_ => {
        latest = clipboard.readText();
        if(latest !== cache) {
            cache = latest;
            onChange(cache);
        }
    }, 1000);
};

function formatItem(item){
    return item && item.length > ITEM_MAX_LENGTH
        ? item.substr(0, ITEM_MAX_LENGTH) + '...'
        : item
};

function formatMenuTemplateForStack(clipboard, stack) {

    return stack.map((item, i) => {
        return {
            label: `${i+1}. Copy: ${formatItem(item)}`,
            click: _ => {
                console.log("write?");
                clipboard.writeText(item);
            },
            accelerator: `Cmd+Alt+${i + 1}` //shortcuts that only work within electron app
        };
    });

};

function registerShortcuts(globalShortcut, clipboard, stack){
    console.log("globalShortcut=",globalShortcut);
    globalShortcut.unregisterAll();
    console.log("setting global shortcuts");
    for(let i = 0; i < STACK_SIZE; i++){
        globalShortcut.register(`Cmd+Alt+${i + 1}`, _ => {
            clipboard.writeText(stack[i]);
        });
    }
    console.log("globalShortcut=",globalShortcut);
};

app.on('ready', _ => {
    let stack = [];
    const tray = new Tray(path.join('img', '16x16.png'));
    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: '<Empty>',
            enabled: false //user cannot interact with this item
        }
    ]));

    checkClipboardForChange(clipboard, text => {
        stack = addToStack(text, stack);
        tray.setContextMenu(Menu.buildFromTemplate(
            formatMenuTemplateForStack(clipboard, stack)
        ));
        registerShortcuts(globalShortcut, clipboard, stack);
        console.log("stack", stack);
    });
});

// CLEAN UP - best practice
app.on('will-quit', _ => {
    globalShortcut.unregisterAll();
});