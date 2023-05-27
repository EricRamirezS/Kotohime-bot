const GuildData = require('../../db/models/GuildData');
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
    }
};