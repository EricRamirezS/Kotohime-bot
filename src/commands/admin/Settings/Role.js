const {SlashCommandSubcommandGroupBuilder, ChatInputCommandInteraction,} = require('discord.js');
const add = require('./Role/Add');
const remove = require('./Role/Remove');

/**
 *
 * @type {{build(  SlashCommandSubcommandGroupBuilder):   SlashCommandSubcommandGroupBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('role');
        builder.setDescription('Role management options');
        builder.addSubcommand(o => add.build(o));
        builder.addSubcommand(o => remove.build(o));
        return builder;
    },

    execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case 'add':
                return add.execute(interaction, client);
            case 'remove':
                return remove.execute(interaction, client);
        }
    }
};