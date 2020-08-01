const commando = require('discord.js-commando');

class StopCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'detener',
            group: 'musica',
            memberName: 'detener',
            aliases: ['stop'],
            description: 'Detener la lista de reproducción actual.',
        });
    }

    async run(message, args) {
        let serverQueue = global.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz para parar la música.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
}

module.exports = StopCommand;
