const commando = require('discord.js-commando');

class LanzamientoLunatic extends commando.Command {
        constructor(client){
            super(client, {
                name: 'mobs',
                group: 'danmaku',
                memberName: 'mobs',
                description: '¿Como va Mobs?'
            });
        }

    async run(message, args){
        message.channel.send('**La expansión de Mobs se encuentra actualmente en fase Beta.**');
    }
}

module.exports = LanzamientoLunatic;
