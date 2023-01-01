const {SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits} = require('discord.js');

/**
 *
 * @type {{data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute(ChatInputCommandInteraction, Client): Promise<void>}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('I\'ll send my developer a direct message with what you have to say')
        .addStringOption(o => o.setName('message')
            .setDescription('message to send')
            .setMinLength(1)
            .setMaxLength(1800)
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const message = interaction.options.getString('message');

        await interaction.deferReply({
            ephemeral: true,
            content: 'Enviando mensaje, por favor espere'
        });

        client.users.cache.get(process.env.DEVELOPER_ID).send(interaction.author + ' | ' + message)
            .then(() => {
                interaction.editReply({
                    content: 'El mensaje ha sido enviado exitosamente. Recuerda que tambien puedes invitar al ' +
                        'desarrollador usando el comando `invitardev` si necesitas ayuda directa'
                });
            })
            .catch((err) => {
                interaction.editReply({
                    content: 'Ha ocurrido un error inesperado.\n' + err.toString()
                });
            });
    }
};