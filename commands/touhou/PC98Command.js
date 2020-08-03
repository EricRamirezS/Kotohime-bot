const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../db/JSONSListeners');

class PC98Command extends commando.Command {
    constructor(client){
        super(client, {
            name: 'pc98',
            group: 'touhou',
            memberName: 'pc98',
            aliases: ['pc-98'],
            description: 'Enviaré una imagen de touhou en la era de PC-98 al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "touhou_(pc-98)");
    }
}

module.exports = PC98Command;