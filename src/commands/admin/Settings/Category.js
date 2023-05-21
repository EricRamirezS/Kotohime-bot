const {SlashCommandSubcommandGroupBuilder, ChatInputCommandInteraction,} = require('discord.js');
const add = require('./Category/Add');
const remove = require('./Category/Remove');

/**
 *
 * @type {{build(  SlashCommandSubcommandGroupBuilder):   SlashCommandSubcommandGroupBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('category');
        builder.setDescription('Categories for roles');
        builder.addSubcommand(o => add.build(o));
        builder.addSubcommand(o => remove.build(o));
        return builder;
    },

    async autocomplete(interaction) {
        try {
            switch (interaction.options.getSubcommand()) {
                case 'add':
                    return add.autocomplete(interaction);
                case 'remove':
                    return remove.autocomplete(interaction);
            }
        } catch {
        }
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