const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../service/GuildDataService');
const {rating, rate} = require('openskill');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('report');
        builder.setDescription('Report results of a game');
        builder.addUserOption(o => o.setName(`player1`).setDescription(`Player 1`).setRequired(true));
        builder.addIntegerOption(o => o.setName(`rank_p1`).setDescription(`ranking of Player 1`).setRequired(true));
        builder.addUserOption(o => o.setName(`player2`).setDescription(`Player 2`).setRequired(true));
        builder.addIntegerOption(o => o.setName(`rank_p2`).setDescription(`ranking of Player 2`).setRequired(true));

        for (let i = 3; i <= 12; i++) {
            builder.addUserOption(o => o.setName(`player${i}`).setDescription(`Player ${i}`));
            builder.addIntegerOption(o => o.setName(`rank_p${i}`).setDescription(`ranking of Player ${i}`));
        }
        return builder;
    },

    async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: true
        });
        try {
            let guildData = await service.getGuildData(interaction.guildId);
            let data = JSON.parse(guildData.open_skill);

            let gameData = getParams(interaction);

            for (let userData of gameData) {
                if (userData in data) {
                    userData.rating = data[userData.id];
                } else {
                    userData.rating = rating({mu: 1500, sigma: 500});
                }
            }

            let rateData = [];
            let rankData = [];
            for (let i = 0; i < gameData.length; i++) {
                let userData = gameData[i];
                rateData.push(userData.rating);
                rankData.push(userData.rank);
            }

            let newData = rate(rateData, {rank: rankData});

            for (let i = 0; i < gameData.length; i++) {
                gameData[i].rating = newData[i][0];
            }

            for (let userData of gameData) {
                data[userData.id] = userData.rating;
            }

            if (await service.updateOpenSkillInfo(data, interaction.guildId)) {
                return await interaction.editReply({content: ':thumbsup:'});
            } else {
                return await interaction.editReply({content: ':thumbsdown:'});
            }
        } catch (e) {
            console.error(e);
            return interaction.editReply('Some users are missing their rank');
        }
    },

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {string|void}
     */
    hasPermission: function (interaction, client) {
        let guildData = service.getQuickGuildData(interaction.guildId);

        if (!interaction.member.roles.cache.get(guildData.open_skill_role)) {
            return 'You do not have permissions to report scores.';
        }
    }
};

/**
 *
 * @param interaction {ChatInputCommandInteraction}
 */
function getParams(interaction) {
    let data = [];

    for (let i = 1; i <= 12; i++) {
        let userData = {};
        let user = interaction.options.getUser(`player${i}`);
        let rank = interaction.options.getInteger(`rank_p${i}`);
        if (user) {
            if (rank) {
                userData.id = user.id;
                userData.rank = rank;
                userData.rating = null;
                data.push(userData);
            } else {
                throw new Error('Missing Rank');
            }
        }
    }

    return data;
}