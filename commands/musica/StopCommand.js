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
        if (!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz para parar la música.');

        try {
            let serverQueue = global.queue.get(message.guild.id);
            if (serverQueue) {
                serverQueue.songs = [];
                serverQueue.connection.dispatcher.end();
            }
            message.guild.voice.channel.leave();
        } catch (ignored) {
            console.log(ignored);
            try {
                console.log("awa");
                message.guild.voice.channel.leave();
            } catch (ignored) {
            }
        }
    }
}

module.exports = StopCommand;
