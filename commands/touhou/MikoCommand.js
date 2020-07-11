const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class MikoCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'miko',
            group: 'touhou',
            memberName: 'miko',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "touhou+miko");
    }
}

module.exports = MikoCommand;