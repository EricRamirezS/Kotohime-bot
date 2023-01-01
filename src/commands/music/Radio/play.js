const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction} = require('discord.js');
const {ChannelType} = require('discord-api-types/v10');

module.exports = {
    /**
     *
     * @param builder {SlashCommandSubcommandBuilder}
     * @return {SlashCommandSubcommandBuilder}
     */
    build(builder) {
        builder.setName('play');
        builder.setDescription('Play Gensokyou Radio in a voice channel');
        builder.addChannelOption(o => o.setName('voice_channel')
            .setDescription('Voice channel to join')
            .addChannelTypes(ChannelType.GuildVoice));
        return builder;
    },

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        let voiceChannel = interaction.options.getChannel('voice_channel');
        if (!voiceChannel) voiceChannel = interaction.member.voice.channel;
        await interaction.deferReply({ephemeral: true});
        client.distube.play(voiceChannel, 'https://na1.stream.gensokyoradio.net/1/', {
            member: interaction.member,
            textChannel: interaction.channel
        }).then(() => {
            interaction.editReply(':thumbsup:');
        }).catch(err => {
            console.error(err)
            interaction.editReply(':thumbsdown:');
        });
    },
};

