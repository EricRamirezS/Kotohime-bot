const {SlashCommandBuilder} = require('discord.js');
const card = require('./Danmaku/Card');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('danmaku')
        .setDescription('Danmaku!! Card Game')
        .addSubcommand(o => card.build(o)),

    async execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case 'card':
                return card.execute(interaction, client);
        }
    }
};
