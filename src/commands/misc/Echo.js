const {SlashCommandBuilder,ChatInputCommandInteraction, Client} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('I\'ll repeat what you say')
        .addStringOption(o => o.setName('message').setDescription('What should I say?').setRequired(true))
        .addBooleanOption(o => o.setName('anonymous').setDescription('Should the one making the command be anonymous?')),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    async execute(interaction, client) {
        let anonymous = interaction.options.getBoolean('anonymous');
        let message = interaction.options.getString('message').toString();
        message = message.replaceAll('\\n', '\n');
        if (anonymous) {
            interaction.reply({content: ':thumbsup:', ephemeral: true});
            interaction.channel.send({content: message});
        } else {
            interaction.reply({content: message, ephemeral: false});
        }
    }
};
