const {SlashCommandSubcommandGroupBuilder, ChatInputCommandInteraction,} = require('discord.js');
const channel = require('./VoiceLog/Channel');
const disable = require('./VoiceLog/Disable');

/**
 *
 * @type {{build(  SlashCommandSubcommandGroupBuilder):   SlashCommandSubcommandGroupBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('voice_log');
        builder.setDescription('Set a channel for the bot to log voice channel events');
        builder.addSubcommand(o => channel.build(o));
        builder.addSubcommand(o => disable.build(o));
        return builder;
    },

    execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case 'channel':
                return channel.execute(interaction, client);
            case 'disable':
                return disable.execute(interaction, client);
        }
    }
};