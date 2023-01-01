const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('add');
        builder.setDescription('Add role for user to add to themselves');
        builder.addRoleOption(o => o.setName('role').setDescription('Role to add').setRequired(true));
        return builder;
    },

    async execute(interaction, client) {
        let role = interaction.options.getRole('role');
        let roleId = role.id;

        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        if (await service.addSelfAssignableRoles(roleId, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};