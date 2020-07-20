const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../listener/db/JSONSListeners');

class TeruyoCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'teruyo',
            group: 'touhou',
            memberName: 'teruyo',
            description: 'Enviaré una imagen de Houraisan Kaguya al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "houraisan_kaguya");
    }
}

module.exports = TeruyoCommand;