const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('I\'ll trow one or more dice')
        .addIntegerOption(o => o.setName('dice').setDescription('Number of dice'))
        .addIntegerOption(o => o.setName('faces').setDescription('Number of faces of each die')),

    async execute(interaction, client) {
        let dice = interaction.options.getInteger('dice');
        if (!dice) dice = 1;
        let faces = interaction.options.getInteger('faces');
        if (!faces) faces = 6;

        if (dice < 1) return interaction.reply({content: 'I need at least one die', ephemeral: true});
        if (faces < 2) return interaction.reply({content: 'Dice must have at least 2 faces', ephemeral: true});

        await interaction.deferReply({ephemeral: false});
        let diceResults = [];
        for (let i = 0; i < dice; i++) {
            diceResults.push(Math.floor(Math.random() * faces) + 1);
        }
        try {
            await interaction.editReply({content: diceResults.join(', ')});
            return await interaction.followUp({
                content: 'Total: ' + diceResults.reduce((a, b) => a + b, 0).toLocaleString()
            });
        } catch (e) {
            console.error(e);
            return await interaction.editReply({content: 'Too many dice'});
        }
    }
};
