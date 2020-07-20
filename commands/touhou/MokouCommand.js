const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class MokouCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'mokou',
            group: 'touhou',
            memberName: 'mokou',
            description: 'Enviaré una imagen de Fujiwara No Mokou al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    async run(message, args) {
        safebooru(message, "fujiwara_no_mokou");
    }
}

module.exports = MokouCommand;