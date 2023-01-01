const {SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction} = require('discord.js');

// Subcommand Groups
const role = require('./Settings/Role');
const goodbye = require('./Settings/Goodbye');
const welcome = require('./Settings/Welcome');
const voiceLog = require('./Settings/VoiceLog');

// Subcommand
const language = require('./Settings/Language');
const see = require('./Settings/See');
const nsfw = require('./Settings/Nsfw');

/**
 *
 * @param builder {SlashCommandBuilder}
 * @returns {SlashCommandBuilder}
 */
function build(builder) {
    builder.setName('setting');
    builder.setDescription('Change my behavior in your server');
    builder.addSubcommandGroup(o => role.build(o));
    builder.addSubcommandGroup(o => welcome.build(o));
    builder.addSubcommandGroup(o => goodbye.build(o));
    builder.addSubcommandGroup(o => voiceLog.build(o));
    builder.addSubcommand(o => see.build(o));
    builder.addSubcommand(o => language.build(o));
    builder.addSubcommand(o => nsfw.build(o));
    builder.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
    return builder;
}

module.exports = {


    build,

    /**
     * @returns {SlashCommandBuilder}
     */
    data: build(new SlashCommandBuilder()),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<*>}
     */
    async execute(interaction, client) {
        switch (interaction.options.getSubcommandGroup()) {
            case 'role':
                return role.execute(interaction, client);
            case 'goodbye':
                return goodbye.execute(interaction, client);
            case 'welcome':
                return welcome.execute(interaction, client);
            case 'voice_log':
                return voiceLog.execute(interaction, client);
        }
        switch (interaction.options.getSubcommand()) {
            case 'see':
                return see.execute(interaction, client);
            case 'nsfw':
                return nsfw.execute(interaction, client);
        }
    }
};