const {Events, Guild, Client, ActivityType} = require('discord.js');
const {getGuildData} = require('../../service/GuildDataService');

module.exports = {
    name: Events.GuildCreate,

    /**
     *
     * @param guild {Guild}
     * @param client {Client}
     * @return {Promise<void>}
     */
    async execute(guild, client) {
        await getGuildData(guild.id);
        updatePresence(client);
    },
};

async function updatePresence(client){
    const guildCount = await (await client.shard.fetchClientValues('guilds.cache.size'))
        .reduce((acc, gc) => acc + gc, 0);

    client.user.setPresence(`a total of ${guildCount} servers`,{
        type: ActivityType.Watching
    })

}
