const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class LawCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'law',
            group: 'touhou',
            memberName: 'law',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "shikieiki_yamaxanadu");
    }
}

module.exports = LawCommand;