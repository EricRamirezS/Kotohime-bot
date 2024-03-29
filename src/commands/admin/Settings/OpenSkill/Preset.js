const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');
const {rating} = require('openskill');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('preset');
        builder.setDescription('Presets and User stats to an specific value. (Use ","(comma) for decimals)');
        builder.addUserOption(o => o.setName('user').setDescription('User to edit').setRequired(true));
        builder.addNumberOption(o => o.setName('mu').setDescription('\u03BC, the expected value of a distribution. (default 25)').setRequired(true));
        builder.addNumberOption(o => o.setName('sigma').setDescription('\u03C3, the standard deviation of a probability distribution (default 8)').setRequired(true));
        builder.addIntegerOption(o => o.setName('games').setDescription('Number of games already played by this user.').setRequired(true));
        return builder;
    },

    async execute(interaction, client) {
        let user = interaction.options.getUser('user');
        let mu = interaction.options.getNumber('mu');
        let sigma = interaction.options.getNumber('sigma');
        let games = interaction.options.getInteger('games');

        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        let guildData = await service.getGuildData(interaction.guildId);
        let data = JSON.parse(guildData.open_skill);
        data[user.id] = {rating: rating({mu: mu, sigma: sigma}), games: games};

        if (await service.updateOpenSkillInfo(data, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};