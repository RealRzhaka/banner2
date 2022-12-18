const Canvas = require('@napi-rs/canvas');
const path = require('path');
const fs = require('fs');

let families = fs.readdirSync('./src/assets/fonts');

families.forEach(family => {
    let fonts = fs.readdirSync((`./src/assets/fonts/${family}`)).filter(file => file.endsWith(".ttf"));
    fonts.forEach(font => {
        Canvas.GlobalFonts.registerFromPath((`./src/assets/fonts/${family}/${font}`), family);
    });
});

module.exports = Canvas;