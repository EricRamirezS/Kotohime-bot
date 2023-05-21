const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction, EmbedBuilder} = require('discord.js');
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

            const groups = availableRoles.reduce((groups, item) => {
                const group = (groups[item.category] || []);
                group.push(item);
                groups[item.category] = group;
                return groups;
            }, {});
            let embed = new EmbedBuilder();
            embed.setTitle('Roles I can give you');
            embed.setDescription('You may get any of the following roles by using `/role get <role_name>`');
            for (let [key, value] of Object.entries(groups)) {
                let roles = sortRoles(interaction.guild, value);
                if (key === 'null') {
                    embed.addFields({
                        name: ' ',
                        value: `<@&${roles.join('>\n<@&')}>`,
                        inline: false
                    });
                } else {
                    embed.addFields({
                        name: key,
                        value: `<@&${roles.join('>\n<@&')}>`,
                        inline: false
                    });
                }
            }
            return await interaction.editReply({embeds: [embed]});
        } catch (e) {
            console.error(e);
        }
        return await interaction.editReply({content: ':thumbsdown:'});

    },
};

function sortRoles(guild, roles) {
    let rolesObjects = [];
    for (let role of roles) {
        rolesObjects.push(guild.roles.cache.get(role.id));
    }
    rolesObjects.sort((a, b) => (a.position < b.position) ? 1 : -1);
    return rolesObjects.map(x => x.id);
}