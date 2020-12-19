const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../db/JSONSListeners');

class YuyukoCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'shoutoku',
            group: 'touhou',
            memberName: 'shoutoku',
            description: 'Enviare una imagen de Toyosatomimi no Miko al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "toyosatomimi_no_miko");
    }
}

module.exports = YuyukoCommand;