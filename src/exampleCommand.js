const {SlashCommandBuilder, ChatInputCommandInteraction} = require('discord.js');
const {EmbedBuilder} = require('discord.js');


module.exports = {
    /**
     * @type {SlashCommandBuilder}
     */
    data: new SlashCommandBuilder()
        .setName('example')
        .setDescription('example mockup'),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        await interaction.deferReply({ephemeral: true});

        let embed = new EmbedBuilder();
        embed.setTitle('example title');
        embed.setColor("#FF0000");

        let fields = {name: 'test field:', value: "test value", inline: true}
        embed.addFields(fields);
    },
};

