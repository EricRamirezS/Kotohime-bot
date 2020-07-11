const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class AliceCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'alice',
            group: 'touhou',
            memberName: 'alice',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "alice_margatroid");
    }
}

module.exports = AliceCommand;