const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction} = require('discord.js');
const service = require('../../../service/GuildDataService');


module.exports = {
    /**
     * @type {SlashCommandSubcommandBuilder}
     */
    build(builder) {
        builder.setName('list');
        builder.setDescription('Display the list of roles available');
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
        let data = await service.getGuildData(interaction.guildId);
        try {
            let availableRoles = JSON.parse(data.self_assignable_roles);
            availableRoles = sortRoles(interaction.guild, availableRoles);
            return await interaction.editReply({content: `<@&${availableRoles.join('>\n<@&')}>`});
        } catch (e) {
            console.error(e);
        }
        return await interaction.editReply({content: ':thumbsdown:'});

    },
};

function sortRoles(guild, roles) {
    let rolesObjects = [];
    for (let role of roles) {
        rolesObjects.push(guild.roles.cache.get(role));
    }
    rolesObjects.sort((a, b) => (a.position < b.position) ? 1 : -1);
    return rolesObjects.map(x => x.id);
}