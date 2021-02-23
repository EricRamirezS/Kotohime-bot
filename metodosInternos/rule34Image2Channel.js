const request = require('snekfetch');
const xmldoc = require('xmldoc');

/**
 * Busca y envia una imagen aleatoria desde rule34 a un canal de Discord, con los tags solicitados
 * por el usuario
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
                let postCount = getNumberOfImages(r);
                // Finalizar función si no hay imagenes indicados con los tags solicitados
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
                    .catch(() => message.channel.send("*Lo siento, no pude encontrar una imagen que pueda enviar aquí.*\n"));
            });
    } else {
        message.channel.send("No puedo realizar este tipo de busquedas aquí.");
    }
};

function getNumberOfImages(r) {
    let s = r.body.toString();
    let document = new xmldoc.XmlDocument(s);
    return document.attr.count;
}

function sendRandomImage(r, message) {
    let s = r.body.toString();
    let document = new xmldoc.XmlDocument(s);
    let post = document.childNamed("post");

    let imageURL = post.attr.file_url;

    //Enviando imagen al canal de discord desde donde fue solicitada
    if (imageURL) {
        message.channel.send(imageURL);
    }
}

module.exports = {
    rule34Image2Channel: rule34Image2Channel
};