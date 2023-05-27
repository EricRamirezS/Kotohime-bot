// noinspection ES6MissingAwait

const GuildData = require('../../db/models/GuildData');
const {refreshGuildData} = require('./GuildData');

module.exports = {
    async setGoodbyeChannel(channelId, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                goodbye_channel: channelId
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async setGoodbyeMessage(message, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                goodbye_message: message
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async disableGoodbye(guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                goodbye_channel: null
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
};
