const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../db/JSONSListeners');

class DionaCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'diona',
            group: 'genshin',
            memberName: 'diona',
            description: 'Enviaré una imagen de Diona al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_genshin_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "diona_(genshin_impact)");
    }
}

module.exports = DionaCommand;