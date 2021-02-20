const commando = require('discord.js-commando');
const {syncGuild, keys} = require('../../db/JSONSListeners');

class LanzamientoLunatic extends commando.Command {
        constructor(client){
            super(client, {
                name: 'lunatic',
                group: 'danmaku',
                memberName: 'lunatic',
                description: '¿Cuándo fue lanzado Lunatic Extra?'
            });
        }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_danmaku_commands];
        return false;
    }

    async run(message, args){
        message.channel.send('**La Expansión Lunatic Extra fue lanzada oficialmente el 18 de Julio de 2017**');
    }
}

module.exports = LanzamientoLunatic;
