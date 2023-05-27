// noinspection ES6MissingAwait

const GuildData = require('../../db/models/GuildData');
const {refreshGuildData} = require('./GuildData');

module.exports = {
    async setWelcomeChannel(channelId, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                welcome_channel: channelId
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async setWelcomeMessage(message, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                welcome_message: message
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async disableWelcome(guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                welcome_channel: null
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
};