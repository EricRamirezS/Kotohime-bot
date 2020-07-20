const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../listener/db/JSONSListeners');

class UuuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'uuu',
            group: 'touhou',
            memberName: 'uuu',
            description: 'Enviaré una imagen de Remilia Scarlet al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "remilia_scarlet");
    }
}

module.exports = UuuCommand    ;