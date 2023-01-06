const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('role');
        builder.setDescription('Add role that can report results');
        builder.addRoleOption(o => o.setName('role').setDescription('Role to add'));
        return builder;
    },

    async execute(interaction, client) {
        let role = interaction.options.getRole('role');

        let roleId = role ? role.id : null;

        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        if (await service.addOpenSkillRole(roleId, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};