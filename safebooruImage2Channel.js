const request = require('snekfetch');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xmldoc = require('xmldoc');

const BANNED_TAGS = "+-ass+-ecchi+-underwear+-underwear_only+-ecchi+-bikini+-breast_hold+-breast_press+-breasts+-leotard" +
    "+-sexually_suggestive+-sexual_harassment+-gym_uniform+-gym_shirt+-gym_shorts+-black_bikini_top" +
    "+-black_bikini_bottom+-arms_under_breasts+-comic+-medium_breasts+-shirtless+-no_pants+-grabbing_own_breast" +
    "+-naked_tabard+-yuri+-yaoi+-groping+-breast_grab";
const INTENTOS = 5;

const MB_8 = 8388608;
/**
 *
 * @param message Discord message object
 * @param tag search tag
 * @param NSWFFilter prevent NSFW imagen (WARNING: It still may send some NSWF images)
 */
let safebooruImageToChannel = function (message, tag, NSWFFilter = true) {

    let BASE_REQUEST = "";
    if (NSWFFilter) {
        BASE_REQUEST = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=' + tag + BANNED_TAGS;
    } else {
        BASE_REQUEST = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=' + tag;
    }
    request.post(BASE_REQUEST)
        .send({usingGoodRequestLibrary: true})
        .then(r => {

            // Obteniendo el número de imagenes existentes con este resultado
            let s = r.body.toString();
            let document = new xmldoc.XmlDocument(s);
            let postCount = document.attr.count;

            // Finalizar función si no hay imagenes indicados con los tags solicitados
            if (!postCount) {
                message.channel.send("No he encontrado ninguna imagen con los tags mencionados");
                return;
            }
            //Por defecto hay un limite de 100 imagenes, por xml, pid representa las paginas
            let pid = Math.floor(Math.random() * Math.floor(postCount / 100 - 1));

            // Obteniendo una imagen aleatoria
            request.post(BASE_REQUEST + "&pid=" + pid)
                .send({usingGoodRequestLibrary: true})
                .then(r => {

                    let fileSize = MB_8 + 1;
                    let s = r.body.toString();
                    let document = new xmldoc.XmlDocument(s);
                    let posts = document.childrenNamed("post");
                    let imageURL = "";

                    // No se pueden enviar imagenes a Discord cuyo peso supere los 8 Mb
                    let i = 0;
                    while (fileSize > MB_8) {
                        let postN = Math.floor(Math.random() * posts.length);
                        let post = posts[postN];
                        try {
                            imageURL = post.attr.file_url;
                            let http = new XMLHttpRequest();
                            http.open('HEAD', imageURL, false);
                            http.send(null);
                            if (http.status === 200) {
                                fileSize = http.getResponseHeader('content-length');
                            }
                        } catch (e) {
                            console.log(e);
                        } finally {
                            i++;
                        }
                        if (i > INTENTOS) {
                            throw "imagenes muy grande";
                        }
                    }

                    //Enviando imagen al canal de discord desde donde fue solicitada
                    message.channel.send('', {
                        files: [imageURL]
                    });
                })
                .catch(err => {
                    message.channel.send("*Lo siento, no pude encontrar una imagen que pueda enviar aquí.* <:notlikethis:414778768759062528>\n");
                    console.log(err);
                });
        });
};

module.exports = safebooruImageToChannel;