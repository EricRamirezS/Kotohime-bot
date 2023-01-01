const {SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder} = require('discord.js');
const request = require('snekfetch');

/**
 *
 * @type {{data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute(ChatInputCommandInteraction, Client): Promise<void>}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('saucenao')
        .setDescription('I\'ll get the source from an image')
        .addStringOption(o => o.setName('url')
            .setDescription('Image I should look for')
            .setRequired(true)),

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        let url = interaction.options.getString('url');
        try {
            await new URL(url);
        } catch {
            return interaction.reply({ephemeral: true, content: 'The input is not an URL'});
        }

        await searchImage(interaction, url);
    },
};

async function searchImage(interaction, url) {
    let BASE_REQUEST = 'https://saucenao.com/search.php?';
    let request_params = [
        'api_key=' + process.env.SAUCENAO_KEY,
        'output_type=2', //JSON
        'testmode=1',
        'numres=3',
        'url=' + url,
    ];

    interaction.deferReply({ephemeral: false});

    let res = [];
    let error = false;
    await request.post(BASE_REQUEST + 'db=' + 999 + '&' + request_params.join('&'))
        .send()
        .then(r => {
            let results = r.body.results;
            if (results) {
                for (let j = 0; j < results.length; j++) res.push(results[j]);
            }
        }).catch(e => {
                error = true;
                if (e.status === 429) {
                    interaction.editReply('I can\'t search right now, can you try again later?');
                } else {
                    console.error(e);
                    interaction.editReply('Did you really send me a picture? Something unexpected has happened.');
                }
            }
        );

    if (error) return;

    if (res.length > 0) {
        await interaction.editReply('Esto ha sido lo más parecido que he encontrado');
        res.sort(((a, b) => b.header.similarity - a.header.similarity));
        for (let i = 0; i < 3 && i < res.length; i++) {
            let keys = Object.keys(res[i].data);
            let embed = new EmbedBuilder();
            for (let j = 0; j < keys.length; j++) {
                let key = keys[j];
                let header = key.replace('_', ' ');
                let data = res[i].data[key];
                if (Array.isArray(res[i].data[key])) {
                    embed.addFields({name: header.toString(), value: data ? data.join('\n') : '-', inline: true});
                } else {
                    embed.addFields({name: header.toString(), value: (data ? data : '-').toString(), inline: true});
                }
            }
            await interaction.followUp({embeds: [embed]});
        }
        return;
    }

    await interaction.editReply('No he podido encontrar nada.');
}