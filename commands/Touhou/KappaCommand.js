const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class KappaCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'kappa',
            group: 'touhou',
            memberName: 'kappa',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "kawashiro_nitori");
    }
}

module.exports = KappaCommand;