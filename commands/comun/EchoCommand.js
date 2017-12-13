const commando = require('discord.js-commando');

class EchoCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'eco',
            group: 'comun',
            memberName: 'comun',
            description: 'El bot ha repetido lo que dices\n',
            args: [
                {
                    key: 'recordatorio',
                    prompt: '¿Qué debo decir?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, args){
        message.channel.send(args.recordatorio);
    }
}

module.exports = EchoCommand;