const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389543007323684864/alice_margatroid_cirno_kirisame_marisa_and_shanghai_doll_touhou_drawn_by_akano_tsukiya__sample-0b062.jpg",//1
    "http://www.wallpapermaiden.com/image/2017/11/06/alice-margatroid-touhou-blonde-short-hair-anime-18421-resized.png",
    "https://cdn.wallpaperjam.com/content/images/f9/f8/f9f83eaeaabb5cad7f10fe7b25d9c1e775eb433a.jpg",
    "http://images5.fanpop.com/image/photos/31400000/Alice-Margatroid-touhou-31400713-500-404.jpg",
    "https://i.ytimg.com/vi/kP_JOLqmYRc/maxresdefault.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/871/306/a3b.jpg",
    "http://www.legion34.com/wp-content/uploads/2013/06/Alice-6.jpg",
    "http://dagobah.net/t200/Touhou_Alice_Dere.jpg",
    "http://i.imgur.com/iXemDbu.jpg",
    "https://img4.goodfon.com/wallpaper/big/d/24/art-banssee-touhou-project-touhou-alice-margatroid-shanghai.jpg",
    "http://www.wallpapermaiden.com/image/2016/09/17/touhou-kirisame-marisa-alice-margatroid-military-uniform-blonde-anime-6043-resized.jpg",
    "https://hdwallpaperim.com/wp-content/uploads/2017/08/22/86061-anime-Touhou-Alice_Margatroid.jpg",
    "http://sweetmonia.com/Sweet-Anime-Blog/wp-content/uploads/2015/11/Alice-Margatroid.jpg",
    "http://i0.kym-cdn.com/photos/images/original/000/970/056/d12.png",
    "http://i1.ytimg.com/vi/HSFaTZqFCsw/hqdefault.jpg",
    "https://orig00.deviantart.net/ee6d/f/2010/298/7/b/_touhou___don__t_disturb_alice_by_wanganator-d31gxwv.png",
    "https://78.media.tumblr.com/0ee31638521a6cbbf02f2b8e77ae8c65/tumblr_ow6t68ZJ2Z1twadyuo1_1280.png",
    "http://i0.kym-cdn.com/entries/icons/original/000/001/124/marisa.jpg",

];

class AliceCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'alice',
            group: 'touhou',
            memberName: 'alice',
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

module.exports = AliceCommand    ;