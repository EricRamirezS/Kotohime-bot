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
    "https://static.zerochan.net/Reiuji.Utsuho.full.108429.jpg"
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
        var image = Math.floor(Math.random() * imageLinks.length);
        message.channel.send('',{
            files: [
                imageLinks[image]
            ]
        });
    }
}

module.exports = UnyuCommand    ;