const request = require('snekfetch');
const xmldoc = require('xmldoc');

/**
 *
 * @param message Discord message object
 * @param tag search tag
 * @param NSWFFilter prevent NSFW imagen (WARNING: It still may send some NSWF images)
 */
let safebooruImageToChannel = function(message, tag, NSWFFilter=true){
    let banned = "+-ass+-ecchi+-underwear+-underwear_only+-ecchi+-bikini+-breast_hold+-breast_press+-breasts+-leotard" +
        "+-sexually_suggestive+-sexual_harassment+-gym_uniform+-gym_shirt+-gym_shorts+-black_bikini_top" +
        "+-black_bikini_bottom+-arms_under_breasts+-comic+-medium_breasts+-shirtless";
    let BASE_REQUEST = "";
    if (NSWFFilter){
        BASE_REQUEST = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags='+tag+banned;
    } else {
        BASE_REQUEST = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags='+tag;
    }
    request.post(BASE_REQUEST)
        .send({usingGoodRequestLibrary: true})
        .then(r => {

            // Obteniendo el número de imagenes existentes con este resultado
            let s = r.body.toString();
            let document = new xmldoc.XmlDocument(s);
            let postCount = document.attr.count;

            //Por defecto hay 100 imagenes, por xml, pid representa las paginas
            let pid = Math.floor(Math.random() * Math.floor(postCount / 100));

            // Obteniendo una imagen aleatoria
            request.post(BASE_REQUEST + pid)
                .send({usingGoodRequestLibrary: true})
                .then(r => {
                    let s = r.body.toString();
                    let document = new xmldoc.XmlDocument(s);
                    let posts = document.childrenNamed("post");
                    let postN = Math.floor(Math.random() * posts.length);
                    let post = posts[postN];

                    //Enviando imagen al canal de discord desde donde fue solicitada
                    let imageURL = post.attr.file_url;
                    message.channel.send('', {
                        files: [imageURL]
                    });
                });
        });
};

module.exports = safebooruImageToChannel;