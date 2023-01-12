const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');
const {rating} = require('openskill');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('reset');
        builder.setDescription('Reset a single/all users skill level to default value');
        builder.addUserOption(o => o.setName('user').setDescription('User to reset'));
        return builder;
    },

    async execute(interaction, client) {
        let user = interaction.options.getUser('user');

        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        let newData = {};
        if (user) {
            let guildData = await service.getGuildData(interaction.guildId);
            newData = JSON.parse(guildData.open_skill);
            newData[user.id] = rating();
        }

        if (await service.updateOpenSkillInfo(newData, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};