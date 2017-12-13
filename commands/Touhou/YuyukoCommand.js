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
    "http://i0.kym-cdn.com/photos/images/original/000/797/813/725.jpg"
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
        var image = Math.floor(Math.random() * imageLinks.length);
        message.channel.send('',{
            files: [
                imageLinks[image]
            ]
        });
    }
}

module.exports = YuyukoCommand;