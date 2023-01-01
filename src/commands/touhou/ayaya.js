const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
} = require('discord.js');
const safebooruToChannel = require('../../utils/safebooruToChannel')
/**
 *
 * @type {{data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute(ChatInputCommandInteraction, Client): Promise<void>}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ayaya')
        .setDescription('I\'ll send a random Aya image from safebooru')
        .addStringOption(o => o.setName('tags')
            .setDescription('additional tags to search')),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        let specificTag = 'shameimaru_aya';
        let tags = interaction.options.getString('tags');
        if (tags) tags += ' ' + specificTag;
        else tags = specificTag;
        await safebooruToChannel(interaction, tags);
    },
};

