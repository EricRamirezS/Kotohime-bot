const {Events} = require('discord.js');
const {refreshGuildData, getGuildData} = require('../../service/GuildDataService');

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {
        console.log(`bot online. ${client.user.tag}`);

        let Guilds = await client.shard.broadcastEval(c => c.guilds.cache.map(u => u.id));
        Guilds = Guilds.flat(Infinity)
        for (let guild of Guilds) {
            if (guild) await getGuildData(guild, false);
        }
        await refreshGuildData();
        setInterval(function () {
            refreshGuildData();
        }, 60000);


    }
};