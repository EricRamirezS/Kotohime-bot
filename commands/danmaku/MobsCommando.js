const commando = require('discord.js-commando');
const {syncGuild, keys} = require('../../db/JSONSListeners');

class LanzamientoLunatic extends commando.Command {
        constructor(client){
            super(client, {
                name: 'mobs',
                group: 'danmaku',
                memberName: 'mobs',
                description: '¿Como va Mobs?'
            });
        }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_danmaku_commands];
        return false;
    }

    async run(message, args){
        message.channel.send('**La expansión de Mobs se encuentra actualmente en fase Beta.**');
    }
}

module.exports = LanzamientoLunatic;
