const { ChannelType } = require("discord-api-types/v10");
const Banner = require("../structures/Banner");
require('dotenv').config()

class Utils {
    static getGuildInfo(guild) {
        let channels = guild.channels.cache.filter(c => c.type == ChannelType.GuildVoice || c.type == ChannelType.GuildStageVoice);

        let online = 0;
        for (const [id, channel] of channels) online += channel.members.size;

        let members = guild.memberCount;

        return { members, online };
    }

    static async setBanner(client) {
        let guild = client.guilds.cache.get(process.env.GUILD_ID);

        if (!guild) return;

        let guildInfo = this.getGuildInfo(guild);

        let banner = new Banner(guildInfo);
        let buffer = await banner.draw();

        guild.setBanner(buffer);
    }

    static convertMinutes(mins) {
        return mins * 60000;
    }
};

module.exports = Utils