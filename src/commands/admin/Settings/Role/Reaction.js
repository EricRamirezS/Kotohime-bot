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
        builder.setDescription('Creates a reaction message to get roles. \n' +
            'Up to 25 roles can be displayed per Category.');
        builder.addChannelOption(o => o.setName('channel').setDescription('Channel to send the messages')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText));
        builder.addStringOption(o => o.setName('category').setDescription('Specify the role category.')
            .setAutocomplete(true));
        builder.addIntegerOption(o => o.setName('min').setDescription('Minimum of roles required (Default: 0)')
            .setMinValue(0).setMaxValue(25));
        builder.addIntegerOption(o => o.setName('max').setDescription('Maximum of roles allowed (Default: 25)')
            .setMinValue(1).setMaxValue(25));
        return builder;
    },

    async autocomplete(interaction) {
        await autocompleteCategories(interaction);
    },

    async execute(interaction, client) {
        await interaction.deferReply({ephemeral: true});
        let channel = interaction.options.getChannel('channel');
        let category = interaction.options.getString('category');
        let min = interaction.options.getInteger('min');
        let max = interaction.options.getInteger('max');
        if (!min) min = 0;
        if (!max) max = 25;
        min = Math.min(min, max);
        max = Math.max(min, max);

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
                description += cat.description.replaceAll('\\n', '\n');
            } else {
                description += 'Select any role you want.';
            }
            embed.setDescription(description);
            let options = v.map(r => {
                let role = interaction.guild.roles.cache.get(r.id);
                return {
                    label: role.name,
                    value: role.id,
                    emoji: r.emoji || undefined
                };
            });

            options.slice(0, 25);

            let menu = [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('ReactionRoles')
                        .setMinValues(Math.min(min, options.length))
                        .setMaxValues(Math.min(max, options.length))
                        .addOptions(options)
                )
            ];

            channel.send({embeds: [embed], components: menu});
        }
        interaction.editReply(':thumbsup:');
    }
};