const commando = require('discord.js-commando');
const request = require('snekfetch');

class TraceMoeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'tracemoe',
            group: 'anime',
            memberName: 'tracemoe',
            description: 'Dame una imagen y te diré de qué anime es.',
            examples: ['tracemoe'],
            args: [{
                key: 'url',
                prompt: 'Link de la imagen que debo investigar',
                type: 'string',
                default: ""
            }]
        });
    }

    async run(message, args) {
        if (message.attachments && message.attachments.size) {
            let url = message.attachments.get(message.attachments.keyArray()[0]).url;
            searchImage(message.channel, url)
        } else {
            if (validURL(args.url)) {
                searchImage(message.channel, args.url);
            } else {
                message.reply("Necesito que me envies una imagen o el link de una imagen para buscarla.")
            }
        }
    }
}

function validURL(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function searchImage(channel, url) {
    let BASE_REQUEST = "https://trace.moe/api/search?url=";

    request.post(BASE_REQUEST + url)
        .send({usingGoodRequestLibrary: true})
        .then(r => {
            let title = "";
            let animedata = JSON.parse(r.text).docs[0];
            if (animedata.similarity > 0.9) {
                if (animedata.title_english) {
                    title = animedata.title_english;
                } else if (animedata.title_romaji) {
                    title = animedata.title_romaji;
                } else {
                    title = animedata.title;
                }
                channel.send("El anime es " + title);
            } else {
                channel.send("No he encontrado ningún anime con esa imagen");
            }
        }).catch(e => {
        console.log(e);
        channel.send("Lo siento, pero creo que lo que me has enviado no es una imagen.");
    });
}

module.exports = TraceMoeCommand;
