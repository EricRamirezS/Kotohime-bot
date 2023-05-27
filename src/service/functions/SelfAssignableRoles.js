// noinspection ES6MissingAwait

const GuildData = require('../../db/models/GuildData');
const {refreshGuildData} = require('./GuildData')

module.exports = {
    async addOrUpdateSelfAssignableRoles(role, guildId) {
        let data = await this.getGuildData(guildId);
        let roles = JSON.parse(data.self_assignable_roles);
        let flag = true;
        for (let roleData of roles) {
            if (roleData.id !== role.id) continue;
            roleData.emoji = role.emoji;
            roleData.category = role.category;
            flag = false;
            break;

        }
        if (flag) roles.push(role);
        roles = JSON.stringify(roles);

        try {
            await data.update({
                self_assignable_roles: roles
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async removeSelfAssignableRoles(roleId, guildId) {
        let data = await this.getGuildData(guildId);
        let roles = JSON.parse(data.self_assignable_roles);

        const index = roles.map(e => e.id).indexOf(roleId);
        if (index > -1) {
            roles.splice(index, 1);
            roles = [...new Set(roles)];
            roles = JSON.stringify(roles);
            try {
                await data.update({
                    self_assignable_roles: roles
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