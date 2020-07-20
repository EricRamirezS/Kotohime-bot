const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class LawCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'law',
            group: 'touhou',
            memberName: 'law',
            description: 'Enviaré una imagen de Shikieiki Yamaxanadu al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    async run(message, args) {
        safebooru(message, "shikieiki_yamaxanadu");
    }
}

module.exports = LawCommand;