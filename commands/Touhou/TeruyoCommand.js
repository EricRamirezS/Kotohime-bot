const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class TeruyoCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'teruyo',
            group: 'touhou',
            memberName: 'teruyo',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "houraisan_kaguya");
    }
}

module.exports = TeruyoCommand;