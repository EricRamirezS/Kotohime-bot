const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lenny')
        .setDescription('You know what it is'),

    async execute(interaction, client) {
        interaction.reply({content: '( ͡~ ͜ʖ ͡°)', ephemeral: false});
    }
};
