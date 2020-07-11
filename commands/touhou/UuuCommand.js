const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class UuuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'uuu',
            group: 'touhou',
            memberName: 'uuu',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "remilia_scarlet");
    }
}

module.exports = UuuCommand    ;