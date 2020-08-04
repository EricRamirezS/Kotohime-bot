const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

class RadioCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'radio',
            group: 'musica',
            memberName: 'radio',
            description: 'Reproducir música desde la radio Gensokyo Radio.',
            clientPermissions: ['SPEAK', 'CONNECT'],
            examples: ['radio'],
        });
    }

    async run(message, args) {
        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.reply(
                "Debes estar en un canal de voz para usar este comando"
            );
        let connection = await voiceChannel.join();
        if (connection) {
            let dispatcher = connection
                .play("https://stream.gensokyoradio.net/3/")
                .on("finish", () => {
                    voiceChannel.leave();
                })
                .on("error", error => {
                    voiceChannel.leave();
                });
            dispatcher.setVolumeLogarithmic(1);
        }
    }
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

module.exports = RadioCommand;
