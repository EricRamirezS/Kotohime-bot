const {SlashCommandSubcommandGroupBuilder, ChatInputCommandInteraction,} = require('discord.js');
const commands = {
    add: require('./Role/Add'),
    remove: require('./Role/Remove'),
    reaction: require('./Role/Reaction'),
    default: require('./Role/Default')
};
/**
 *
 * @type {{build(  SlashCommandSubcommandGroupBuilder):   SlashCommandSubcommandGroupBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('role');
        builder.setDescription('Role management options');
        for (let [k, v] of Object.entries(commands))
            builder.addSubcommand(o => v.build(o));
        return builder;
    },

    async autocomplete(interaction) {
        try {
            commands[interaction.options.getSubcommand()].autocomplete(interaction);
        } catch {
        }
    },

    execute(interaction, client) {
        commands[interaction.options.getSubcommand()].execute(interaction, client);
    }
};