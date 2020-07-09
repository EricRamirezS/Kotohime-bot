const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class MukyuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'mukyu',
            group: 'touhou',
            memberName: 'mukyu',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "patchouli_knowledge");
    }
}

module.exports = MukyuCommand;
