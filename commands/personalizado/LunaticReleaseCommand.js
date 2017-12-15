const commando = require('discord.js-commando');

class LanzamientoLunatic extends commando.Command {
        constructor(client){
            super(client, {
                name: 'lanzamientolunatic',
                group: 'personalizado',
                memberName: 'lanzamientolunatic',
                description: ''
            });
        }

    async run(message, args){
        message.channel.send('**Primavera 2018**');
    }
}

module.exports = LanzamientoLunatic;
