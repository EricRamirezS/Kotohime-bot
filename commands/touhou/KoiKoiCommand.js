const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class KoiKoiCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'koikoi',
            group: 'touhou',
            memberName: 'koikoi',
            description: 'Enviaré una imagen de Komeiji Koishi al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    async run(message, args) {
        safebooru(message, "komeiji_koishi");
    }
}

module.exports = KoiKoiCommand;