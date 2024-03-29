const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction} = require('discord.js');
const service = require('../../../service/GuildDataService');


module.exports = {
    /**
     * @type {SlashCommandSubcommandBuilder}
     */
    build(builder) {
        builder.setName('drop');
        builder.setDescription('Drop a role form this server');
        builder.addRoleOption(o =>
            o.setName('role').setDescription('Role to drop').setRequired(true));
        return builder;
    },

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        await interaction.deferReply({ephemeral: true});
        const role = interaction.options.getRole('role');
        let data = await service.getGuildData(interaction.guildId);

        try {
            if (data) {
                let availableRoles = JSON.parse(data.self_assignable_roles);
                if (availableRoles.map(e => e.id).includes(role.id)) {
                    await interaction.member.roles.remove(role, 'User request');
                    return await interaction.editReply({content: ':thumbsup:'});
                }
            }
        } catch {
        }
        return await interaction.editReply({content: ':thumbsdown:'});

    },
};

