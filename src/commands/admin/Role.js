const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
} = require('discord.js');
const get = require('./Role/Get');
const drop = require('./Role/Drop');
const list = require('./Role/List');

module.exports = {
    /**
     * @type {SlashCommandBuilder}
     */
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Modify your roles in this server')
        .addSubcommand(o => get.build(o))
        .addSubcommand(o => drop.build(o))
        .addSubcommand(o => list.build(o)),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case 'get':
                return get.execute(interaction, client);
            case 'drop':
                return drop.execute(interaction, client);
            case 'list':
                return list.execute(interaction, client);
        }
    },
};

