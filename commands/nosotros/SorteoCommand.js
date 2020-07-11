const commando = require('discord.js-commando');

class SorteoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sorteo',
            group: 'nosotros',
            memberName: 'sorteo',
            description: 'Información sobre sorteos',
            examples: ['~sorteo']
            });
    }

    async run(message, args){
        message.channel.send('Actualmente no hay ningun sorteo vigente');
    }
}

module.exports = SorteoCommand;
