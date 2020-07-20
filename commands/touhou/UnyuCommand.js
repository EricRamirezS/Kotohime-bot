const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../listener/db/JSONSListeners');

class UnyuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'unyu',
            group: 'touhou',
            memberName: 'unyu',
            description: 'Enviaré una imagen de Reiuji Utsuho al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "reiuji_utsuho");
    }
}

module.exports = UnyuCommand    ;