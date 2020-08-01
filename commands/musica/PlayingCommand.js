const commando = require('discord.js-commando');

class PlayingCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'reproduciendo',
            group: 'musica',
            memberName: 'reproduciendo',
            description: 'Ver lo que estoy reproduciendo ahora',
            aliases: ['playing'],
            examples: ['reproduciendo', 'playing'],
        });
    }

    async run(message, args) {
        let serverQueue = global.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('En estos momentos no estoy reproduciendo nada.');
        return message.channel.send(`Ahora estoy reproduciendo: ${serverQueue.songs[0].title}`);
    }
}


module.exports = PlayingCommand;
