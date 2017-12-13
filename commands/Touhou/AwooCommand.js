const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389543334290391056/25a.jpg",//1
    "http://i3.kym-cdn.com/photos/images/newsfeed/000/910/507/3ae.png",
    "http://i0.kym-cdn.com/photos/images/original/000/910/375/a07.jpg",
    "https://i.ytimg.com/vi/CpCV_EqvCYA/maxresdefault.jpg",
    "http://i0.kym-cdn.com/photos/images/newsfeed/001/016/520/988.jpg",
    "https://orig00.deviantart.net/78a0/f/2016/078/3/7/tail_whip_by_miwol-d9vngr6.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/943/818/8c1.jpg",
    "https://orig00.deviantart.net/2fbc/f/2016/203/6/5/friendly_loup_garou_by_miwol-dab172v.png",
    "http://i0.kym-cdn.com/photos/images/original/001/187/489/440.jpg",
    "http://i0.kym-cdn.com/photos/images/original/001/014/477/5bd.png",
    "https://ih0.redbubble.net/image.177563420.8317/raf,750x1000,075,t,fafafa:ca443f4786.jpg",
    "https://i.imgur.com/9CIKBbv.gif",
    "https://memestatic.fjcdn.com/pictures/Super+dog+the+place+i+stoled+the+memeshttpsirlorencetumblrcompost157589199954trigger+medium+stats_c8bc98_6222299.jpg",
    "https://memestatic.fjcdn.com/pictures/Super_012542_6222299.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s480x480/e35/14704962_1157311224376044_3664996722976751616_n.jpg",
    "https://orig00.deviantart.net/e1c9/f/2016/147/0/b/louve_by_miwol-da3zjc7.jpg",
    "https://pre00.deviantart.net/0443/th/pre/f/2017/311/e/b/werewolf_by_miwol-dbt1ny9.png",
    "https://i.warosu.org/data/jp/img/0162/39/1481651140877.jpg",
    "https://orig00.deviantart.net/8b52/f/2016/350/8/3/small_awoo_by_leo360walfasmix-dart4tw.png",
    "http://pre11.deviantart.net/d5d0/th/pre/f/2014/280/d/1/touhou___chibi_momiji__3__by_scionofaiur-d6a6utu.png",
    "https://img.fireden.net/tg/image/1447/81/1447814945422.png",
    "https://pics.onsizzle.com/on-all-levels-but-physical-i-am-awoo-lawoo-touhou-irl-2864300.png",
    "https://i.imgur.com/krjpAWK.jpg",
    "https://i.ytimg.com/vi/4hq2IPWlYW4/maxresdefault.jpg",
    "https://wrongthink.net/upload/photos/2017/03/rwnaxLQKjTSVjwShmPYr_01_f2f0e7d1217412270f09841c24289a7d_cover.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s480x480/e35/c0.109.875.875/19985983_330661810691061_3438231271610777600_n.jpg",
    "https://orig00.deviantart.net/1f30/f/2016/273/e/f/louve_4_by_miwol-daje05b.png",
    "https://i.ytimg.com/vi/4o-oVypBLzE/maxresdefault.jpg",
    "https://pics.me.me/dont-awoo-350-penalty-awoo-350-25483002.png",
    "https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/19764454_454891931552524_6072360960792723456_n.jpg"
];

class AwooCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'awoo',
            group: 'touhou',
            memberName: 'awoo',
            description: ''
        });
    }

    async run(message, args){
        var image = Math.floor(Math.random() * imageLinks.length);
        message.channel.send('',{
            files: [
                imageLinks[image]
            ]
        });
    }
}

module.exports = AwooCommand        ;