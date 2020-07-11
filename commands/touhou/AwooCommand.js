const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class AwooCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'awoo',
            group: 'touhou',
            memberName: 'awoo',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "inubashiri_momiji");
    }
}

module.exports = AwooCommand;