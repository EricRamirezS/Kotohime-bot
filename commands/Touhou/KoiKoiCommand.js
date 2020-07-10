const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class KoiKoiCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'koikoi',
            group: 'touhou',
            memberName: 'koikoi',
            description: ''
        });
    }

    async run(message, args) {
        safebooru(message, "komeiji_koishi");
    }
}

module.exports = KoiKoiCommand;