const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');
const {ChannelType} = require('discord-api-types/v10');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('channel');
        builder.setDescription('channel to send voice log');
        builder.addChannelOption(o => o.setName('channel').setDescription('Channel to send voice log').setRequired(true)
            .addChannelTypes(ChannelType.GuildText, ChannelType.GuildForum));
        return builder;
    },

    async execute(interaction, client) {
        let channel = interaction.options.getChannel('channel');
        let channelId = channel.id;

        await interaction.deferReply({
            ephemeral: true
        });

        if (await service.setLogChannelId(channelId, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};