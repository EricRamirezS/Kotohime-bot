const {Events} = require('discord.js');
const {stripIndents} = require('common-tags');

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const {commands} = client;
            const {commandName} = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                try {
                    if (command.hasPermission) {
                        let response = command.hasPermission(interaction, client);
                        if (response) {
                            return interaction.reply({
                                content: response,
                                ephemeral: true
                            });
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                if (await interaction.fetchReply()) {
                    await interaction.editReply({
                        content: stripIndents`Unexpected error.`,
                        ephemeral: true
                    });
                } else {
                    await interaction.reply({
                        content: stripIndents`Unexpected error.`,
                        ephemeral: true
                    });
                }
            }
        } else if (interaction.isButton()) {
            const {buttons} = client;
            const {customId} = interaction;
            const button = buttons.get(customId.split('|')[0]);
            if (button) {
                try {
                    button.execute(interaction, client);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({
                        content: `Ha ocurrido un error inesperado.\n
                    Revise la consola para más información`,
                        ephemeral: true
                    });
                }
            }
        }
    }
};