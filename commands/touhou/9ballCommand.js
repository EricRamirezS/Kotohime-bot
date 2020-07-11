const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class _9ballCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: '9ball',
            group: 'touhou',
            memberName: '9ball',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "cirno");
    }
}

module.exports = _9ballCommand;