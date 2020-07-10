const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class PureCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'Pure',
            group: 'touhou',
            memberName: 'Pure',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "junko_(touhou)");
    }
}

module.exports = PureCommand;