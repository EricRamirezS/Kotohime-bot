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
    "https://pbs.twimg.com/profile_images/718629755294121984/mMVOua1k_400x400.jpg"//17
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
        var image = Math.floor(Math.random() * imageLinks.length);
        message.channel.send('',{
            files: [
                imageLinks[image]
            ]
        });
    }
}

module.exports = AyayaCommand;