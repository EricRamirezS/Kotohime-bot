const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/385995152000417792/389312405848719360/EFsnJgT.png",//1
    "https://media.discordapp.net/attachments/385995152000417792/389312980631683072/wMJNFKk.jpg",//2
    "https://media.discordapp.net/attachments/385995152000417792/389312222696046592/8EDiIm6.jpg",//3
    "https://i.pinimg.com/originals/72/d2/b2/72d2b22847c2e5b5ade6b90f3ddcb7c1.gif",//4
    "https://d3ieicw58ybon5.cloudfront.net/ex/350.489/shop/product/5f79460482f847999d8f06501fc72fe0.jpg",
    "https://media.discordapp.net/attachments/385995152000417792/389312480922435602/UJqME6m.jpg",
    "https://media.discordapp.net/attachments/385995152000417792/389312912549871616/maxresdefault.jpg",
    "http://i0.kym-cdn.com/photos/images/facebook/000/930/701/c0a.jpg",
    "https://img.fireden.net/vg/image/1471/47/1471470213052.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/21878932_2000607323555117_7113195831997497344_n.jpg",
    "https://ci.memecdn.com/6255423.jpg",
    "https://media.tenor.com/images/f96fd8f94b5854ad10071aedf2bef095/tenor.png",
    "https://i.pinimg.com/736x/ec/a4/28/eca4280e82a613b8758709aeb9ca47ee--supernatural-cosplay-ideas.jpg",
    "https://i.pinimg.com/originals/9e/cf/85/9ecf852d1b0b07f79141d4733d24c211.jpg",
    "http://www.theanimegallery.com/data/thumbs/790px/0153/tAG_153156.jpg",
    "http://orig10.deviantart.net/4b1e/f/2011/117/b/1/shameimaru_by_lessonguy-d3f1zr6.jpg",
    "https://pbs.twimg.com/profile_images/718629755294121984/mMVOua1k_400x400.jpg",//17
    "http://i0.kym-cdn.com/photos/images/original/000/035/936/u-mad.jpg",
    "https://static.zerochan.net/Touhou.full.1101255.jpg",
    "http://i0.kym-cdn.com/photos/images/facebook/000/930/704/da1.jpg",
    "https://i.ytimg.com/vi/69yvQERIHW8/hqdefault.jpg",
    "https://ci.memecdn.com/4556767.jpg",
    "https://pre00.deviantart.net/42dc/th/pre/i/2011/164/5/0/aya__s_genderswap_by_velger96-d3isisj.jpg",
    "https://mchga.com/wp-content/uploads/2017/10/Shameimaru.Aya_.600.1892339-290x300.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/135/549/7b041493f982da7b7b8da942b197d0c0.jpg",
    "https://static.zerochan.net/Shameimaru.Aya.full.134238.jpg",
    "https://i.pinimg.com/736x/00/8f/ca/008fcac5686842602b21cc9c27897e9c--artists-pinterest.jpg",
    "https://static.zerochan.net/Shameimaru.Aya.full.499461.jpg",
    "https://t00.deviantart.net/iKPqHIXh348np1fhkgzeCQCljqE=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/ed10/th/pre/i/2014/310/5/e/chibi_shameimaru_aya__touhou__by_dvx69-d85i2vm.png",
    "https://static.zerochan.net/Shameimaru.Aya.full.1563790.jpg",
    "https://i.warosu.org/data/jp/img/0145/64/1451775265157.jpg",
    "https://vignette.wikia.nocookie.net/dragonball/images/f/fc/Touhou_-_Aya_Shameimaru.gif",
    "https://static.zerochan.net/Shameimaru.Aya.full.849158.jpg",
    "https://en.touhouwiki.net/images/thumb/8/86/SMWAya.jpg/300px-SMWAya.jpg",
    "https://lh3.googleusercontent.com/-SOKJ2RrOvk8/WM63TT2IKZI/AAAAAAAABUk/JCeAnqnJjxglE9w1_iE1u5lae8lM1sRiACJoC/w530-h530-n/Shameimaru.Aya.full.1250683.jpg",
    "https://i.pinimg.com/originals/d1/19/f3/d119f3cd5de89d0be671ba8245aeeacd.jpg",
    "https://2.bp.blogspot.com/-qgtxAGXgMjU/WDMg6269pOI/AAAAAAAACNw/kOkbaUFbg_gYlfKXG1V5Gy3ehtq9TTwLwCLcB/s1600/touhou-shameimaru-aya-camera-short-hair-wings-boots-1500x1061.jpg",
    "https://img00.deviantart.net/607d/i/2008/239/1/a/aya_and_momizi_by_stevew.jpg",
    "https://i.warosu.org/data/jp/img/0169/83/1494194019881.jpg",
    "https://t00.deviantart.net/iFUDh6BQ5H0MhekmZzxnQu0mvrk=/300x200/filters:fixed_height(100,100):origin()/pre00/db3b/th/pre/f/2011/166/f/4/mylittletouhou__aya_shameimaru_by_lissyfishy-d3j1by0.png",
    "https://images4.alphacoders.com/700/700990.png",
    "https://i.warosu.org/data/jp/img/0108/07/1367113272036.jpg",
    "http://i39.tinypic.com/2v0xy8i.jpg",
    "https://i.warosu.org/data/jp/img/0104/68/1360477688249.jpg",
    "http://stream1.gifsoup.com/view7/2490509/aya-shameimaru-gif-02-o.gif",
    "https://t00.deviantart.net/LJFNpJoUuy_ycjxYD2lTnray8s8=/300x200/filters:fixed_height(100,100):origin()/pre00/9d2a/th/pre/i/2016/086/3/f/aya_shameimaru_by_daisukiflandre-d9wnqje.png",
    "https://i.warosu.org/data/jp/img/0104/68/1360539500350.gif",
    "https://vignette.wikia.nocookie.net/yukkuri/images/0/06/Kimeemaru.png",
    "https://i.warosu.org/data/jp/img/0104/68/1360478747172.jpg",
    "https://s3.zerochan.net/Shameimaru.Aya.240.233264.jpg"
];

class AyayaCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'ayaya',
            group: 'touhou',
            memberName: 'ayaya',
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

module.exports = AyayaCommand;