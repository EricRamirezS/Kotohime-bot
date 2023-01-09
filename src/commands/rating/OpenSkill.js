const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
} = require('discord.js');

const report = require('./OpenSkill/Report');
const rating = require('./OpenSkill/Rating');
const ranking = require('./OpenSkill/Ranking');
const service = require('../../service/GuildDataService');

module.exports = {
    /**
     * @type {SlashCommandBuilder}
     */
    data: new SlashCommandBuilder()
        .setName('openskill')
        .setDescription('Open Skill data')
        .addSubcommand(o => report.build(o))
        .addSubcommand(o => rating.build(o))
        .addSubcommand(o => ranking.build(o)),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case 'report':
                return report.execute(interaction, client);
            case 'rating':
                return rating.execute(interaction, client);
            case 'ranking':
                return ranking.execute(interaction, client);
        }
    },

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {string|void}
     */
    hasPermission: function (interaction, client) {
        if (interaction.options.getSubcommand() !== 'report') return;

        let guildData = service.getQuickGuildData(interaction.guildId);

        if (!interaction.member.roles.cache.get(guildData.open_skill_role))
            return 'You do not have permissions to report scores.';
    }
};

