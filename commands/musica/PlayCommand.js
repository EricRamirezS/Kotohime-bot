const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

class PlayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'tocar',
            group: 'musica',
            memberName: 'tocar',
            description: 'Reproducir una canción',
            clientPermissions: ['SPEAK', 'CONNECT'],
            aliases: ['play'],
            examples: ['play https://youtu.be/dQw4w9WgXcQ'],
            args: [
                {
                    key: 'url',
                    prompt: '¿Qué canción debo tocar?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, args) {
        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.reply(
                "Debes estar en un canal de voz para usar este comando"
            );
        let songInfo;
        try {
            songInfo = await ytdl.getInfo(args.url);
        } catch (e) {
            if (e.toString().startsWith("Error: Not a YouTube domain")) {
                message.reply("Sólo puedo reproducir música de youtube");
            } else {
                message.reply("No he encontrado nada con esa URL");
            }
            return;
        }
        if (songInfo) {
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };
            let serverQueue = global.queue.get(message.guild.id);
            if (!serverQueue) {
                const queueContruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true,
                };
                global.queue.set(message.guild.id, queueContruct);
                queueContruct.songs.push(song);
                message.reply(`${song.title} ha sido agregada a la Playlist!`);
                try {
                    queueContruct.connection = await voiceChannel.join();
                    play(message.guild, queueContruct.songs[0]);
                } catch (err) {
                    global.queue.delete(message.guild.id);
                    return message.channel.send(err.toString());
                }
            } else {
                let flag = false;
                try {
                    let vcs = message.client.voice.connections.keyArray();
                    for (let i = 0; i < vcs.length; i++) {
                        if (message.guild.id === vcs[i]) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        serverQueue.songs = [];
                    }
                } catch (ignore) {
                }
                serverQueue.songs.push(song);
                message.reply(`${song.title} ha sido agregada a la Playlist!`);
                if (!flag) {
                    serverQueue.connection = await voiceChannel.join();
                    play(message.guild, serverQueue.songs[0]);
                }
            }
        }
    }
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => {
            try {
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            } catch (error_2) {
                serverQueue.voiceChannel.leave();
            }
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

module.exports = PlayCommand;
