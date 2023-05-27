// noinspection ES6MissingAwait

const GuildData = require('../../db/models/GuildData');
const {refreshGuildData} = require('./GuildData')

module.exports = {
    async addDefaultRoles(role, guildId) {
        let data = await this.getGuildData(guildId);
        let roles = JSON.parse(data.default_roles);

        roles.push(role)
        roles = new Set(roles)
        roles = JSON.stringify([...roles]);

        try {
            await data.update({
                default_roles: roles
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async removeDefaultRoles(roleId, guildId) {
        let data = await this.getGuildData(guildId);
        let roles = JSON.parse(data.default_roles);

        const index = roles.indexOf(roleId);
        if (index > -1) {
            roles.splice(index, 1);
            roles = [...new Set(roles)];
            roles = JSON.stringify(roles);
            try {
                await data.update({
                    default_roles: roles
                });
                refreshGuildData();
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        }
        return false;
    }
}