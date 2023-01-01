const {ChatInputCommandInteraction} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const request = require('snekfetch');
const xmldoc = require('xmldoc');

module.exports = {
    build(builder) {
        builder.setName('see');
        builder.setDescription('See what\'s Gensokyou Radio playing right now');
        return builder;
    },

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        let _ = interaction.deferReply({fetchReply: true, ephemeral:false});
        try {
            let r = await request.post('https://gensokyoradio.net/xml/').send({usingGoodRequestLibrary: true});
            let s = r.body.toString();
            let document = new xmldoc.XmlDocument(s);
            let albumID = document.childNamed('SONGDATA').childNamed('ALBUMID').val;
            let circleURL = document.childNamed('MISC').childNamed('CIRCLELINK').val;
            let songTitle = document.childNamed('SONGINFO').childNamed('TITLE').val;
            let songArtist = document.childNamed('SONGINFO').childNamed('ARTIST').val;
            let songAlbum = document.childNamed('SONGINFO').childNamed('ALBUM').val;
            let songCircle = document.childNamed('SONGINFO').childNamed('CIRCLE').val;
            let albumImage = document.childNamed('MISC').childNamed('ALBUMART').val;
            albumImage = 'https://gensokyoradio.net/images/albums/200/' + albumImage;
            if (albumID) {
                albumID = ' (https://gensokyoradio.net/music/album/' + albumID + '/)';
            }
            if (circleURL) {
                circleURL = ' (' + circleURL + ')';
            }
            let embed = new EmbedBuilder()
                .setTitle('Playing: ' + songTitle)
                .setImage(albumImage)
                .addFields({name: 'Artist', value: songArtist, inline: false})
                .addFields({name: 'Album', value: songAlbum + albumID, inline: false})
                .addFields({name: 'Circle', value: songCircle + circleURL, inline: false})
                .setURL('https://gensokyoradio.net/music/playing/');
            await _;
            return await interaction.editReply({embeds: [embed], ephemeral: false});
        } catch (e) {
            console.error(e);
            await _;
            return interaction.editReply({
                content: 'Gensokyo Radio is currently on Maintenance.',
             });

        }
    },
};

