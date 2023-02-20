const {SlashCommandBuilder,ChatInputCommandInteraction, Client} = require('discord.js');
const { uuid } = require('uuidv4');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uuid')
        .setDescription('Generates a 32 bytes unique id')
        .addBooleanOption(o => o.setName('hyphens').setDescription("Keep Hyphens")),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    async execute(interaction, client) {
        let hyphens = interaction.options.getBoolean('hyphens');
        if (hyphens){
            return await interaction.reply({content: `\`${uuid()}\``, ephemeral: false});
        }
        return await interaction.reply({content: `\`${uuid().replaceAll("-","")}\``, ephemeral: false});
    }
};
