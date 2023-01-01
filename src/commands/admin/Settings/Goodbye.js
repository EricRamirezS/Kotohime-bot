const {SlashCommandSubcommandGroupBuilder, ChatInputCommandInteraction,} = require('discord.js');
const channel = require('./Goodbye/Channel');
const message = require('./Goodbye/Message');
const disable = require('./Goodbye/Disable');

/**
 *
 * @type {{build(  SlashCommandSubcommandGroupBuilder):   SlashCommandSubcommandGroupBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('goodbye');
        builder.setDescription('Goodbye message settings');
        builder.addSubcommand(o => channel.build(o));
        builder.addSubcommand(o => message.build(o));
        builder.addSubcommand(o => disable.build(o));
        return builder;
    },

    execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case 'channel':
                return channel.execute(interaction, client);
            case 'message':
                return message.execute(interaction, client);
        }
    }
};