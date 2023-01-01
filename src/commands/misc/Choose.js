const {SlashCommandBuilder} = require('discord.js');

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('choose')
        .setDescription('I\'ll choose a random option')
        .addStringOption(o => o.setName('option_1').setDescription('Option').setRequired(true))
        .addStringOption(o => o.setName('option_2').setDescription('Option').setRequired(true))
        .addStringOption(o => o.setName('option_3').setDescription('Option'))
        .addStringOption(o => o.setName('option_4').setDescription('Option'))
        .addStringOption(o => o.setName('option_5').setDescription('Option'))
        .addStringOption(o => o.setName('option_6').setDescription('Option'))
        .addStringOption(o => o.setName('option_7').setDescription('Option'))
        .addStringOption(o => o.setName('option_8').setDescription('Option'))
        .addStringOption(o => o.setName('option_9').setDescription('Option'))
        .addStringOption(o => o.setName('option_10').setDescription('Option'))
        .addStringOption(o => o.setName('option_11').setDescription('Option'))
        .addStringOption(o => o.setName('option_12').setDescription('Option'))
        .addStringOption(o => o.setName('option_13').setDescription('Option'))
        .addStringOption(o => o.setName('option_14').setDescription('Option'))
        .addStringOption(o => o.setName('option_15').setDescription('Option'))
        .addStringOption(o => o.setName('option_16').setDescription('Option'))
        .addStringOption(o => o.setName('option_17').setDescription('Option'))
        .addStringOption(o => o.setName('option_18').setDescription('Option'))
        .addStringOption(o => o.setName('option_19').setDescription('Option'))
        .addStringOption(o => o.setName('option_20').setDescription('Option'))
        .addStringOption(o => o.setName('option_21').setDescription('Option'))
        .addStringOption(o => o.setName('option_22').setDescription('Option'))
        .addStringOption(o => o.setName('option_23').setDescription('Option'))
        .addStringOption(o => o.setName('option_24').setDescription('Option'))
        .addStringOption(o => o.setName('option_25').setDescription('Option'))
    ,

    async execute(interaction, client) {
        let options = [];
        for (let i = 0; i < 25; i++) {
            let opt = interaction.options.getString('option_' + (i + 1));
            if (opt) options.push(opt);
        }
        shuffle(options);
        return await interaction.reply({content: options[0], ephemeral: false});
    }
};
