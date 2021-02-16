const commando = require('discord.js-commando');

class PlaylistCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'playlist',
            group: 'musica',
            memberName: 'playlist',
            description: 'Ver la lista de reproducción',
            clientPermissions: ['SPEAK', 'CONNECT'],
            examples: ['playlist'],
            args: []
        });
    }

    async run(message, args) {
        const serverQueue = queue.get(message.guild.id);
        if (serverQueue){
            let songs = serverQueue.songs;
            let reply = "";
            for (let i = 0; i < songs.length; i++){
                reply += (i+1) + ".- " + songs[i].title + "\n";
            }
            message.channel.send(reply);
        } else {
            message.reply("No hay ninguna playlist en estos momentos.");
        }
    }
}


module.exports = PlaylistCommand;
