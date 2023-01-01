const {SlashCommandBuilder, ChatInputCommandInteraction} = require('discord.js');

const play = require('./Radio/play');
const see = require('./Radio/see');

module.exports = {
    /**
     * @type {SlashCommandBuilder}
     */
    data: new SlashCommandBuilder()
        .setName('radio')
        .setDescription('Gensokyou Radio')
        .addSubcommand(o => play.build(o))
        .addSubcommand(o => see.build(o)),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case 'play':
                return play.execute(interaction, client);
            case 'see':
                return see.execute(interaction, client);
        }
    },
};

