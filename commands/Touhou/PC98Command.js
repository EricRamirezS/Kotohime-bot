const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class PC98Command extends commando.Command {
    constructor(client){
        super(client, {
            name: 'pc98',
            group: 'touhou',
            memberName: 'pc98',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "touhou_(pc-98)");
    }
}

module.exports = PC98Command;