const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../db/JSONSListeners');

class VentiCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'venti',
            group: 'genshin',
            memberName: 'venti',
            description: 'Enviaré una imagen de Venti al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_genshin_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "venti_(genshin_impact)");
    }
}

module.exports = VentiCommand;