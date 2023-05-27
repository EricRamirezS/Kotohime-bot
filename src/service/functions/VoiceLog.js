// noinspection ES6MissingAwait

const GuildData = require('../../db/models/GuildData');
const {refreshGuildData} = require('./GuildData');

module.exports = {
    async setLogChannelId(channelId, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                voice_log_channel: channelId
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async disableVoiceLog(guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                voice_log_channel: null
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}