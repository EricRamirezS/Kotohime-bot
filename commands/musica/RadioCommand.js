const commando = require('discord.js-commando');
const request = require('snekfetch');
const Discord = require('discord.js');
const xmldoc = require('xmldoc');
const {syncGuild, keys} = require('../../db/JSONSListeners');

class RadioCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'verradio',
            group: 'musica',
            memberName: 'verradio',
            description: 'Extrae la canción que se está reproduciendo en la Gensokyou Radio',
            clientPermissions: ['ATTACH_FILES', 'EMBED_LINKS']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
    }

    async run(message, args) {
        request.post('https://gensokyoradio.net/xml/')
            .send({usingGoodRequestLibrary: true})
            .then(r => {
                let s = r.body.toString();
                let document = new xmldoc.XmlDocument(s);
                let albumID = document.childNamed("SONGDATA").childNamed("ALBUMID").val;
                let circleURL = document.childNamed("MISC").childNamed("CIRCLELINK").val;
                let tituloCancion = document.childNamed("SONGINFO").childNamed("TITLE").val;
                let artistaCancion = document.childNamed("SONGINFO").childNamed("ARTIST").val;
                let albumCancion = document.childNamed("SONGINFO").childNamed("ALBUM").val;
                let circleCancion = document.childNamed("SONGINFO").childNamed("CIRCLE").val;
                let albumImagen = document.childNamed("MISC").childNamed("ALBUMART").val;
                albumImagen = "https://gensokyoradio.net/images/albums/200/" + albumImagen;
                if (albumID) {
                    albumID = " (https://gensokyoradio.net/music/album/" + albumID + "/)";
                }
                if (circleURL) {
                    circleURL = " (" + circleURL + ")";
                }
                let embed = new Discord.MessageEmbed()
                    .setTitle('En reproducción: ' + tituloCancion)
                    .setImage(albumImagen)
                    .addField('Artista', artistaCancion)
                    .addField('Album', albumCancion + albumID)
                    .addField('Circulo', circleCancion + circleURL)
                    .setURL('https://gensokyoradio.net/music/playing/');
                message.channel.send(embed);
            });
    }
}

module.exports = RadioCommand;