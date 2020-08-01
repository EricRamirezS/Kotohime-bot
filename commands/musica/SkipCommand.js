const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

class SkipCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'siguiente',
            group: 'musica',
            memberName: 'siguiente',
            aliases: ['skip'],
            description: 'Saltar la canción actual y pasar a la siguiente.',
        });
    }

    async run(message, args) {
        let serverQueue = global.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz para usar este comando.');
        if (!serverQueue) return message.channel.send('No hay ninguna canción que pueda saltar.');
        serverQueue.connection.dispatcher.end();
    }
}

module.exports = SkipCommand;
