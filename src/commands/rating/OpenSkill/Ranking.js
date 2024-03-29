const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction, EmbedBuilder} = require('discord.js');
const service = require('../../../service/GuildDataService');
const {ordinal} = require('openskill');

const position = [':first_place:', ':second_place:', ':third_place:',
    ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':keycap_ten:'];
/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('ranking');
        builder.setDescription('See the top 10 players of the server');
        builder.addBooleanOption(o => o.setName('public').setDescription('Display ranking to everyone'));
        return builder;
    },

    async execute(interaction, client) {
        let publicDisplay = interaction.options.getBoolean('public');
        let ephemeral = !!!publicDisplay;
        await interaction.deferReply({
            ephemeral: ephemeral
        });

        let guildData = await service.getGuildData(interaction.guildId);
        let data = JSON.parse(guildData.open_skill);

        let rankingData = [];

        for (const [key, value] of Object.entries(data)) {
            let userData = {};
            userData.id = key;
            userData.skill = ordinal(value.rating);
            userData.data = value.rating;
            userData.totalGames = value.games;
            rankingData.push(userData);
        }
        rankingData.sort((p1, p2) => {
            let p1mod = 0;
            let p2mod = 0;
            if (p1.totalGames <= 10) p1mod = -9999;
            else if (p1.totalGames <= 20) p1mod = -999; 
            if (p2.totalGames <= 10) p2mod = -9999;
            else if (p2.totalGames <= 20) p2mod = -999;
            return (p2.skill + p2mod) - (p1.skill + p1mod);
        });
        let embed = new EmbedBuilder();

        embed.setTitle('Ranking');

        let offset = 0;
        let lastOrdinal = Number.MAX_VALUE;
        for (let i = 0; i < 10 && i < rankingData.length; i++) {
            let userData = rankingData[i];
            if (userData.skill === lastOrdinal) {
                offset--;
            } else {
                offset = 0;
            }
            let member = await interaction.guild.members.cache.get(userData.id);
            let username;
            if (member) {
                username = member.displayName;
            } else {
                username = `Unknown (${userData.id})`;
            }

            let extra = '';
            if (userData.totalGames <= 10) {
                extra = '??';
            } else if (userData.totalGames <= 20) {
                extra = '?';
            }

            embed.addFields({
                name: `${position[i + offset]} ${username}`,
                value: `${Math.round(userData.skill)}${extra}`,
                inline: false
            });

            lastOrdinal = userData.skill;
        }

        return await interaction.editReply({
            embeds: [embed],
        });
    }
};
