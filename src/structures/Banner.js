const Canvas = require("../util/Canvas");

class Banner {
    constructor(info) {
        this.online = info.online;
        this.members = info.members;

        this.size = {
            width: 960,
            height: 540
        };
    }

    createCanvas() {
        this.canvas = Canvas.createCanvas(this.size.width, this.size.height);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'white';
    }

    _setColor(color) {
        this.ctx.fillStyle = color;
    }

    _setInvisible(amount) {
        this.ctx.globalAlpha = amount;
    }

    _setFont(font) {
        this.ctx.font = `${font.weight} ${font.size}px ${font.family}`;
    }

    _drawText(text, font, color, invise, x, y) {
        this._setFont(font);
        this._setColor(color);
        this._setInvisible(invise);

        this.ctx.fillText(text, x, y);

        this._setInvisible(1);
    }

    async draw() {
        this.createCanvas();

        let background = await Canvas.loadImage('./src/assets/images/background.png');
        this.ctx.drawImage(background, 0, 0, this.size.width, this.size.height);

        let fontObj = { weight: 500, size: 40, family: 'Gilroy' };

        this._setFont(fontObj);
        let fontSize = this.ctx.measureText('0');

        this._drawText(this.online.toString(), fontObj, '#000000', 1, 586, 442 + 36);
        this._drawText(this.members.toString(), fontObj, '#000000', 1, 781, 442 + 36);

        return this.canvas.encode('png');
    }
}

module.exports = Banner;