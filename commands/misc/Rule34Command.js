const commando = require('discord.js-commando');
const rule34 = require('../../metodosInternos/rule34Image2Channel');

class Rule34Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rule34',
            group: 'misc',
            memberName: 'rule34',
            description: 'Dejame googlear eso por ti.',
            examples: [
                "~rule34 touhou",
                "~rule34 touhou alice_margatroid",
            ],
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
            rule34.rule34Image2Channel(message, tags);
        } else {
            message.channel.send("El texto de entrada tiene muy pocos parametros.");
        }
    }
}

module.exports = Rule34Command;
