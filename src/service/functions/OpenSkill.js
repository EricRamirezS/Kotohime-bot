// noinspection ES6MissingAwait

const GuildData = require('../../db/models/GuildData');
const {refreshGuildData} = require('./GuildData');

module.exports = {
    async addOpenSkillRole(roleId, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                open_skill_role: roleId
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async updateOpenSkillInfo(openSkillData, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                open_skill: JSON.stringify(openSkillData)
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
};