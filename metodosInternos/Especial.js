function leaveVoiceChannels(bot) {
    let guilds = bot.guilds.cache.array();
    guilds.forEach(g => {
        let channels = g.channels.cache.array();
        channels.forEach(ch => {
            if (ch.type === 'voice') {
                if (ch.members.size === 1) {
                    if (ch.members.first().user.username === bot.user.username) ch.leave();
                }
            }
        })
    });
}


module.exports = {
    leaveVoiceChannels: leaveVoiceChannels
}