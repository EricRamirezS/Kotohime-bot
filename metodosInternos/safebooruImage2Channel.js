const request = require('snekfetch');
const xmldoc = require('xmldoc');

const BANNED_TAGS = ["",
    "ass",
    "ecchi",
    "underwear",
    "underwear_only",
    "ecchi",
    "bikini",
    "breast_hold",
    "breast_press",
    "breasts",
    "leotard",
    "sexually_suggestive",
    "sexual_harassment",
    "gym_uniform",
    "gym_shirt",
    "gym_shorts",
    "black_bikini_top",
    "black_bikini_bottom",
    "arms_under_breasts",
    "medium_breasts",
    "shirtless",
    "no_pants",
    "grabbing_own_breast",
    "naked_tabard",
    "yuri",
    "yaoi",
    "groping",
    "breast_grab",
    "cat_lingerie",
    "upskirt",
    "strap_gap",
    "naked_shirt",
    "cameltoe",
    "white_panties",
    "wet_clothes",
    "no_panties",
    "panties",
    "pantyshot",
    "black_panties",
    "lingerie",
    "lingeries",
    "on_bed",
    "multico",
    "one-piece_swimsuit",
    "revealing_clothes",
    "self_fondle",
    "breast_grab",
    "mktr_(princess_mktr)",
    "naked_towel",
    "skirt_lift",
    "microskirt",
    "anal_beads",
    "lifted_by_self",
    "skirt_lift",
    "pantyshot_(jumping)",
    "groin",
    "thighs",
    "kaenuco",
    "oouso"
];

/**
 *
 * @param message Discord message object
 * @param tag search tag
 */
let safebooruImageToChannel = function (message, tag) {

    let BASE_REQUEST;
    if (!message.channel.nsfw) {
        BASE_REQUEST = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=' + tag + BANNED_TAGS.join("+-");
    } else {
        BASE_REQUEST = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=' + tag;
    }
    request.post(BASE_REQUEST + "&limit=0") //En este momento, solo importa el count}
        .send({usingGoodRequestLibrary: true})
        .then(r => {
            let postCount = getCantidadDeImagenes(r);

            // Finalizar función si no hay imagenes indicados con los tags solicitados
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
                .then(r => enviarImagenAleatoria(r, message))
                .catch(() => message.channel.send("*Lo siento, no pude encontrar una imagen que pueda enviar.*"));
        });
};

function getCantidadDeImagenes(r) {
    // Obteniendo el número de imagenes existentes con este resultado
    let s = r.body.toString();
    let document = new xmldoc.XmlDocument(s);
    return document.attr.count;
}

function enviarImagenAleatoria(r, message) {
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