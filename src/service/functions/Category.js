// noinspection ES6MissingAwait

const GuildData = require('../../db/models/GuildData');
const {refreshGuildData} = require('./GuildData');

module.exports = {
    async addOrUpdateCategory(category, guildId) {
        let data = await this.getGuildData(guildId);
        let categories = JSON.parse(data.roles_categories);

        let flag = true;
        for (let categoryData of categories) {
            if (categoryData.name !== category.name) continue;
            categoryData.description = category.description;
            flag = false;
            break;
        }
        if (flag) categories.push(category);
        categories = JSON.stringify(categories);

        try {
            await data.update({
                roles_categories: categories
            });
            refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async removeCategory(category, guildId) {
        let data = await this.getGuildData(guildId);
        let categories = JSON.parse(data.roles_categories);

        const index = categories.map(e => e.name).indexOf(category);
        if (index > -1) {
            categories.splice(index, 1);
            categories = [...new Set(categories)];
            categories = JSON.stringify(categories);
            try {
                await data.update({
                    roles_categories: categories
                });
                refreshGuildData();
                let roles = JSON.parse(data.self_assignable_roles);
                for (let role of roles) {
                    if (role.category === category) {
                        role.category = null;
                        await this.addOrUpdateSelfAssignableRoles(role, guildId);
                    }
                }
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        }
        return false;
    }
};