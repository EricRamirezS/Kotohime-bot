const {Events, Client, ChatInputCommandInteraction} = require('discord.js');
const {stripIndents} = require('common-tags');
const autocomplete = require('../../interaction/Autocomplete');
const button = require('../../interaction/Button');
const chatInputCommand = require('../../interaction/ChatInputCommand');
const stringSelectMenu = require('../../interaction/StringSelectMenu');

module.exports = {
    name: Events.InteractionCreate,

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<*>}
     */
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) return await chatInputCommand(interaction, client);
        else if (interaction.isButton()) return await button(interaction, client);
        else if (interaction.isAutocomplete()) return await autocomplete(interaction, client);
        else if (interaction.isStringSelectMenu()) return await stringSelectMenu(interaction, client);
    }
};