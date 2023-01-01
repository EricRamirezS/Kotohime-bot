const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('remove');
        builder.setDescription('Remove role for user to add to themselves');
        builder.addRoleOption(o => o.setName('role').setDescription('Role to remove').setRequired(true));
        return builder;
    },

    async execute(interaction, client) {
        let role = interaction.options.getRole('role');
        let roleId = role.id;

        await interaction.deferReply({
            ephemeral: true
        });

        if (await service.removeSelfAssignableRoles(roleId, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};