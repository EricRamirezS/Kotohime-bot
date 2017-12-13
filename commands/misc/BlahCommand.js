const commando = require('discord.js-commando');

class BlahCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'blah',
            group: 'misc',
            memberName: 'blah',
            description: 'Blah',
            examples: ['blah'],
        });
    }

    async run(message, args){
        message.channel.send("Blah para ti también, " + message.author);
    }
}

module.exports = BlahCommand;
