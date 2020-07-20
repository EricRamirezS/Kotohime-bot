const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class EirinCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'eirin',
            group: 'touhou',
            memberName: 'eirin',
            description: 'Enviaré una imagen de Yagokoro Eirin al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    async run(message, args) {
        safebooru(message, "yagokoro_eirin");
    }
}

module.exports = EirinCommand;
