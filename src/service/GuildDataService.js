const GuildData = require('../db/models/GuildData');
const {Model} = require('sequelize');


module.exports = {

    /**
     *
     * @param guildId {string}
     * @return {Model|null|GuildData|*}
     */
    getQuickGuildData(guildId) {
        if (guildId in GUILD_DATA) {
            return GUILD_DATA[guildId];
        }
        return null;
    },

    async refreshGuildData() {
        try {
            let guildData = await GuildData.findAll({
                logging: false,
            });
            await guildData.every(data => {
                GUILD_DATA[data.id] = data;
            });
        } catch (e) {
            console.log('SKIPPING REFRESH');
            console.error(e);
        }
    },

    /**
     *
     * @param guildId {string}
     * @param refresh {boolean}
     * @returns {Model|null|GuildData|*}
     */
    getGuildData: async (guildId, refresh = true) => {
        let guildData = await GuildData.findByPk(guildId);

        if (guildData) {
            GUILD_DATA[guildId] = guildData;
            return await guildData;
        }
        let data = await GuildData.create({id: guildId});
        GUILD_DATA[guildId] = guildData;
        if (refresh) await this.refreshGuildData();
        return data;
    },

    async addSelfAssignableRoles(roleId, guildId) {
        let data = await this.getGuildData(guildId);
        let roles = JSON.parse(data.self_assignable_roles);

        roles.push(roleId);
        roles = [...new Set(roles)];
        roles = JSON.stringify(roles);

        try {
            await data.update({
                self_assignable_roles: roles
            });
            this.refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async removeSelfAssignableRoles(roleId, guildId) {
        let data = await this.getGuildData(guildId);
        let roles = JSON.parse(data.self_assignable_roles);

        const index = roles.indexOf(roleId);
        if (index > -1) { // only splice array when item is found
            roles.splice(index, 1);
            roles = [...new Set(roles)];
            roles = JSON.stringify(roles);
            try {
                await data.update({
                    self_assignable_roles: roles
                });
                this.refreshGuildData();
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        }
        return true;
    },

    async setWelcomeChannel(channelId, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                welcome_channel: channelId
            });
            this.refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async setGoodbyeChannel(channelId, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                goodbye_channel: channelId
            });
            this.refreshGuildData();
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
            this.refreshGuildData();
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
            this.refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async setLogChannelId(channelId, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                voice_log_channel: channelId
            });
            this.refreshGuildData();
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
            this.refreshGuildData();
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
            this.refreshGuildData();
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
            this.refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async setLanguage(language, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                language: language
            });
            this.refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async setNsfwCommands(bool, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                allow_nsfw_commands: bool
            });
            this.refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async addOpenSkillRole(roleId, guildId) {
        let data = await this.getGuildData(guildId);

        try {
            await data.update({
                open_skill_role: roleId
            });
            this.refreshGuildData();
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
            this.refreshGuildData();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
};