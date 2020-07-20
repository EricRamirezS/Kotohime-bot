const request = require('snekfetch');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xmldoc = require('xmldoc');

const INTENTOS = 5;

const MB_8 = 8388608;


/**
 *
 * @param message Discord message object
 * @param tag search tag
 */
let rule34Image2Channel = function (message, tag) {

    let BASE_REQUEST;
    if (message.channel.nsfw) {
        BASE_REQUEST = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + tag;

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
    } else{
        message.channel.send("No puedo realizar este tipo de busquedas aquí.");
    }
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
    rule34Image2Channel : rule34Image2Channel
};