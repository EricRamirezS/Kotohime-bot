const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389309032017428492/transportation201111dont-honk1.jpg",//1
    "https://media.discordapp.net/attachments/276329252289511424/389317760015925248/tumblr_inline_miungi0HWQ1qz4rgp.jpg",//2
    "https://media.discordapp.net/attachments/276329252289511424/382019181710934016/maxresdefault.jpg",//3
    "https://media.discordapp.net/attachments/276329252289511424/370735262734614530/f54.gif",//4
    "https://media.discordapp.net/attachments/276329252289511424/370339636389871627/814.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/369631318453125140/bd3.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/281054088425242624/c6f.png",
    "https://media.discordapp.net/attachments/276329252289511424/276405323504287744/N0qAb8d.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/389319026305925120/b90.png",
    "https://i.ytimg.com/vi/aDop-kpAjSk/maxresdefault.jpg",
    "https://pm1.narvii.com/6492/0449ac611ab9733c35bd835149dd8dfc067d707a_hq.jpg",
    "https://static3.fjcdn.com/comments/Blank+_a54a05cec9de31d26d813703939a6ccc.png",
    "https://static3.fjcdn.com/comments/Blank+_defd7045c7e658ba39fc220183041d69.png",
    "https://static4.fjcdn.com/comments/Chen+eh+_c0274798f2035b5dd28081675b00f0c7.png",
    "https://static3.fjcdn.com/comments/Blank+_d1d967d545a9b0cca5e65812fa2732b1.png",
    "http://s.storage.akamai.coub.com/get/b100/p/coub/simple/cw_image/efdec8aca17/9b0f9eb032ad1600bee94/timeline_1473947298_00032.jpg",
    "https://ih1.redbubble.net/image.361614687.5990/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u1.jpg"//17
];

class HonkCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'honk',
            group: 'touhou',
            memberName: 'honk',
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

module.exports = HonkCommand    ;