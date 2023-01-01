const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('bot response test'),

    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        const latency = client.ws.ping;
        const ping = message.createdTimestamp - interaction.createdTimestamp;
        let newMessage = 'API latency: ${latency}\nClient\'s Ping: ${ping}';
        newMessage = newMessage
            .replace('${latency}', latency.toString())
            .replace('${ping}', ping.toString());

        await interaction.editReply({
            content: newMessage
        });
    }
};
