const request = require('snekfetch');
const xmldoc = require('xmldoc');
const fs = require('fs');

var BANNED_TAGS = null;

/**
 *
 * @param tags {string}
 * @param nsfw {boolean}
 * @return {Promise<{url:string,source:string}|string>}
 */
async function safebooruImageToChannel(tags, nsfw) {

    await loadBannedTags();

    let BASE_REQUEST = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=';
    if (nsfw) {
        BASE_REQUEST = BASE_REQUEST + tags.replace(' ', '+');
    } else {
        BASE_REQUEST = BASE_REQUEST + tags.replace(' ', '+') + BANNED_TAGS.join('+-');
    }
    try {
        let response = await request.post(BASE_REQUEST + '&limit=0').send({usingGoodRequestLibrary: true});

        let postCount = getNumberOfImages(response);

        if (postCount === 0) {
            return 'I could not find an image with the requested tags';
        }

        // Obteniendo 5 imagenes aleatoria
        let pid = Math.floor(Math.random() * Math.floor((postCount - 1)));
        let req = BASE_REQUEST + '&limit=1&pid=' + pid;
        try {
            let r = await request.post(req).send({usingGoodRequestLibrary: true});
            return sendRandomImage(r);
        } catch {
            return '*I\'m sorry, I could not find an Image to send here*';
        }
    } catch (e) {
        return 'I could request an image to safebooru, please try again later.';
    }
}

function loadBannedTags() {
    if (BANNED_TAGS) return;

    BANNED_TAGS = [''];

    try {
        const data = fs.readFileSync('./dataFiles/BannedTagsData/banned_tags.txt', 'utf8');
        BANNED_TAGS = data.split('\n');
        for (let i = 0; i < BANNED_TAGS.length; i++) {
            BANNED_TAGS[i] = BANNED_TAGS[i].replace('\r', '');
        }
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

function sendRandomImage(r) {
    let s = r.body.toString();
    let document = new xmldoc.XmlDocument(s);

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
    safebooruImageToChannel,
    BANNED_TAGS
};