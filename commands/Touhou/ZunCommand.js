const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389545017712050176/zun-cosplay-1.jpg",//1
    "https://media.discordapp.net/attachments/276329252289511424/389545241973096448/zun_real_life_and_touhou__sample-4bbbd3909cbc2bae7942c1cde6fd9635.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/389545251301359623/zun.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/389545478594756609/zun_budweiser_and_real_life__dcf4febe7b10df586bb26aa5e58c71ef.jpg",
    "https://pbs.twimg.com/media/Cd1g2ROUsAANqWg.jpg",
    "https://i.warosu.org/data/jp/img/0120/99/1399488693880.jpg",
    "https://pre00.deviantart.net/9440/th/pre/i/2013/041/7/8/praise_the_zun__by_raisen_kun-d5uev0q.png",
    "http://dic.nicovideo.jp/oekaki/348226.png",
    "http://www.animemaru.com/wp-content/uploads/2016/05/zun-copy.png",
    "http://touhou.nu/wp/news/thbeer/neko-zun-1.png",
    "https://memestatic3.fjcdn.com/comments/Female+zun+you+are+now+happy+_b6e689e1201a627f4aaf68d464ccd998.jpg",
    "https://68.media.tumblr.com/a3d1299416a4abac8fdc759bb85ac355/tumblr_ouhzxgrxYU1r90cnso1_500.jpg",
    "https://cdn.drawception.com/images/panels/2013/8-21/xSwY6dZAyF-2.png",
    "http://i.imgur.com/PQtnIB8.png",
    "https://media.discordapp.net/attachments/276329252289511424/386709403941863437/zun_real_life_and_touhou__sample-64534656572c4512dc63587531eacfb4.jpg",
    "https://pbs.twimg.com/media/C7NZEiDUwAAje-C.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/386709352150597632/143608-ZUNTouhou.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/378968371590332417/15326191_1359752550743216_933927379529533063_o.jpg?width=665&height=499"
];

class ZunCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'zun',
            group: 'touhou',
            memberName: 'zun    ',
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

module.exports = ZunCommand;