const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class MukyuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'mukyu',
            group: 'touhou',
            memberName: 'mukyu',
            description: 'Enviaré una imagen de Patchouli Knowledge al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    async run(message, args) {
        safebooru(message, "patchouli_knowledge");
    }
}

module.exports = MukyuCommand;
