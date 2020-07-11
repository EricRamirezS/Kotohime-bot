const commando = require('discord.js-commando');

class LanzamientoLunatic extends commando.Command {
        constructor(client){
            super(client, {
                name: 'lunatic',
                group: 'danmaku',
                memberName: 'lunatic',
                description: '¿Cuándo fue lanzado Lunatic Extra?'
            });
        }

    async run(message, args){
        message.channel.send('**La Expansión Lunatic Extra fue lanzada oficialmente el 18 de Julio de 2017**');
    }
}

module.exports = LanzamientoLunatic;
