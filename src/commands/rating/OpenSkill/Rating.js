const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../service/GuildDataService');
const {rating, ordinal} = require('openskill');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('rating');
        builder.setDescription('See an specific player\s skill rating');
        builder.addUserOption(o => o.setName('user').setDescription('User\'s rating to check'));
        return builder;
    },

    async execute(interaction, client) {
        let user = interaction.options.getUser('user');
        let userId = user ? user.id : interaction.user.id;

        await interaction.deferReply({
            ephemeral: true
        });

        let guildData = await service.getGuildData(interaction.guildId);
        let data = JSON.parse(guildData.open_skill);

        if (userId in data) {
            let extra = '';
            if (data[userId].games <= 10) {
                extra = '??';
            } else if (data[userId].sigma <= 20) {
                extra = '?';
            }
            return interaction.editReply(`${Math.round(ordinal(data[userId].rating))}${extra}\nGames played: ${data[userId].games}`);
        }
        return interaction.editReply(`${Math.round(ordinal(rating()))}??\nGames played: 0`);

    }
};