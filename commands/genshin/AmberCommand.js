const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../db/JSONSListeners');

class AmberCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'amber',
            group: 'genshin',
            memberName: 'amber',
            description: 'Enviaré una imagen de Amber al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_genshin_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "amber_(genshin_impact)");
    }
}

module.exports = AmberCommand;