const commando = require('discord.js-commando');
const request = require('snekfetch');
const Discord = require('discord.js');


class SaucenaoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'saucenao',
            group: 'anime',
            memberName: 'saucenao',
            description: 'Dame una imagen y te diré su fuente.',
            examples: ['saucenao'],
            throttling: {
                usages: 200,
                duration: 86400,
            },
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

async function searchImage(channel, url) {
    let BASE_REQUEST = "https://saucenao.com/search.php?";
    let request_params = [
        "api_key=" + process.env.SAUCENAO_KEY,
        "output_type=2", //JSON
        "testmode=1",
        "numred=3",
        "url=" + url,
    ]

    let res = [];
    request.post(BASE_REQUEST + "db=" + 999 + "&" + request_params.join("&"))
        .send()
        .then(r => {
            let results = JSON.parse(r.text).results;
            if (results) {
                for (let j = 0; j < results.length; j++) res.push(results[j]);
            }
        }).catch(e => {
            console.log(e);
            channel.send("¿Realmente me has enviado una imagen? Ha pasado algo inesperado.")
        }
    );

    if (res.length > 0) {
        channel.send("Esto ha sido lo más parecido que he encontrado");
        res.sort(((a, b) => b.header.similarity - a.header.similarity))
        for (let i = 0; i < 3 || i < res.length; i++) {
            let keys = Object.keys(res[i].data);
            let embed = new Discord.MessageEmbed();
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                if (Array.isArray(res[i].data[key])) {
                    embed.addField(key.replace("_", " "), res[i].data[key].join("\n"), true);
                } else {
                    embed.addField(key.replace("_", " "), res[i].data[key], true);
                }
                channel.send(embed);
            }
        }
    } else {
        channel.send("No he podido encontrar nada.");
    }
}

module.exports = SaucenaoCommand;
