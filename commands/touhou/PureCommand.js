const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class PureCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'pure',
            group: 'touhou',
            memberName: 'pure',
            description: 'Enviaré una imagen de Junko al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    async run(message, args) {
        safebooru(message, "junko_(touhou)");
    }
}

module.exports = PureCommand;