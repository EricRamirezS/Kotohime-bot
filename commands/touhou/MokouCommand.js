const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class MokouCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'mokou',
            group: 'touhou',
            memberName: 'mokou',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "fujiwara_no_mokou");
    }
}

module.exports = MokouCommand;