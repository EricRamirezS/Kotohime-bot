const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');
const emojiRegex = require('emoji-regex');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('add');
        builder.setDescription('Add or update category for roles');
        builder.addStringOption(o => o.setName('category').setDescription('Category\'s name').setRequired(true));
        builder.addStringOption(o => o.setName('description').setDescription('Descripción de la categoría')
            .setRequired(false).setMaxLength(1500));
        return builder;
    },

    execute: async function (interaction, client) {
        let category = interaction.options.getString('category');
        let description = interaction.options.getString('description');

        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        if (category === 'null'){
            return await interaction.editReply({content: 'Category cannot be named `null`'});
        }

        let categoryData = {
            name: category,
            description: description
        };

        if (await service.addOrUpdateCategory(categoryData, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};