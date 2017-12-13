const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389543743138562058/combine_by_mii_kami-d4erf9i.png",//1
    "https://en.touhouwiki.net/images/thumb/7/7e/WaHHKappa.png/220px-WaHHKappa.png",
    "https://en.touhouwiki.net/images/thumb/c/cc/WnHH_Kappa.png/300px-WnHH_Kappa.png",
    "https://static.zerochan.net/Touhou.full.1175372.jpg",
    "https://img00.deviantart.net/cb9c/i/2014/103/1/8/touhou_spin_kappa___paintball_bang_by_drinkyourvegetable-d7eagid.png",
    "https://i.ytimg.com/vi/hASaM72IAjI/maxresdefault.jpg",
    "https://s3.zerochan.net/Kawashiro.Nitori.240.49846.jpg",
    "http://i.imgur.com/BUFCb.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s480x480/e15/10731766_217899851712271_1652803156_n.jpg",
    "https://orig00.deviantart.net/3459/f/2015/056/3/8/kappa_by_miwol-d8jfrhx.jpg",
    "http://superwall.us/thumbnail/kawashiro_nitori_water_touhou_kappa_nature-bjGP.jpg",
    "https://pbs.twimg.com/profile_images/816147823473426432/qdwJBk-E.jpg",
    "https://i.imgur.com/w4eHv.jpg",
    "https://orig00.deviantart.net/cadf/f/2011/208/1/a/touhou_nitori_by_tomehatsu-d41tryg.png",
    "http://i.imgur.com/Htmtahl.png",
    "https://orig00.deviantart.net/6c58/f/2012/141/8/4/8460e2897199fe5627987be8f4e29791-d50kowb.jpg",
    "http://kappadesign.dan-nixon.com/images/logo.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/834/548/754.jpg",
    "http://i0.kym-cdn.com/photos/images/original/001/262/421/4da.png",
    "http://i0.kym-cdn.com/photos/images/original/000/845/885/021.jpg",
    "https://img00.deviantart.net/a489/i/2014/298/7/1/nitori_usb_test_pack_by_fahmi4869-d846cmc.jpg",
    "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s480x480/e15/10802551_696477637126275_178550595_n.jpg",
    "https://i.pinimg.com/originals/97/48/ea/9748ea3366e64a58bed110d701ad368a.jpg"
];

class KappaCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'kappa',
            group: 'touhou',
            memberName: 'kappa',
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

module.exports = KappaCommand;