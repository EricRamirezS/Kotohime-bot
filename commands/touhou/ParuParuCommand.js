const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../db/JSONSListeners');

class YuyukoCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'paruparu',
            group: 'touhou',
            memberName: 'paruparu',
            description: 'Enviare una imagen de Mizuhashi Parsee al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "mizuhashi_parsee");
    }
}

module.exports = YuyukoCommand;