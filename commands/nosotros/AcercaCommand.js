const commando = require('discord.js-commando');

class AcercaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sobremi',
            group: 'nosotros',
            aliases: ['about'],
            memberName: 'sobremi',
            description: '¿Quieres saber sobre mi?',
            examples: ['~sobremi']
            });
    }

    async run(message, args){
        let mensaje = "Soy un bot escrito en Javascript usando discord.js junto con el framework Commando. Está orientada" +
            " especialmente a servidores dedicados a Touhou Project, pero es lo suficientemente versátil para encajar" +
            " en cualquier tipo de servidor.\n\n" +
            "" +
            "Mi desarrollo comenzó el ";

        return message.channel.send(mensaje);
    }
}

module.exports = AcercaCommand;
