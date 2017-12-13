const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389542461795729418/artworks-000060402093-fnu5cb-t500x500.jpg",//1
    "https://orig00.deviantart.net/8444/f/2015/253/b/9/_touhou__the_strongest_by_men_dont_scream-d9927z5.jpg",
    "http://i0.kym-cdn.com/photos/images/facebook/000/975/985/b80.jpg",
    "http://i2.kym-cdn.com/photos/images/newsfeed/000/975/808/04a.png",
    "https://t00.deviantart.net/rtxj-CYKW91lpZDwUe7HGfVM_7U=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/79cf/th/pre/i/2017/253/a/f/moron_by_emilydoesstuff-dbmyms7.png",
    "https://i.ytimg.com/vi/nbcIF78vzo4/hqdefault.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/385581173201436682/cirno_touhou_drawn_by_kan_aaaaari35__sample-75571d57de9bc348139f9656a67981a6.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/382057971384844288/Box_of_Cirnos.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/377996934977290240/tumblr_oailnb5DpD1reorefo1_540.png",
    "https://media.discordapp.net/attachments/276329252289511424/377644401809162252/cirno_touhou_drawn_by_arikui_ooooalikui__2412ed4bbddfb867382ee9d9ef522caf.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/376093521976885248/cirno99.png",
    "https://media.discordapp.net/attachments/276329252289511424/376093557431468062/tumblr_okt300p0z41qhxhvmo1_1280.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/376085266923782144/Baka_Parka.png",
    "https://media.discordapp.net/attachments/276329252289511424/374341029358207008/c_for_idiots.jpg",
    "https://i.pinimg.com/236x/0b/48/33/0b48331100b81facbf8e0a8bc24fe661.jpg",
    "https://t00.deviantart.net/edPHE6F6YWxMy0OIMlDcG0TNyKQ=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/4402/th/pre/f/2011/258/4/b/brush_size_set_to_one_by_hardcorespacecore-d49xr94.png",
    "https://pre00.deviantart.net/21b1/th/pre/f/2012/140/4/1/cirno_touhou_minecraft_pixel_art_by_infiniteminecraftart-d50in25.png",
    "http://i0.kym-cdn.com/photos/images/original/000/975/994/2a1.png",
    "https://pre00.deviantart.net/899b/th/pre/f/2011/252/3/e/cirno_is_the_strongest__by_chioi_tempest-d49bh1x.jpg"
];

class _9ballCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: '9ball',
            group: 'touhou',
            memberName: '9ball',
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

module.exports = _9ballCommand    ;