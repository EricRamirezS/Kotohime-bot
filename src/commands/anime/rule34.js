const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} = require('discord.js');
const service = require('../../service/GuildDataService');
const {rule34Image2Channel} = require('../../utils/ExternalApi/rule34Image2Channel');
const {DiscordAPIError} = require('@discordjs/rest');

/**
 *
 * @type {{data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute(ChatInputCommandInteraction, Client): Promise<void>}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rule34')
        .setDescription('I\'ll send a random rule34 image')
        .addStringOption(o => o.setName('tags')
            .setDescription('tags to search')
            .setRequired(true)),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        try {
            await interaction.deferReply({ephemeral: false, components: []});

            let tags = interaction.options.getString('tags') ? interaction.options.getString('tags') : '';

            let result = await rule34Image2Channel(tags);
            if (typeof result === 'string') {
                return await interaction.editReply({
                    content: result
                });
            } else {
                let buttons = [];

                // language=RegExp}
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
                    try{
                    return await interaction.editReply({
                        content: result.url,
                        components: [new ActionRowBuilder().addComponents(...buttons)]
                    });
                    } catch (e){
                        if (e instanceof DiscordAPIError){
                            return await interaction.editReply({
                                content: result.url
                            });
                        } else {
                            console.error(e)
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    },

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {string|void}
     */
    hasPermission: function (interaction, client) {
        let guildData = service.getQuickGuildData(interaction.guildId);

        if (!guildData.allow_nsfw_commands) {
            return 'This server does not allow the use of NSFW commands';
        }

        if (!interaction.channel.nsfw) {
            return 'NSFW commands can only be use in NSFW channels';
        }
    }
};

