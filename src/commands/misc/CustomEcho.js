const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    Client,
    PermissionFlagsBits,
    Webhook,
    WebhookClient
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('custom_echo')
        .setDescription('I\'ll repeat what you say')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(o => o.setName('message').setDescription('What should I say?').setRequired(true))
        .addStringOption(o => o.setName('name').setDescription('What\'s the author name?').setRequired(true))
        .addAttachmentOption(o => o.setName('profile').setDescription('Profile picture'))
    ,

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    async execute(interaction, client) {
        let name = interaction.options.getString('name');
        let message = interaction.options.getString('message');
        let profile = interaction.options.getAttachment('profile');

        await interaction.deferReply({ephemeral: true});

        if (profile) {
            if (!profile.contentType.startsWith('image')) {
                return await interaction.editReply({content: 'Attachment is not an image'});
            }
            profile = profile.proxyURL;
        }

        message = message.replaceAll('\\n', '\n');

        let webhook = await interaction.channel.createWebhook({
            name: name,
            avatar: profile,
        });

        const webhookClient = new WebhookClient({id: webhook.id, token: webhook.token});

        await webhookClient.send({
            content: message,
            username: name,
            avatarURL: profile
        });

        await webhook.delete("used");

        return await interaction.editReply({content: ':thumbsup:'});
    }
};
