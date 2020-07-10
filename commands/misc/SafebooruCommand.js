const commando = require('discord.js-commando');
const safebooru = require('../../safebooruImage2Channel');

class SafebooruCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'safebooru',
            group: 'misc',
            memberName: 'safebooru',
            description: 'Dejame googlear eso por ti.',
            args: [
                {
                    key: 'tags',
                    prompt: 'Coloque los tags que desea buscar.',
                    type: 'string',
                    default: ""
                }
            ]
        });
    }

    async run(message, args) {
        if (args) {
            let tags = args.tags.replace(" ", "+");
            safebooru(message, tags);
        } else {
            message.channel.send("El texto de entrada tiene muy pocos parametros.");
        }
    }
}

module.exports = SafebooruCommand;
