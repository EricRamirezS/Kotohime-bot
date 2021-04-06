const request = require('snekfetch');
const xmldoc = require('xmldoc');
const fs = require('fs');

var BANNED_TAGS = null;

/**
 *
 * @param message Discord message object
 * @param tag search tag
 */
let safebooruImageToChannel = function (message, tag) {

    loadBannedTags();

    let BASE_REQUEST;
    if (!message.channel.nsfw) {
        BASE_REQUEST = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=' + tag + BANNED_TAGS.join("+-");
    } else {
        BASE_REQUEST = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=' + tag;
    }

    request.post(BASE_REQUEST + "&limit=0") //En este momento, solo importa el count}
        .send({usingGoodRequestLibrary: true})
        .then(r => {
            let postCount = getNumberOfImages(r);

            // Finalizar función si no hay imágenes indicados con los tags solicitados
            // noinspection EqualityComparisonWithCoercionJS
            if (postCount == 0) {
                message.channel.send("No he encontrado ninguna imagen con los tags mencionados");
                return;
            }

            // Obteniendo 5 imagenes aleatoria
            let pid = Math.floor(Math.random() * Math.floor((postCount - 1)));
            let req = BASE_REQUEST + "&limit=1&pid=" + pid;

            request.post(req)
                .send({usingGoodRequestLibrary: true})
                .then(r => sendRandomImage(r, message))
                .catch(() => message.channel.send("*Lo siento, no pude encontrar una imagen que pueda enviar.*"));
        });
};

function loadBannedTags() {
    if (BANNED_TAGS) return;

    BANNED_TAGS = [""];

    try {
        const data = fs.readFileSync('./dataFiles/BannedTagsData/banned_tags.txt', 'utf8');
        BANNED_TAGS = data.split("\n");
    } catch (err) {
        console.error(err);
    }
}

function getNumberOfImages(r) {
    // Obteniendo el número de imagenes existentes con este resultado
    let s = r.body.toString();
    let document = new xmldoc.XmlDocument(s);
    return document.attr.count;
}

function sendRandomImage(r, message) {
    let s = r.body.toString();
    let document = new xmldoc.XmlDocument(s);
    let post = document.childNamed("post");

    let imageURL = post.attr.file_url;

    if (imageURL) {
        message.channel.send(imageURL);
    }
}

module.exports = {
    safebooruImageToChannel,
    BANNED_TAGS
};