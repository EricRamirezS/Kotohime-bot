const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
} = require('discord.js');

const report = require('./OpenSkill/Report');
const rating = require('./OpenSkill/Rating');
const ranking = require('./OpenSkill/Ranking');

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
};

