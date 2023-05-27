// noinspection ES6MissingAwait

const GuildData = require('../../db/models/GuildData');
const {refreshGuildData} = require('./GuildData');

module.exports = {
    async setLanguage(language, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                language: language
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
};