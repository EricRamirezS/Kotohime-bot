const {
    SlashCommandBuilder,
    ChatInputCommandInteraction, PermissionFlagsBits,
} = require('discord.js');

const commands = {
    get: require('./Role/Get'),
    drop: require('./Role/Drop'),
    list: require('./Role/List'),
};


/**
 *
 * @param builder {SlashCommandBuilder}
 * @returns {SlashCommandBuilder}
 */
function build(builder) {
    builder.setName('role');
    builder.setDescription('Modify your roles in this server');
    for (let [k, v] of Object.entries(commands))
        builder.addSubcommand(o => v.build(o));
    return builder;
}

module.exports = {
    /**
     * @type {SlashCommandBuilder}
     */
    data: build(new SlashCommandBuilder()),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        return commands[interaction.options.getSubcommand()].execute(interaction, client);
    },
};

