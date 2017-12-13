const commando = require('discord.js-commando');

class LmgtfyCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'lmgtfy',
            group: 'misc',
            memberName: 'lmgtfy',
            description: 'Dejame googlear eso por ti.',
            args: [
                {
                    key: 'busqueda',
                    prompt: '¿Qué desea buscar?',
                    type: 'string',
                    default: 6
                }
            ]
        });
    }

    async run(message, args) {
        try{
            message.channel.send("https://lmgtfy.com/?q=" + args.busqueda.replace(/ /g, "+"));
        }
        catch (e){
            message.channel.send("El texto de entrada tiene muy pocos parametros.");
        }
    }
}

module.exports = LmgtfyCommand;
