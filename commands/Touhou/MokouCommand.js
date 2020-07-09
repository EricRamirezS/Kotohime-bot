const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

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