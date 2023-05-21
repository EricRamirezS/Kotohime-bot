module.exports = async (interaction, client) => {
    const {selectMenus} = client;
    const {customId} = interaction;
    const menu = selectMenus.get(customId);
    if (menu) {
        try {
            menu.execute(interaction, client);
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