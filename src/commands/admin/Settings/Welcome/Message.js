const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const service = require('../../../../service/GuildDataService');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('message');
        builder.setDescription('Message to send for new users');
        builder.addStringOption(o => o.setName('message').setDescription('Message to send for new users'));
        return builder;
    },

    async execute(interaction, client) {
        let message = interaction.options.getString('message');

        await interaction.deferReply({
            ephemeral: true
        });

        if (!message){
            let data = await service.getGuildData(interaction.guildId);
            message = data.welcome_message;
            return await interaction.editReply({content: message});
        }

        if (await service.setWelcomeMessage(message, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};