const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');
const emojiRegex = require('emoji-regex');
const autocompleteCategory = require('../../../../autocomplete/Categories');
/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('add');
        builder.setDescription('Add a manual role for user to add to themselves');
        builder.addRoleOption(o => o.setName('role').setDescription('Role to add').setRequired(true));
        builder.addStringOption(o => o.setName('category').setDescription('Role\'s Category').setRequired(false)
            .setAutocomplete(true));
        builder.addStringOption(o => o.setName('emoji').setDescription('Role\s emoji').setRequired(false));
        return builder;
    },

    async autocomplete(interaction) {
        await autocompleteCategory(interaction);
    },

    execute: async function (interaction, client) {
        let role = interaction.options.getRole('role');
        let emoji = interaction.options.getString('emoji');
        let category = interaction.options.getString('category');
        let roleId = role.id;

        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        let botMember = interaction.guild.members.cache.get(client.user.id);
        if (role.position >= botMember.roles.highest.position) {
            return await interaction.editReply({content: 'I don\'t have permission to give that role to users.'});
        }

        if (emoji) {
            const re = emojiRegex();
            if (!re.test(emoji) && !/<a?:.+?:\d{18,19}>|\p{Extended_Pictographic}/gu.test(emoji))
                return interaction.editReply('Emoji invalido');
        }

        let roleData = {
            'id': roleId,
            'emoji': emoji,
            'category': category
        };

        if (await service.addOrUpdateSelfAssignableRoles(roleData, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};