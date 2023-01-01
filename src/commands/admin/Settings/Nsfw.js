const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../service/GuildDataService');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('nsfw');
        builder.setDescription('Enable NSFW commands (They still must be used in NSFW channels)');
        builder.addBooleanOption(o => o.setName('enable')
            .setDescription('Enable NSFW commands')
            .setRequired(true));
        return builder;
    },

    async execute(interaction, client) {
        let bool = interaction.options.getBoolean('enable');

        await interaction.deferReply({
            ephemeral: true
        });

        if (await service.setNsfwCommands(bool, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};