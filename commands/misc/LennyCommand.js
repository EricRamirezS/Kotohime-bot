const commando = require('discord.js-commando');

class LennyCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'lenny',
            group: 'misc',
            memberName: 'lenny',
            description: 'Tu sabes lo que es',
        });
    }

    async run(message, args){
        message.channel.send("( ͡~ ͜ʖ ͡°)");
    }
}

module.exports = LennyCommand;
