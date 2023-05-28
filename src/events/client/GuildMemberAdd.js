const {Events, GuildMember, Client} = require('discord.js');
const {getGuildData} = require('../../service/GuildDataService');
const templateMessage = require('../../utils/TemplateMessage');

module.exports = {
    name: Events.GuildMemberAdd,

    /**
     *
     * @param member {GuildMember}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    async execute(member, client) {
        let data = await getGuildData(member.guild.id);
        await defaultRoles(member, data.default_roles);
        if (data.welcome_channel && data.welcome_message) {
            const channel = member.guild.channels.cache.get(data.welcome_channel)
            if (channel)
                channel.send(templateMessage(member, data.welcome_message));
        }
    }
};

async function defaultRoles(member, roles) {
    roles = JSON.parse(roles);
    for (let roleId of roles) {
        let role = await member.guild.roles.cache.get(roleId);
        if (role) {
            await member.roles.add(role);
        }
    }
}