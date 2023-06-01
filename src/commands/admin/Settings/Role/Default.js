const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');
const emojiRegex = require('emoji-regex');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('default');
        builder.setDescription('Adds a role to every new user as soon as they join the server');
        builder.addRoleOption(o => o.setName('role').setDescription('Role to add').setRequired(true));
        builder.addBooleanOption(o => o.setName('retroactive')
            .setDescription('Add this role to ever member currently in the server.'));
        return builder;
    },

    execute: async function (interaction, client) {
        let role = interaction.options.getRole('role');
        let retroactive = interaction.options.getBoolean('retroactive');

        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });
        let botMember = interaction.guild.members.cache.get(client.user.id);
        if (role.position >= botMember.roles.highest.position) {
            return await interaction.editReply({content: 'I don\'t have permission to give that role to users.'});
        }

        if (await service.addDefaultRoles(role.id, interaction.guildId)) {
            if (retroactive) {
                interaction.guild.members.fetch().then(async members => {
                    for (let memberData of members) {
                        let member = interaction.guild.members.cache.get(memberData[0]);
                        if (!member.roles.cache.has(role.id)) member.roles.add(role);
                    }
                });
            }
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};