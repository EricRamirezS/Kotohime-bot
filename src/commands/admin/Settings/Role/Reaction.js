const {
    SlashCommandSubcommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');
const service = require('../../../../service/GuildDataService');
const {ChannelType} = require('discord-api-types/v10');
const autocompleteCategories = require('../../../../autocomplete/Categories');
/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('reaction');
        builder.setDescription('Creates a reaction message to get roles');
        builder.addChannelOption(o => o.setName('channel').setDescription('Channel to send the messages')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText));
        builder.addStringOption(o => o.setName('category').setDescription('Specify the role category.')
            .setAutocomplete(true));
        return builder;
    },

    async autocomplete(interaction) {
        await autocompleteCategories(interaction);
    },

    async execute(interaction, client) {
        await interaction.deferReply({ephemeral: true});
        let channel = interaction.options.getChannel('channel');
        let category = interaction.options.getString('category');
        let data = await service.getGuildData(interaction.guild.id);
        let availableRoles = JSON.parse(data.self_assignable_roles);
        let availableCategories = JSON.parse(data.roles_categories);
        let groups = availableRoles.reduce((groups, item) => {
            const group = (groups[item.category] || []);
            group.push(item);
            groups[item.category] = group;
            return groups;
        }, {});

        if (category) {
            let categoryData = groups[category];
            groups = {};
            groups[category] = categoryData;
        }

        for (let [k, v] of Object.entries(groups)) {
            let embed = new EmbedBuilder();
            let cat = null;
            if (k !== 'null') {
                embed.setTitle(k);
                cat = availableCategories.find(x => x.name === k);
            } else {
                embed.setTitle(' ');
                cat = availableCategories.find(x => x.name === k);
            }
            let description = '';
            if (cat && cat.description) {
                description += cat.description;
            } else {
                description += 'Select any role you want.';
            }
            embed.setDescription(description);
            let options = v.map(r => {
                const role = interaction.guild.roles.cache.get(r.id);

                return {
                    label: role.name,
                    value: role.id,
                    emoji: r.emoji || undefined
                };
            });

            let menu = [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('ReactionRoles')
                        .setMinValues(0)
                        .setMaxValues(options.length)
                        .addOptions(options)
                )
            ];

            channel.send({embeds: [embed], components: menu});
        }
        interaction.editReply(':thumbsup:');
    }
};