const {SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits} = require('discord.js');
const {stripIndents} = require('common-tags');

/**
 *
 * @type {{data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute(ChatInputCommandInteraction, Client): Promise<void>}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite_dev')
        .setDescription('I\'ll send my developer a direct message with an invitation to this server')
        .addStringOption(o => o.setName('message')
            .setDescription('message to send')
            .setMinLength(1)
            .setMaxLength(1800))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute: async function (interaction, client) {
        let message = interaction.options.getString('message');
        if (!message) message = '';
        await interaction.deferReply({
            ephemeral: true,
            content: 'Enviando mensaje, por favor espere'
        });

        let invite = await interaction.channel.createInvite({
            maxUses: 1,
            unique: true,
            reason: 'Kotohime\'s invite dev command'
        });

        client.users.cache.get(process.env.DEVELOPER_ID).send(
            stripIndents`${interaction.guild.name} | ${invite.url} | ${message}`)
            .then(() => {
                interaction.editReply({content: ':thumbsup:'});
            })
            .catch((err) => {
                console.error(err);
                interaction.editReply({content: ':thumbsdown:'});
            });
    }
};