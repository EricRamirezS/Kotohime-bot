const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class UnyuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'unyu',
            group: 'touhou',
            memberName: 'unyu',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "reiuji_utsuho");
    }
}

module.exports = UnyuCommand    ;