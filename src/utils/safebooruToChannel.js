const {safebooruImageToChannel} = require('./ExternalApi/safebooruImage2Channel');
const {ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');
module.exports = async (interaction, tags) => {
    await interaction.deferReply({ephemeral: false, components: []});

    let result = await safebooruImageToChannel(tags, interaction.channel.nsfw);
    if (typeof result === 'string') {
        return await interaction.editReply({
            content: result
        });
    } else {
        let buttons = [];
        if (result.source) {
            buttons.push(new ButtonBuilder()
                .setLabel('View source')
                .setStyle(ButtonStyle.Link)
                .setURL(result.source));
        }
        if (buttons.length === 0) {
            return await interaction.editReply({
                content: result.url,
            });
        } else {
            return await interaction.editReply({
                content: result.url,
                components: [new ActionRowBuilder().addComponents(...buttons)]
            });
        }
    }

}