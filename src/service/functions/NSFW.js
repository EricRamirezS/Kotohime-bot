// noinspection ES6MissingAwait

const GuildData = require('../../db/models/GuildData');
const {refreshGuildData} = require('./GuildData');

module.exports = {
    async setNsfwCommands(bool, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                allow_nsfw_commands: bool
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
};