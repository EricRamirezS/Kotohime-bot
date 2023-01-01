const request = require('snekfetch');
const xmlDoc = require('xmldoc');

/**
 *
 * @param tags
 * @return {Promise<{url:string,source:string}|string>}
 */
let rule34Image2Channel = async function (tags) {

    let BASE_REQUEST;
    BASE_REQUEST = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + tags.replace(' ', '+');

    try {
        let response = await request.post(BASE_REQUEST + '&limit=0').send({usingGoodRequestLibrary: true});
        let postCount = getNumberOfImages(response);
        // Finalizar función si no hay imagenes indicados con los tags solicitados
        if (postCount === 0) {
            return 'I could not find an image with the requested tags';
        }

        let pid = Math.floor(Math.random() * Math.floor((postCount - 1)));
        let req = BASE_REQUEST + '&limit=1&pid=' + pid;
        try {
            let r = await request.post(req).send({usingGoodRequestLibrary: true});
            return sendRandomImage(r);
        } catch {
            return '*I\'m sorry, I could not find an Image to send here*';
        }

    } catch {
        return 'I could request an image to rule34, please try again later.';
    }
};


function getNumberOfImages(r) {
    let s = r.body.toString();
    let document = new xmlDoc.XmlDocument(s);
    return document.attr.count;
}

function sendRandomImage(r) {
    let s = r.body.toString();
    let document = new xmlDoc.XmlDocument(s);
    let post = document.childNamed('post');

    return {
        url: post.attr.file_url,
        source: validUrlString(post.attr.source)
    };
}

function validUrlString(string) {
    try {
        new URL(string);
    } catch (_) {
        return null;
    }
    return string;
}

module.exports = {
    rule34Image2Channel: rule34Image2Channel
};