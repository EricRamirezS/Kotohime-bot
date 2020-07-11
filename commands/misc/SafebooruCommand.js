const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel');

class SafebooruCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'safebooru',
            group: 'misc',
            memberName: 'safebooru',
            description: 'Dejame googlear eso por ti.',
            examples: [
                "~safebooru touhou",
                "~safebooru touhou alice_margatroid",
                "~safebooru banned_tags"
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
            if (args.tags.toLowerCase() === "banned_tags"){
                message.channel.send("Estos son los tags que me han prohibido buscar" +
                    "```" +
                    safebooru.BANNED_TAGS.join("\n") +
                    "```")
            }
            let tags = args.tags.replace(" ", "+");
            safebooru.safebooruImageToChannel(message, tags);
        } else {
            message.channel.send("El texto de entrada tiene muy pocos parametros.");
        }
    }
}

module.exports = SafebooruCommand;
