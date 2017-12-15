const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389544462285537280/t4rp2V1.jpg",//1
    "https://media.discordapp.net/attachments/276329252289511424/389544497769349132/saigyouji_yuyuko_yakumo_ran_and_yakumo_yukari_touhou_drawn_by_kasuura_cacula__c5a57a079e95c1514af717.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/378980319568723969/iwamoto_kogan_konpaku_youmu_konpaku_youmu_and_saigyouji_yuyuko_shigurui_and_touhou__45bb70dbfee10445.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/378980365294895136/mystia_lorelei_and_saigyouji_yuyuko_touhou_drawn_by_nekoguruma__ba40fb5b5433f67f72dcec5470024270.jpg",
    "http://walfas.org/blog/wp-content/yuyuko_food.png",
    "https://i.imgur.com/rGsP6oh.gif",
    "https://static.zerochan.net/Touhou.full.928378.jpg",
    "https://i.pinimg.com/originals/8f/32/2e/8f322e9f33533e42d45bad5636d1fc1d.jpg",
    "https://i.pinimg.com/originals/6b/8a/db/6b8adbb1e6507c1c94aa25581a13ed47.jpg",
    "http://signum.sivis.org/poerr/image/5061.png",
    "https://static1.fjcdn.com/comments/Lets+see+how+many+pictures+do+i+have+of+lady+_540f09009977e61231d0bde07b831500.jpg",
    "https://static3.fjcdn.com/comments/Blank+_1bbfaca402587b74fefdb4717fc42d39.jpg",
    "https://static3.fjcdn.com/comments/Blank+_5a47ddbf2cf3014fd243e4fb4cbad6f5.jpg",
    "https://static3.fjcdn.com/comments/Blank+_17897d1657099da68c9ddbb3fd1ebda3.png",
    "https://static3.fjcdn.com/comments/Blank+_82fbd8ff7388a957cfdab68282f34fad.jpg",
    "https://i.ytimg.com/vi/gCgwMF-7DAg/maxresdefault.jpg",
    "https://static.zerochan.net/Saigyouji.Yuyuko.full.751576.jpg",
    "https://static1.fjcdn.com/comments/Last+one+_464a7b6dfab4120273da6af8a50f5990.jpg",
    "https://static.zerochan.net/Touhou.full.1123870.jpg",
    "https://i.pinimg.com/originals/61/a7/fc/61a7fc9c40e70251a91edd88cb76a719.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/797/813/725.jpg",
    "http://e-shuushuu.net/images/2014-02-21-634780.jpeg",
    "https://images2.alphacoders.com/215/215162.jpg",
    "https://i.imgur.com/WoyxEs3.jpg",
    "https://static.zerochan.net/Saigyouji.Yuyuko.full.1996152.jpg",
    "https://i.warosu.org/data/tg/img/0506/04/1481274233765.png",
    "https://vignette.wikia.nocookie.net/yukkuri/images/c/c5/Yuyukokkuri.png",
    "https://orig00.deviantart.net/bf42/f/2009/126/e/0/america_can__t_take_it_easy_by_emlan.png",
    "http://i48.tinypic.com/20ifmnt.jpg",
    "http://s1.tsuki-board.net/image/Shaolan-kun1393881684.jpeg",
    "https://d2qdztz5tk5zxi.cloudfront.net/original/2X/2/212b983f0433f381ef7efeec819400f94ae27c82.png",
    "http://s.quickmeme.com/img/e4/e463493c0c88309bd69b2e28c95d7bd19a20972a9f7d2926ee98248ec9d60276.jpg",
    "https://kazasou.files.wordpress.com/2012/01/konachan-com-87212-dress-hat-konpaku_youmu-okitakung-petals-saigyouji_yuyuko-sword-touhou-weapon1.jpg",
    "http://i3.ytimg.com/vi/RbZSK8amarc/mqdefault.jpg",
    "https://static.fjcdn.com/pictures/Eating+something+fattening+someone+says+httpj5daigadadeviantartcomartghoestafter333078272+for+original+comic+which_bb9e5b_5104805.jpg",
    "https://static.zerochan.net/Cross-Over.full.582795.jpg",
    "http://download.minitokyo.net/Yuyuko.Saigyouji.408719.jpg",
    "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/16110743_755239744628990_1972450429174284288_n.jpg",
    "http://stuffpoint.com/touhou/image/112653-touhou-yuyuko.jpg",
    "http://s.quickmeme.com/img/97/97597f6f973d99c7adbfab8426398396bc87959ce3cdc9fb30e0388be7320d2e.jpg",
    "https://img.memecdn.com/yuyuko-is-eating-likes_gp_2654111.jpg",
    "https://ci.memecdn.com/2950243.jpg",
    "http://i2.ytimg.com/vi/Q9bGsSoqGIg/hqdefault.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/192/531/chibi_saigyouji_yuyuko_by_speedla_hedgehog-d3c6s3r.png",
    "https://pics.me.me/yuyuko-sama-you-mustnt-torment-your-self-weve-grown-were-12546715.png",
    "https://i.pinimg.com/236x/1c/00/8d/1c008d6d517b159bb00cdd87e3f7c527.jpg",
    "https://pm1.narvii.com/6219/b8b97aa110fb467467f7268ebece136142c6fdd1_hq.jpg",
    "https://i.pinimg.com/originals/8f/32/2e/8f322e9f33533e42d45bad5636d1fc1d.jpg",
    "https://memegenerator.net/img/images/250x250/16733767/yuyuko-approves.jpg",
    "https://i.pinimg.com/originals/f3/90/12/f39012a2ea8b443091c26f2bf7f0b3be.jpg",
    "https://i.pinimg.com/originals/2d/90/bd/2d90bdbe4a998d5f1e4f197342fa7246.jpg",
    "http://static.zerochan.net/Saigyouji.Yuyuko.full.1404077.jpg",
    "https://t00.deviantart.net/Ovupqr6NB5mK403sin4_zNU0tmo=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/34d2/th/pre/f/2011/281/2/b/yuyuko_and_pacman_by_shinsaioumiko-d4c6mh5.png",
    "https://i.pinimg.com/236x/e6/a6/a5/e6a6a5313572f0424e69c47cc5546eb5--group-tags.jpg",
    "https://ci.memecdn.com/2950370.jpg",
    "https://78.media.tumblr.com/b720b0c3368c43657ff0e5447e2d8bf6/tumblr_opcpg86dj31wokecfo1_1280.png",
    "https://i.warosu.org/data/jp/img/0173/51/1500569599884.png",
    "http://fdzeta.com/subir/images/HLU83.gif",
    "https://pm1.narvii.com/6562/a51544fca0886bd159cad54b24deb07d04ec164e_hq.jpg",
    "https://static.zerochan.net/Saigyouji.Yuyuko.full.1381968.jpg",
    "https://static.zerochan.net/Saigyouji.Yuyuko.full.60012.jpg",
    "https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/23735622_528574070839140_877132347336556544_n.jpg",
    "https://i.warosu.org/data/jp/img/0136/60/1434672357180.jpg",
    "https://i.warosu.org/data/jp/img/0173/40/1500380382327.jpg"

];

class YuyukoCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'yuyuko',
            group: 'touhou',
            memberName: 'yuyuko',
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

module.exports = YuyukoCommand;