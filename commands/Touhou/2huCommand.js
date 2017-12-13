const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389540350777229314/kaenbyou_rin_touhou_drawn_by_rodney__0776025a87ebd43f5d548e0ef63cb053.jpg",//1
    "https://i.warosu.org/data/jp/img/0161/00/1479056161829.jpg",
    "https://d3ieicw58ybon5.cloudfront.net/ex/640.400/59.0.2396.1498/u/15a5e2b630774c4d84627ab8ba114216.jpg",
    "https://static.zerochan.net/Touhou.full.252690.jpg",
    "https://orig00.deviantart.net/14e1/f/2010/341/a/9/cover_touhou__phantasma__by_namie_kun-d34ectm.png",
    "https://kazasou.files.wordpress.com/2013/09/konachan-com-166979-boots-bow-cirno-crown-dress-fan-gloves-group-hat-headband-navel-panties-parody-red_eyes-shorts-skirt-sword-touhou-tree-umbrella-weapon-wings-wink.jpg",
    "https://res.cloudinary.com/lmn/image/upload/fl_lossy,q_80/f_auto/v1/gameskinnyc/m/o/u/mountainoffaithfull427895-29b6e.jpg",
    "https://img00.deviantart.net/f92f/i/2016/059/9/c/_touhou__movin__right_along_by_men_dont_scream-d9thghp.jpg",
    "https://pre00.deviantart.net/9e96/th/pre/i/2014/243/2/0/touhou___they_ve_shrunk___by_kaiza_c-d7wz021.png",
    "https://vignette.wikia.nocookie.net/eswikia/images/e/e5/Touhou_Final_Bosses.jpg/revision/latest?cb=20141015222353",
    "https://www.rockpapershotgun.com/images/15/apr/touhou.jpg",
    "http://pub.cyphers.co.kr/images2/tip/2016/05/08/1462710240727.jpg",
    "https://78.media.tumblr.com/1ad92237bd957f816e9e94f407623d02/tumblr_o9zxmqUKh51tjrz0qo1_1280.png",
    "http://3.bp.blogspot.com/-1PYDWVPh23s/UxPPOzKSjPI/AAAAAAAABzM/y4nYlZxhRFE/s1600/sample-7333a750ef0c081b4f51b8765b0a78c8.jpg",
    "http://e-shuushuu.net/images/2013-08-12-599122.jpeg",
    "https://static.zerochan.net/Touhou.full.1978468.jpg",
    "https://78.media.tumblr.com/c3fc2dcafede6dfa8b2961699bd25b7f/tumblr_odm75gumLM1twadyuo1_500.png",
    "https://i.ytimg.com/vi/zdnIdRPJtpo/hqdefault.jpg",
    "http://i0.kym-cdn.com/photos/images/facebook/001/080/573/027.png",
    "http://i0.kym-cdn.com/photos/images/newsfeed/001/080/574/e09.png",
    "https://danbooru.donmai.us/data/__matara_okina_touhou_drawn_by_mefomefo__61b8c1a2b86351c562f9847116c77cba.png",
    "https://pm1.narvii.com/6363/503639a95b02e2ec1367849336e1cd2537dc4aea_hq.jpg",
    "https://images7.memedroid.com/images/UPLOADED271/5880e677b8574.jpeg",
    "http://static.tvtropes.org/pmwiki/pub/images/Yukkuri_MarisaReimu.png",
    "http://i0.kym-cdn.com/photos/images/original/000/637/221/2fc.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/530/663/d04.jpg",
    "http://i0.kym-cdn.com/photos/images/newsfeed/000/712/191/17f.gif",
    "https://img00.deviantart.net/a92e/i/2016/299/0/b/when_shinmyou_meme_ru_is_drawn_just_right_by_potato_yi-damaqe2.png",
    "https://i.pinimg.com/736x/18/6b/09/186b09127b859fb1d5ac71ecde3d2c84--dinner-for-one-dinners.jpg",
    "https://memegenerator.net/img/instances/250x250/80304401/you-must-stop-with-all-these-touhou-memes.jpg",
    "https://pa1.narvii.com/6310/5c049119460d0c11390b6537bba26fb6863ef947_hq.gif",
    "https://t00.deviantart.net/DETpUh6vaovPbL0lJ064p-T9rXw=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/deb1/th/pre/f/2017/202/b/4/hina_the_spinner_by_chusonic-dbh4427.jpg"
];

class _2huCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: '2hu',
            group: 'touhou',
            memberName: '2hu',
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

module.exports = _2huCommand    ;