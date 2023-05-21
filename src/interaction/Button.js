module.exports = async (interaction, client) => {
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