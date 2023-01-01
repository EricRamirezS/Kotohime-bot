const { Events } = require('discord.js');
const { refreshGuildData, getGuildData } = require('../../service/GuildDataService')

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {
        console.log(`bot online. ${client.user.tag}`)

        const Guilds = client.guilds.cache.map(guild => guild.id);
        for (let guild of Guilds){
             await getGuildData(guild, false);
        }
        await refreshGuildData();
        setInterval(function() {
            refreshGuildData()
        }, 60000);


    }
}