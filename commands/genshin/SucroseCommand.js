const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../db/JSONSListeners');

class SucroseCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'sucrose',
            group: 'genshin',
            memberName: 'sucrose',
            description: 'Enviaré una imagen de Sacarosa al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_genshin_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "sucrose_(genshin_impact)");
    }
}

module.exports = SucroseCommand;