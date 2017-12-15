const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389542662795034626/RemiMFW.jpg",//1
    "http://www.legion34.com/wp-content/uploads/2013/05/s-105191-___-3girls-bat_wings-beans-belt-blue_hair-chain-closed_eyes-_d-dawy-fangs-hat-horns-ibuki_sui.png",
    "https://vignette.wikia.nocookie.net/yukkuri/images/e/e0/Remiria.png",
    "https://orig00.deviantart.net/033f/f/2013/109/b/9/touhou___chibi_flandre_scarlet_by_kane_neko-d628jos.png",
    "http://www.legion34.com/wp-content/uploads/2013/05/Remilia-3.jpg",
    "http://www.legion34.com/wp-content/uploads/2013/05/Remilia-1.jpg",
    "https://t00.deviantart.net/K65MZdZyiZdy5M-MoNQakMN1Woc=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/43fb/th/pre/f/2010/142/4/0/touhou___sakuya_n_remilia_by_shiranaiyo6927.jpg",
    "https://en.touhouwiki.net/images/f/f7/SSiBRemilia.jpg",
    "https://t00.deviantart.net/2VQNF6OhIsbrTqBa20LHQNPwvpo=/300x200/filters:fixed_height(100,100):origin()/pre00/16cd/th/pre/i/2010/364/5/6/little_scarlet__s__vampires_by_hecoheio-d360rj6.jpg",
    "https://i.ytimg.com/vi/bEANxX98aZ0/hqdefault.jpg",
    "https://pbs.twimg.com/media/DQVGtVTWsAA8--z.jpg",
    "https://pbs.twimg.com/media/DQPfaJuXkAApbkK.jpg",
    "https://pbs.twimg.com/media/DQS2tHdWkAAZUhI.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/389307458268430356/c7c.png",
    "https://media.discordapp.net/attachments/276329252289511424/389215741527851009/56648187_p0.png",
    "https://static.zerochan.net/Touhou.full.1158763.jpg",
    "https://i.pinimg.com/736x/cc/89/8f/cc898fd75d0097eed00399cfd1425f02--illusion-flandre.jpg",
    "https://vignette.wikia.nocookie.net/touhou/images/6/6b/Flan-Remi_gif.gif",
    "https://media.discordapp.net/attachments/276329252289511424/389215711140118528/unknown.png",
    "http://i.imgur.com/UFGwAbM.png",
    "https://media.tenor.com/images/73c04ccbab4000812570c65917bce7ea/tenor.gif",
    "http://images.wikia.com/yukkuri/images/9/92/BodiedYukkuriRemilia.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/386797915437269003/11f670a6b25bc9aa0eaf4ef6034b18f1.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/845/056/441.jpg",
    "http://i0.kym-cdn.com/photos/images/newsfeed/000/868/088/783.jpg",
    "https://i.pinimg.com/236x/cd/8c/6f/cd8c6f6812a6324f1f90fc7e6ad43436.jpg",
    "https://orig00.deviantart.net/5a4f/f/2013/110/3/7/epic_face_remilia_scarlet_by_mayuvocaloid3-d62de71.png",
    "https://i.warosu.org/data/jp/img/0171/36/1496732550071.png",
    "http://i0.kym-cdn.com/photos/images/original/001/162/141/2c5.jpg",
    "https://images7.alphacoders.com/675/675105.png",
    "https://i.warosu.org/data/jp/img/0114/37/1379725986935.jpg",
    "https://i.ytimg.com/vi/vd7lVX-dI6E/maxresdefault.jpg",
    "https://i.pinimg.com/originals/3a/85/dd/3a85ddc14d825ca36a2c4a02b8b36aff.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/24126735_200452617192269_540936450732982272_n.jpg",
    "https://2static4.fjcdn.com/comments/Why+remilia+_7275904edab068f4a793e69c153e48c5.jpg",
    "http://i.imgur.com/hlLHG53.jpg",
    "https://i.pinimg.com/736x/1f/ba/82/1fba823e8bd6cf411330eb389f307fd2--flandre-php.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s480x480/e35/c0.2.1080.1080/23347507_355482948243852_9084220886080290816_n.jpg",
    "https://i.pinimg.com/originals/16/39/86/163986768a1d6dbf07137941e4d20c97.jpg",
    "http://img01.deviantart.net/6579/i/2015/048/8/6/remilia_scarlet_chibi__by_kareyare-d8ihi9q.jpg",
    "http://i3.kym-cdn.com/photos/images/newsfeed/000/422/011/c6c.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/22158104_2003359089885869_4930850870758735872_n.jpg",
    "http://i4.ytimg.com/vi/krbGFEv0L9M/hqdefault.jpg",
    "https://i.imgur.com/fH0XiVe.jpg",
    "http://s1.1zoom.me/big0/807/406986-blackangel.jpg",
    "https://i.pinimg.com/originals/79/a2/c7/79a2c72c7429f19b9f728efa13145f59.jpg",
    "https://i.imgur.com/7Rmkz9e.jpg",
    "https://t00.deviantart.net/pe-C7cN6o486UfPMtkyg3sJ9l-M=/300x200/filters:fixed_height(100,100):origin()/pre00/55cb/th/pre/f/2011/007/1/e/remilia_chan_by_yuries-d36ns1s.jpg",
    "https://i.warosu.org/data/jp/img/0171/36/1496732676837.png",
    "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/24274080_1599398673475861_7222625693119545344_n.jpg",
    "https://img00.deviantart.net/c9ee/i/2010/038/7/8/remilia___sakuya_yukkuri_by_kouotsu.png",
    "https://static2.fjcdn.com/comments/Mochiron+_fc9960a9fc2f25c024eb0ac2cb6b4edc.jpg",
    "https://static3.fjcdn.com/comments/Remilia+you+remembered+me+_b0b98203744f1eea59e5cd89293b754f.png",
    "https://static3.fjcdn.com/comments/Blank+_0f53d080bda360e415fb4a7335f54e65.jpg",
    "https://static2.fjcdn.com/comments/Y+u+do+dis+_6650e051a26a66b696ae553588c8b74a.jpg",
    "https://static.zerochan.net/Remilia.Scarlet.full.942896.jpg",
    "https://static.zerochan.net/Remilia.Scarlet.full.855601.jpg",
    "http://e-shuushuu.net/images/2015-01-02-698827.jpeg",
    "https://i.warosu.org/data/jp/img/0118/72/1391655457652.jpg",
    "https://kafkafuura.files.wordpress.com/2010/03/remilia-natto.jpg",
    "https://i.warosu.org/data/jp/img/0121/53/1401347025584.jpg",
    "http://static.zerochan.net/Remilia.Scarlet.full.932454.jpg",
    "http://static.zerochan.net/Remilia.Scarlet.full.518829.jpg",
    "http://www.fybertech.com/4get/13781341391403.gif",
    "https://media.giphy.com/media/NB59B0xtA9wc0/giphy.gif",
    "https://vignette.wikia.nocookie.net/legendsofthemultiuniverse/images/2/2b/Baby_april.jpg",
    "http://screenheaven.com/walls/anime-manga/izayoi-sakuya-remilia-scarlet-touhou-41910-1920x1080.jpg",
    "http://1.bp.blogspot.com/-6eVcjotn8Zk/TfoH44PzBFI/AAAAAAAABX4/o21UWJJEQA0/s400/remilia+gta+parody+humor+parodia+touhou+anime+game.jpeg",
    "http://stuffpoint.com/touhou/image/114852-touhou-remilia-scarlet.jpg",
    "https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/12598994_1295396450487061_1620213405_n.jpg",
    "https://s3.zerochan.net/Remilia.Scarlet.240.913455.jpg",
    "https://t03.deviantart.net/OdZWyHjMIxjc6HwkmmmVfvNwOq8=/300x200/filters:fixed_height(100,100):origin()/pre12/9afe/th/pre/i/2016/292/5/6/remilia_by_sapphlet-dall40j.png",
    "http://img1.ak.crunchyroll.com/i/spire1/141e07872433769e8e1a1bd7e6291a121314899445_full.jpg",
    "http://img1.ak.crunchyroll.com/i/spire1/141e07872433769e8e1a1bd7e6291a121314899445_full.jpg",
    "https://res.cloudinary.com/teepublic/image/private/s--zOELAnPR--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1511471281/production/designs/2094066_1.jpg",
    "https://res.cloudinary.com/teepublic/image/private/s--XCsplWGv--/t_Preview/b_rgb:ef4a81,c_limit,f_jpg,h_630,q_90,w_630/v1469594470/production/designs/603272_1.jpg"
];

class UuuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'uuu',
            group: 'touhou',
            memberName: 'uuu',
            description: ''
        });
    }

    async run(message, args){
        let image = Math.floor(Math.random() * imageLinks.length);
        message.channel.send('',{
            files: [
                imageLinks[image]
            ]
        });
    }
}

module.exports = UuuCommand    ;