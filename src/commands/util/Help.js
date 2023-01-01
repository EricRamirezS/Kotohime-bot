const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('bot response test')
        ,

    async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: true
        });

        //TODO: Help Command
        let commands = client.commands
    }
};
