const {SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction} = require('discord.js');

// Subcommand Groups

const commandGroups = {
    category: require('./Settings/Category'),
    role: require('./Settings/Role'),
    goodbye: require('./Settings/Goodbye'),
    welcome: require('./Settings/Welcome'),
    voiceLog: require('./Settings/VoiceLog'),
    openskill: require('./Settings/OpenSkill'),
};
// Subcommand
const commands = {
    language: require('./Settings/Language'),
    see: require('./Settings/See'),
    nsfw: require('./Settings/Nsfw'),
};

/**
 *
 * @param builder {SlashCommandBuilder}
 * @returns {SlashCommandBuilder}
 */
function build(builder) {
    builder.setName('setting');
    builder.setDescription('Change my behavior in your server');
    for (let [k, v] of Object.entries(commandGroups))
        builder.addSubcommandGroup(o => v.build(o));
    for (let [k, v] of Object.entries(commands))
        builder.addSubcommand(o => v.build(o));

    builder.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

    return builder;
}

module.exports = {


    build,

    /**
     * @returns {SlashCommandBuilder}
     */
    data: build(new SlashCommandBuilder()),


    async autocomplete(interaction) {
        try {
            if (interaction.options.getSubcommandGroup()) {
                return commandGroups[interaction.options.getSubcommandGroup()].autocomplete(interaction);
            }
            return commands[interaction.options.getSubcommand()].autocomplete(interaction);
        } catch {
        }
    },

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<*>}
     */
    async execute(interaction, client) {
        if (interaction.options.getSubcommandGroup()) {
            return commandGroups[interaction.options.getSubcommandGroup()].execute(interaction, client);
        }
        return commands[interaction.options.getSubcommand()].execute(interaction, client);
    }
};