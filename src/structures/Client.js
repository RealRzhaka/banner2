const { Client, GatewayIntentBits } = require("discord.js");
const fs = require(`fs`);
require('dotenv').config()

class ExtendClient extends Client {
    constructor() {
        super({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers] })
    }

    init() {
        this.initEvents();
        this.login(process.env.BOT_TOKEN);
    }

    initEvents() {
        let events = fs.readdirSync('./src/events');
        events.forEach(file => {
            let eventName = file.split(".")[0];
            let event = require(`../events/${file}`);
            this.on(eventName, event.bind(null, this));
        });
    }
}

module.exports = { ExtendClient };