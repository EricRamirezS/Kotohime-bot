const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');


class AyayaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ayaya',
            group: 'touhou',
            memberName: 'ayaya',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "shameimaru_aya");
    }
}

module.exports = AyayaCommand;