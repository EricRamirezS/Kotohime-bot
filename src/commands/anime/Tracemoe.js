const {SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder} = require('discord.js');
const request = require('snekfetch');

/**
 *
 * @type {{data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute(ChatInputCommandInteraction, Client): Promise<void>}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tracemoe')
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
    let BASE_REQUEST = 'https://api.trace.moe/search?anilistInfo&url=';

    await interaction.deferReply();
    request.post(BASE_REQUEST + url)
        .send({usingGoodRequestLibrary: true})
        .then(async r => {
            let title;
            let data = r.body.result[0];
            let animedata = data.anilist;
            if (animedata.isAdult && !interaction.channel.nsfw) {
                return interaction.editReply('I\'m sorry, I can\'t share information about a NSFW anime here.');
            }

            if (animedata.title.english) {
                title = animedata.title.english;
                if (animedata.title.romaji) {
                    title += `\nAlso known as ${animedata.title.romaji}`;
                }
            } else if (animedata.title.romaji) {
                title = animedata.title.romaji;
            } else {
                title = animedata.title.native;
            }
            if (data.video) {
                title += `\n${data.video}`;
            }
            if (data.similarity > 0.89) {
                await interaction.editReply('The anime is ' + title);
            } else if (data.similarity > 0.79) {
                await interaction.editReply('I think the anime is ' + title);
            } else {
                return interaction.editReply('I couldn\'t find an anime with that image.');
            }
        }).catch(e => {
        console.error(e);
        interaction.editReply('I\'m sorry, but I think that what you have sent me is not an image.');
    });
}