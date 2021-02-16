const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../db/JSONSListeners');

class GenshinCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'genshin',
            group: 'genshin',
            memberName: 'genshin',
            description: 'Enviaré una imagen de Genshin Impact al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_genshin_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "genshin_impact");
    }
}

module.exports = GenshinCommand;