const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');
const autocompleteCategory = require('../../../../autocomplete/Categories');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('remove');
        builder.setDescription('Remove category for user to add to themselves');
        builder.addStringOption(o => o.setName('category').setDescription('Category to remove').setRequired(true)
            .setAutocomplete(true));
        return builder;
    },

    async autocomplete(interaction) {
        await autocompleteCategory(interaction);
    },

    async execute(interaction, client) {
        let category = interaction.options.getString('category');

        await interaction.deferReply({
            ephemeral: true
        });

        if (await service.removeCategory(category, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};