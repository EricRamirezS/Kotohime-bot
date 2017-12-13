const commando = require('discord.js-commando');

class ShrugCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'shrug',
            group: 'misc',
            memberName: 'shrug',
            description: '```¯\\\\\\_(ツ)_/¯```',
        });
    }

    async run(message, args){
        message.channel.send("¯\\_(ツ)_/¯");
    }
}

module.exports = ShrugCommand;
