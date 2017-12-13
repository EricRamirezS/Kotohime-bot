const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'roll',
            group: 'misc',
            memberName: 'roll',
            description: 'Lanza un Dado',
            args: [
                {
                    key: 'numero_de_caras',
                    prompt: '¿Cuantas caras ha de tener el dado?',
                    type: 'integer',
                    default: 6
                }
            ]
        });
    }

    async run(message, args){
            var roll = Math.floor(Math.random() * args.numero_de_caras)+1;
            message.reply("Obtuviste un "+roll+".");
    }
}

module.exports = DiceRollCommand;
