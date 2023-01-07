const {SlashCommandSubcommandGroupBuilder, ChatInputCommandInteraction,} = require('discord.js');
const reset = require('./OpenSkill/Reset');
const role = require('./OpenSkill/Role');
const preset = require('./OpenSkill/Preset');

/**
 *
 * @type {{build(  SlashCommandSubcommandGroupBuilder):   SlashCommandSubcommandGroupBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('openskill');
        builder.setDescription('OpenSkill management options');
        builder.addSubcommand(o => reset.build(o));
        builder.addSubcommand(o => role.build(o));
        builder.addSubcommand(o => preset.build(o));
        return builder;
    },

    execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case 'reset':
                return reset.execute(interaction, client);
            case 'role':
                return role.execute(interaction, client);
            case 'preset':
                return preset.execute(interaction, client);
        }
    }
};