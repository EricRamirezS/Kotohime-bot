const commando = require('discord.js-commando');

class SorteoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sorteo',
            group: 'personalizado',
            memberName: 'sorteo*',
            description: 'Información sobre sorteos',
            examples: ['~sorteo'],
            args: []
            }
        );
    }

    async run(message, args) {
        let mensaje = "Actualmente no hay ningun sorteo vigente.";
            message.channel.send(mensaje);
    }


}

module.exports = SorteoCommand;
