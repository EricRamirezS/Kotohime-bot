const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;
const {syncGuild, keys} = require('../../db/JSONSListeners');

class ZhongliCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'zhongli',
            group: 'genshin',
            memberName: 'zhongli',
            description: 'Enviaré una imagen de Zhongli al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_genshin_commands];
        return false;
    }

    async run(message, args) {
        safebooru(message, "zhongli_(genshin_impact)");
    }
}

module.exports = ZhongliCommand;