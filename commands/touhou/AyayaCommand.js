const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../listener/db/JSONSListeners');

class AyayaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ayaya',
            group: 'touhou',
            memberName: 'ayaya',
            description: 'Enviaré una imagen de Shameimaru Aya al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "shameimaru_aya");
    }
}

module.exports = AyayaCommand;