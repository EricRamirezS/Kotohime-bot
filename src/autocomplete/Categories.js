const service = require('../service/GuildDataService');
const { ChatInputCommandInteraction } = require('discord.js')

/**
 *
 * @param interaction (ChatInputCommandInteraction)
 */
module .exports = async (interaction) => {
    const focusedOption = interaction.options.getFocused(true);
    let choices;

    if (focusedOption.name === 'category') {
        let data = await service.getGuildData(interaction.guild.id);
        choices = JSON.parse(data.roles_categories).map(e => e.name);
    }

    const filtered = choices.filter(choice => choice.startsWith(focusedOption.value)).slice(0, 25);
    await interaction.respond(
        filtered.map(choice => ({name: choice, value: choice})),
    );

}