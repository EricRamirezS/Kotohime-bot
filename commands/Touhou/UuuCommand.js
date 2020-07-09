const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class UuuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'uuu',
            group: 'touhou',
            memberName: 'uuu',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "remilia_scarlet");
    }
}

module.exports = UuuCommand    ;