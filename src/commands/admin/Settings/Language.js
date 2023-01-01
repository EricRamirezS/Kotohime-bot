const {
    SlashCommandSubcommandBuilder,
    ChatInputCommandInteraction,
    APIApplicationCommandOptionChoice
} = require('discord.js');
const service = require('../../../service/GuildDataService');

/**
 *
 * @type APIApplicationCommandOptionChoice<>
 */
const languages = [
    {name: 'English', value: 'en-US'},
    {name: 'български', value: 'bg'},
    {name: '中文（简体）', value: 'zh-CN'},
    {name: 'Hrvatski', value: 'hr'},
    {name: 'čeština', value: 'cs'},
    {name: 'dansk', value: 'da'},
    {name: 'Nederlandse', value: 'nl'},
    {name: 'Français', value: 'fr'},
    {name: 'Deutsch', value: 'de'},
    {name: 'Ελληνικά', value: 'el'},
    {name: 'Magyar', value: 'hu'},
    {name: 'italiano', value: 'it'},
    {name: '日本語', value: 'ja'},
    {name: '한국어', value: 'ko'},
    {name: 'lietuvių', value: 'lt'},
    {name: 'norsk', value: 'no'},
    {name: 'Polski', value: 'pl'},
    {name: 'Português', value: 'pt-BR'},
    {name: 'Română', value: 'ro'},
    {name: 'Русский', value: 'ru'},
    {name: 'Español', value: 'es-ES'},
    {name: 'svenska', value: 'sv-SE'},
    {name: 'ภาษาไทย', value: 'th'},
    {name: 'Türkçe', value: 'tr'},
    {name: 'Tiếng Việt', value: 'vi'}
];

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('language');
        builder.setDescription('Set the language for the server');
        builder.addStringOption(o => o.setName('language_name')
            .setDescription('New language').addChoices(...languages).setRequired(true));
        return builder;
    },

    async execute(interaction, client) {
        let language = interaction.options.getString('language_name');

        await interaction.deferReply({
            ephemeral: true
        });

        if (await service.setLanguage(language, interaction.guildId)) {
            return await interaction.editReply({content: ':thumbsup:'});
        } else {
            return await interaction.editReply({content: ':thumbsdown:'});
        }
    }
};