const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class MikoCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'Miko',
            group: 'touhou',
            memberName: 'Miko',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "touhou+miko");
    }
}

module.exports = MikoCommand;