const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class PadsCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'pads',
            group: 'touhou',
            memberName: 'pads',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "izayoi_sakuya");
    }
}

module.exports = PadsCommand;