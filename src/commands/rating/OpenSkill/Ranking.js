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
        return builder;
    },

    async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: true
        });

        let guildData = await service.getGuildData(interaction.guildId);
        let data = JSON.parse(guildData.open_skill);

        let rankingData = [];

        for (const [key, value] of Object.entries(data)) {
            let userData = {};
            userData.id = key;
            userData.skill = ordinal(value);
            rankingData.push(userData);
        }
        rankingData.sort((p1, p2) => p2.skill - p1.skill);
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
            if (member){
                username = member.displayName
            } else {
                username = `Unknown (${userData.id})`
            }
            embed.setFields({
                name: `${position[i + offset]} ${username}`,
                value: `${Math.round(userData.skill)}`,
                inline: false
            });

            lastOrdinal = userData.skill;
        }

        return await interaction.editReply({
            embeds: [embed],
            ephemeral: true
        });
    }
};