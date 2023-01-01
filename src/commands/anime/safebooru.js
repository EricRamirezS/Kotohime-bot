const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} = require('discord.js');
const {safebooruImageToChannel} = require('../../utils/ExternalApi/safebooruImage2Channel');

/**
 *
 * @type {{data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute(ChatInputCommandInteraction, Client): Promise<void>}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('safebooru')
        .setDescription('I\'ll send a random image from safebooru')
        .addStringOption(o => o.setName('tags')
            .setDescription('tags to search')
            .setRequired(true)),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        let tags = interaction.options.getString('tags') ? interaction.options.getString('tags') : '';
        await interaction.deferReply({ephemeral: false, components: []});

        let result = await safebooruImageToChannel(tags, interaction.channel.nsfw);
        if (typeof result === 'string') {
            return await interaction.editReply({
                content: result
            });
        } else {
            let buttons = [];
            if (result.source) {
                buttons.push(new ButtonBuilder()
                    .setLabel('View source')
                    .setStyle(ButtonStyle.Link)
                    .setURL(result.source));
            }
            if (buttons.length === 0) {
                return await interaction.editReply({
                    content: result.url,
                });
            } else {
                return await interaction.editReply({
                    content: result.url,
                    components: [new ActionRowBuilder().addComponents(...buttons)]
                });
            }
        }
    },
};

