const request = require('snekfetch');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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
    "groin"

];


const INTENTOS = 5;

const MB_8 = 8388608;


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
            if (postCount == 0) {
                message.channel.send("No he encontrado ninguna imagen con los tags mencionados");
                return;
            }

            // Obteniendo 5 imagenes aleatoria
            let pid = Math.floor(Math.random() * Math.floor((postCount - 1) / 5));
            let req = BASE_REQUEST + "&limit=5&pid=" + pid;

            request.post(req)
                .send({usingGoodRequestLibrary: true})
                .then(r => enviarImagenAleatoria(r, message))
                .catch(() => message.channel.send("*Lo siento, no pude encontrar una imagen que pueda enviar aquí.* <:notlikethis:414778768759062528>\n"));
        });
};

function getCantidadDeImagenes(r) {
    // Obteniendo el número de imagenes existentes con este resultado
    let s = r.body.toString();
    let document = new xmldoc.XmlDocument(s);
    return document.attr.count;
}

function buscarImagenMenor8MB(posts) {
    let fileSize = MB_8 + 1;
    let imageURL;
    for (let i = 0; fileSize > MB_8 && i <= INTENTOS; i++) {
        let postN = Math.floor(Math.random() * posts.length);
        try {
            if (posts.length) {
                let post = posts[postN];
                let http = new XMLHttpRequest();

                imageURL = post.attr.file_url;
                http.open('HEAD', imageURL, false);
                http.send(null);

                if (http.status === 200) {
                    fileSize = http.getResponseHeader('content-length');
                }

                posts.slice(postN, 1);
            }
        } catch (e) {
            console.log(e);
        }
        if (i === INTENTOS) {
            throw "imagenes muy grande";
        }
    }
    return imageURL;
}

function enviarImagenAleatoria(r, message) {
    let s = r.body.toString();
    let document = new xmldoc.XmlDocument(s);
    let posts = document.childrenNamed("post");

    let imageURL = buscarImagenMenor8MB(posts);

    //Enviando imagen al canal de discord desde donde fue solicitada
    if (imageURL) {
        message.channel.send('', {
            files: [imageURL]
        });
    }
}

module.exports = {
    safebooruImageToChannel,
    BANNED_TAGS
};