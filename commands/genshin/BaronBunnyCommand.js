const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../db/JSONSListeners');

class BaronBunnyCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'baron_bunny',
            group: 'genshin',
            memberName: 'baron_bunny',
            description: 'Enviaré una imagen del Baron Bunny al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_genshin_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "baron_bunny");
    }
}

module.exports = BaronBunnyCommand;