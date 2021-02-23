const commando = require('discord.js-commando');

class ChooseCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'escoger',
            group: 'comun',
            memberName: 'escoger',
            aliases: ['choose'],
            description: 'Elige entre varias opciones proporcionadas.',
            args: [
                {
                    key: 'opciones',
                    prompt: '',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async run(message, args) {
        if (args.opciones === '') {
            message.channel.send("¡No hay nada de lo cual escoger!");
            return;
        }

        let options = args.opciones;
        let finished = false;
        let optionsArray = [];
        let start = -1;
        let end = -1;
        while (!finished) {
            start = -1;
            end = -1;
            for (let i = 0; i < options.length; i++) {
                if (options.charAt(i) === '"') {
                    if (start === -1) {
                        start = i;
                    } else {
                        end = i;
                        break;
                    }
                }
            }
            if (start === -1 && end === -1) {
                finished = true;
            } else {
                let subStr = options.substr(start, end + 1);
                options = options.replace(subStr, '');
                subStr = subStr.replace("\" ", "\"");
                optionsArray.push(subStr);
            }
        }
        let optionsArray2 = options.split(" ");
        for (let i = 0; i < optionsArray2.length; i++) {
            optionsArray.push(optionsArray2[i])
        }
        for (let i = 0; i < optionsArray.length; i++) {
            if (optionsArray[i] === '')
                optionsArray.splice(i, 1);
        }
        let choose = Math.floor(Math.random() * optionsArray.length);
        message.channel.send("¡Escojo " + optionsArray[choose] + "!");

    }
}

module.exports = ChooseCommand;
