const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389542278814760980/reiuji_utsuho_touhou_drawn_by_haiiro_gundan__sample-8de0e541c1387cb0fc1b013cae595b25.png",//1
    "https://i.imgur.com/pK0vTD6.jpg",
    "https://i.imgur.com/537XgcW.jpg",
    "https://i.ytimg.com/vi/EWcXuJltRVI/maxresdefault.jpg",
    "https://i.imgur.com/537XgcW.jpg",
    "http://i.imgur.com/qan7QaV.jpg",
    "http://i0.kym-cdn.com/photos/images/newsfeed/000/797/388/aa8.png",
    "https://i.imgur.com/4SeLlnl.jpg",
    "http://i.imgur.com/51aazRV.gif",
    "http://i.imgur.com/rzgNP.jpg",
    "https://pbs.twimg.com/media/BvxsyNeCAAATvIz.jpg",
    "https://static.zerochan.net/Reiuji.Utsuho.full.468179.jpg",
    "http://pm1.narvii.com/6602/908708066f7d59aba6f5a3ba4feb21debad7d80d_hq.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s480x480/e15/10268831_846927138659277_54438193_n.jpg",
    "http://i0.kym-cdn.com/photos/images/facebook/001/018/852/535.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e15/10632322_819500211428626_707423641_n.jpg",
    "https://pm1.narvii.com/6628/e30bc5900122494f8fd1ed053406525ca761b6b7_hq.jpg",
    "https://static.zerochan.net/Reiuji.Utsuho.full.360569.jpg",
    "https://vignette.wikia.nocookie.net/dragonball/images/0/09/Okuu_chibi.jpg/revision/latest?cb=20120212214154",
    "https://static.zerochan.net/Touhou.full.141723.jpg",
    "https://i.ytimg.com/vi/SlAnz9eGPc0/maxresdefault.jpg",
    "https://images6.alphacoders.com/308/thumb-350-308404.jpg",
    "https://vignette3.wikia.nocookie.net/fairytailfanon/images/4/41/5238-touhou-utsuho-reiuji.jpg",
    "https://static.zerochan.net/Reiuji.Utsuho.full.108429.jpg",
    "http://i0.kym-cdn.com/photos/images/facebook/000/876/818/e0c.jpg",
    "http://i.imgur.com/AAKRsOE.jpg",
    "http://i0.kym-cdn.com/photos/images/original/001/023/650/58c.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s480x480/e15/10593268_1428558234052381_1156167505_n.jpg",
    "https://i.imgur.com/kDUg3bK.jpg",
    "https://i.imgur.com/zFSPbZe.jpg",
    "https://pbs.twimg.com/media/BM4xHvJCMAA1zxN.jpg",
    "https://i.ytimg.com/vi/VXzK4e1kc7U/maxresdefault.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/806/877/f77.jpg",
    "http://i0.kym-cdn.com/photos/images/newsfeed/000/833/087/74f.png",
    "http://i0.kym-cdn.com/photos/images/newsfeed/000/859/014/83f.png",
    "https://orig00.deviantart.net/a24f/f/2009/229/b/7/fsjal_utsuho_by_dragonzero200.png",
    "https://img00.deviantart.net/af51/i/2013/262/3/7/chibi_orin_and_chibi_okuu_by_orin_nyan-d6mx9is.jpg",
    "https://vignette.wikia.nocookie.net/dragonball/images/0/09/Okuu_chibi.jpg",
    "http://static.zerochan.net/Reiuji.Utsuho.full.989998.jpg",
    "https://i.imgur.com/Y7MhOnx.jpg",
    "https://static3.fjcdn.com/thumbnails/comments/Blank+_fd2bf0bb75e2db6927307a4e0c743bd0.gif",
    "https://t00.deviantart.net/Y7lSr1VdjCLjyHkgLnbouKMyYe8=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/497d/th/pre/f/2014/239/2/3/_touhou__okuu_doodle_by_manick2005-d7wvjad.png",
    "https://78.media.tumblr.com/994813d6a4be12309cd2a08bc303d1b6/tumblr_otlxvbLRfm1rnr9w3o1_1280.png",
    "https://orig00.deviantart.net/81d6/f/2014/063/5/5/utsuho_reiuji__touhou__by_nekozneko-d78whip.png",
    "https://t00.deviantart.net/jyj6kBK6ZyrF79S7nKq218ddeLM=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/feb0/th/pre/i/2014/025/3/5/okuu_desolator__touhou__by_keramatzmode-d73rhrx.png",
    "http://img06.deviantart.net/dfa8/i/2015/162/e/6/okuued_3_0_by_guuchama-d8wv3ai.jpg",
    "https://gematsu.com/wp-content/uploads/2016/11/Touhou-Genso-Wanderer_2016_11-03-16_006.jpg",
    "https://pre00.deviantart.net/481b/th/pre/i/2016/112/e/8/touhou_fusion__the_great_thief_yatagarasu_by_chromatech-d9zurd1.png",
    "https://static1.fjcdn.com/comments/Have+an+okuu+then+_6975d8ea4357fda96f831022e666b6b5.png",
    "https://static2.fjcdn.com/comments/A+wing+_1d9796ff5a7587c113b31696af768d6a.jpg",
    "https://i.pinimg.com/originals/3d/ef/4b/3def4bd9574c07db152aef98284dd406.jpg",
    "https://pbs.twimg.com/media/B-YYgtaCIAAz3TT.png",
    "https://78.media.tumblr.com/6318b5ba5ae6c2136ce6397d5c895e2c/tumblr_mkawvlNUU81s5307io1_500.gif",
    "https://i.ytimg.com/vi/Pi_B3FXij2g/hqdefault.jpg",
    "http://img06.deviantart.net/ea97/i/2011/331/0/1/touhou___utsuho_reiuji_by_clearechoes-d4hfkwx.jpg",
    "http://danbooru.donmai.us/data/40c3706f540c387ea6e988a1199bfc70.jpg",
    "https://static.zerochan.net/Reiuji.Utsuho.full.748385.jpg",
    "http://i0.kym-cdn.com/photos/images/facebook/000/839/653/44a.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/916/038/06a.png"
];

class UnyuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'unyu',
            group: 'touhou',
            memberName: 'unyu',
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

module.exports = UnyuCommand    ;