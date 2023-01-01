const {Events, VoiceState, Client} = require('discord.js');
const service = require('../../service/GuildDataService');

module.exports = {
    name: Events.VoiceStateUpdate,

    /**
     *
     * @param olState {VoiceState}
     * @param newState {VoiceState}
     * @param client {Client}
     * @return {Promise<void>}
     */
    async execute(olState, newState, client) {
        let data = await service.getGuildData(newState.guild.id);

        if (data.voice_log_channel) sendLog(olState, newState, data.voice_log_channel, client);
    }
};

function sendLog(olState, newState, channelId, client) {
    try {
        if (olState.channelId === newState.channelId) return;

        let channel = client.channels.cache.get(channelId);
        let joined = !olState.channelId && newState.channelId;
        let left = olState.channelId && !newState.channelId;
        let member = newState.guild.members.cache.get(newState.id);

        if (joined) {
            channel.send(`**${member.displayName}** has joined to <#${newState.channelId}>`);
        } else if (left) {
            channel.send(`**${member.displayName}** left <#${olState.channelId}>`);
        } else {
            channel.send(`**${member.displayName}** has moved from <#${olState.channelId}> to <#${newState.channelId}>`);
        }
    } catch (e) {
        console.error(e);
    }
}