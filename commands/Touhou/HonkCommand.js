const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class HonkCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'honk',
            group: 'touhou',
            memberName: 'honk',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "chen+touhou");
    }
}

module.exports = HonkCommand    ;