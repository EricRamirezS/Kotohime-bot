const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../listener/db/JSONSListeners');

class PureCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'pure',
            group: 'touhou',
            memberName: 'pure',
            description: 'Enviaré una imagen de Junko al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "junko_(touhou)");
    }
}

module.exports = PureCommand;