const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../listener/db/JSONSListeners');

class _9ballCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: '9ball',
            group: 'touhou',
            memberName: '9ball',
            description: 'Enviaré una imagen de Cirno al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "cirno");
    }
}

module.exports = _9ballCommand;