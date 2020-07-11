const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;


class _2huCommand extends commando.Command {

    constructor(client){
        super(client, {
            name: '2hu',
            group: 'touhou',
            memberName: '2hu',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "touhou");
    }

}

module.exports = _2huCommand;