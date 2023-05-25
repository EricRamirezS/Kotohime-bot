const {Events, GuildMember, Client} = require('discord.js');
const service = require('../../service/GuildDataService');

module.exports = {
    name: Events.GuildMemberRemove,

    /**
     *
     * @param member {GuildMember}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    async execute(member, client) {
        let data = await service.getGuildData(member.guild.id);
        if (data.goodbye_channel && data.goodbye_message)
            sendGoodbye(data.goodbye_channel, data.goodbye_message, member, client);
    }
};

/**
 *
 * @param channelId {string}
 * @param message {string}
 * @param member {GuildMember}
 * @param client {Client}
 */
function sendGoodbye(channelId, message, member, client) {
    try {
        let channel = client.channels.cache.get(channelId);
        const data = {
            'now': Date.now(),
            'username': member.user.username,
            'mention': `<@${member.id}>`
        };

        channel.send(message
            .replaceAll('\\n', '\n')
            .replace('{USERNAME}', data['username'])
            .replace('{NOW}', data['now'])
            .replace('{USER_MENTION}', data['mention'])
        );
    } catch (e) {
        console.error(e);
    }
}