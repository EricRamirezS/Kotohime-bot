const {stripIndents} = require('common-tags');
module.exports = async (interaction, client) => {
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

}