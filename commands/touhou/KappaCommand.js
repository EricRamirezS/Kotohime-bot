const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class KappaCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'kappa',
            group: 'touhou',
            memberName: 'kappa',
            description: 'Enviaré una imagen de Kawashiro Nitori al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    async run(message, args) {
        safebooru(message, "kawashiro_nitori");
    }
}

module.exports = KappaCommand;